import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const { fiveReactComponents, fiveBrainDumps } = data
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Link to={`/components`}>
        <h2>Component Exploration</h2>
      </Link>
      <ul style={{ listStyle: `none`, marginLeft: `10px`, marginBottom: 50 }}>
        {fiveReactComponents.nodes.map(({ frontmatter, excerpt, fields }) => {
          const { title } = frontmatter
          return (
            <li key={fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={fields.slug}>
                  {title}
                </Link>
              </h3>
            </li>
          )
        })}
      </ul>
      <Link to={`/brain`}>
        <h2>Brain Dumps</h2>
      </Link>
      <ul style={{ listStyle: `none`, marginLeft: `10px` }}>
        {fiveBrainDumps.nodes.map(({ frontmatter, excerpt, fields }) => {
          const { title } = frontmatter
          return (
            <li key={fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={fields.slug}>
                  {title}
                </Link>
              </h3>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    fiveReactComponents: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { eq: "components" } } }
      limit: 5
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          # date(formatString: "MMMM DD, YYYY")
          title
        }
      }
    }
    fiveBrainDumps: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { category: { eq: "brain" } } }
      limit: 5
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          # date(formatString: "MMMM DD, YYYY")
          title
        }
      }
    }
  }
`
