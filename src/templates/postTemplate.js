import React from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Headings from '../components/Headings'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'

class ReactComponentTemplate extends React.Component {
  render() {
    const post = this.props.data.mdx
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    console.log(this.props.pageContext)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.excerpt}
          keywords={(post.frontmatter && post.frontmatter.tags) || []}
        />
        <div className="container">
          <h2>{post.frontmatter.title}</h2>
          <p
            style={{
              display: `block`,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            {post.frontmatter.date}
          </p>
          <MDXRenderer scope={{ ...Headings }}>{post.body}</MDXRenderer>

          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Layout>
    )
  }
}

export default ReactComponentTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`
