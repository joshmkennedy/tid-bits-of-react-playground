import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import PostCard from '../components/PostCard'
import PostFilter from '../components/PostFilter.js'
import useSearch from '../hooks/useSearch.js'
import Layout from '../components/Layout'
import SEO from '../components/seo'

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const code = useMemo(() => {
    const gistNodes = data.github.viewer.gists.nodes
    return [...gistNodes]
  }, [data])
  const {
    searchString,
    setSearchString,
    filteredPosts,
    availableTags,
    activeTags,
    setActiveTags,
  } = useSearch(code)

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
            console.log(post.category)
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
    github {
      viewer {
        gists(last: 100) {
          ...previewGist
        }
      }
    }
  }
  fragment previewGist on GitHub_GistConnection {
    nodes {
      createdAt(toLocalDateString: true)
      tags
      description
      category
      title
      slug
      files {
        name
      }
    }
  }
`
