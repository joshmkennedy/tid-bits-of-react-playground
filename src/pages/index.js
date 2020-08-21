import React from 'react'
import { graphql } from 'gatsby'
import PostCard from '../components/PostCard'
import PostFilter from '../components/PostFilter.js'
import useSearch from '../hooks/useSearch.js'
import Layout from '../components/Layout'
import SEO from '../components/seo'

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const { searchString, setSearchString, filterFn } = useSearch()

  const { allMdx } = data
  return (
    <Layout location={location} title={siteTitle}>
      <div className="container" style={{ paddingTop: `40px` }}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <PostFilter value={searchString} setValue={setSearchString} />
        <ul className="post-list">
          {allMdx.nodes.filter(filterFn).map(post => {
            return (
              <li key={post.fields.slug}>
                <PostCard post={post} />
              </li>
            )
          })}
        </ul>
      </div>
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
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
          category
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`
