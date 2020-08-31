import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import PostCard from '../components/PostCard'
import PostFilter from '../components/PostFilter.js'
import useSearch from '../hooks/useSearch.js'
import Layout from '../components/Layout'
import SEO from '../components/seo'

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const mdxNodes = useMemo(
    () =>
      data.allMdx.nodes.map(post => ({
        title: post.frontmatter.title,
        tags: post.frontmatter.tags,
        category: post.fields.category,
        slug: post.fields.slug,
      })),
    [data]
  )
  const {
    searchString,
    setSearchString,
    filteredPosts,
    availableTags,
    activeTags,
    setActiveTags,
  } = useSearch(mdxNodes)

  return (
    <Layout location={location} title={siteTitle}>
      <div className="container" style={{ paddingTop: `40px` }}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <PostFilter
          value={searchString}
          setValue={setSearchString}
          tags={availableTags}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />
        <ul className="post-list">
          {filteredPosts.map(post => {
            return (
              <li key={post.slug}>
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
