const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/postTemplate.js`)
  return graphql(
    `
      {
        allMdx(limit: 1000, sort: { fields: frontmatter___date, order: DESC }) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                category
              }
              body
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
  }
}

function getNextInCategory(post, index, posts) {
  const possibleNext = getNext(index, posts)
  if (
    !possibleNext ||
    possibleNext.frontmatter.category === post.node.frontmatter.category
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
    possiblePrevious.frontmatter.category === post.node.frontmatter.category
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
