import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostCard from '../components/PostCard.js'
import SEO from '../components/seo'

function ReactComponentArchive({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="Components"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <div className="container">
        <h2>My Components</h2>
        <p>
          A fun playground to build interesting components. Experiment with
          different apis
        </p>
        <div className="post-list">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return <PostCard post={node} key={title} />
          })}
        </div>
      </div>
    </Layout>
  )
}

export default ReactComponentArchive

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { eq: "components" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            category
          }
          frontmatter {
            # date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
