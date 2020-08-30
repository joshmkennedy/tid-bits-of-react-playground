const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// exports.sourceNodes = ({ actions }) => {
//   actions.createTypes(`
//     type Gist implements Node @dontInfer {
//       id: ID!
//       name: String!
//     }
//   `)
// }

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/postTemplate.js`)
  const gistTemplate = path.resolve(`./src/templates/gistTemplate.js`)
  return graphql(
    `
      {
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
      }
    `
    // github {
    //       viewer {
    //         gists(last: 100) {
    //           nodes {
    //             name
    //             files {
    //               name
    //             }
    //           }
    //         }
    //       }
    //     }
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMdx.edges
    const gists = result.data.github && result.data.github.viewer.gists.nodes
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

    gists &&
      gists.forEach((gist, index) => {
        const previous = getPrevious(index, gists)
        const next = getNext(index, gists)
        const slug = createGistSlug(gist.files[0].name)
        createPage({
          path: `/gists/${slug || gist.name}`,
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

  const slug = fileName.split('.')[0]
  return slug
}
