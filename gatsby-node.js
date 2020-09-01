const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/postTemplate.js`)
  const gistTemplate = path.resolve(`./src/templates/gistTemplate.js`)
  return graphql(
    `
      query {
        allMdx(limit: 1000, sort: { fields: frontmatter___date, order: DESC }) {
          edges {
            node {
              id
              fields {
                slug
                category
              }
              frontmatter {
                title
              }
              body
            }
          }
        }
        github {
          viewer {
            gists(last: 100) {
              nodes {
                name
                tags
                description
                category
                slug
                files {
                  name
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges
    posts.forEach((post, index) => {
      const previous = getPreviousInCategory(post, index, posts)
      const next = getNextInCategory(post, index, posts)

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    const gists = result.data.github && result.data.github.viewer.gists.nodes
    gists &&
      gists.forEach((gist, index) => {
        const previous = getPrevious(index, gists)
        const next = getNext(index, gists)

        createPage({
          path: gistPath(gist.slug),
          component: gistTemplate,
          context: {
            name: gist.name,
            previous,
            next,
          },
        })
      })
    //end of create pages
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    const category = getCategoryDirectory(node)
    createNodeField({
      name: `category`,
      node,
      value: category,
    })
  }
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    GitHub_Gist: {
      description: {
        resolve: (source, args, context, info) => {
          return source.description && gistDescription(source.description)
        },
      },
      createdAt: {
        type: 'Date',
        args: {
          toLocalDateString: {
            type: 'Boolean',
          },
        },
        resolve: async (source, args, context, info) => {
          if (args.toLocalDateString) {
            return new Date(source.createdAt).toLocaleDateString()
          }
          return createdAt
        },
      },
      category: {
        type: 'String',
        resolve: () => 'gist',
      },
      title: {
        type: 'String',
        resolve: source => {
          return source.files[0].name
        },
      },
      slug: {
        type: 'String',
        resolve: source => {
          const slug = createGistSlug(source.files[0].name)
          return slug
        },
      },
      tags: {
        type: ['String'],
        resolve: async (source, args, context, info) => {
          return source.description && gistTags(source.description)
        },
      },
    },
  }
  createResolvers(resolvers)
}

function getNextInCategory(post, index, posts) {
  const possibleNext = getNext(index, posts)
  if (
    !possibleNext ||
    possibleNext.fields.category === post.node.fields.category
  ) {
    return possibleNext
  } else {
    getNextInCategory(post, index + 1, posts)
  }
}

function getPreviousInCategory(post, index, posts) {
  const possiblePrevious = getPrevious(index, posts)
  if (
    !possiblePrevious ||
    possiblePrevious.fields.category === post.node.fields.category
  ) {
    return possiblePrevious
  } else {
    getPreviousInCategory(post, index + 1, posts)
  }
}

function getNext(index, posts) {
  return index === 0 ? null : posts[index - 1].node
}

function getPrevious(index, posts) {
  return index === posts.length - 1 ? null : posts[index + 1].node
}

function getCategoryDirectory(node) {
  const regex = /content\/(?<category>[a-z|-]+)\//
  const results = regex.exec(node.fileAbsolutePath)
  return results.groups.category
}

function createGistSlugFromNode(node) {}
function createGistSlug(fileName) {
  if (!fileName) return null
  const fileNameSansExt = fileName.split('.')[0]
  const slug = fileNameSansExt
    .toLowerCase()
    .split(' ')
    .join('-')
  return slug
}
function gistPath(slug) {
  return `/gists/${slug}`
}

function gistDescription(raw) {
  return raw.split('::')[0].trim()
}
function gistTags(raw) {
  const rawTags = raw.split('::')
  rawTags.shift()
  const tags = rawTags.map(tag => tag.trim())
  return tags
}
