import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import PostCard from '../components/PostCard'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'

function BlogIndex({ data, location }) {
  const siteTitle = data.site.siteMetadata.title
  const [searchString, setSearchString] = useState('')
  function search(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase())
  }
  function filterFn(post) {
    if (searchString.length < 2) return true
    const {
      frontmatter: { title, tags },
    } = post
    if (search(searchString, title)) {
      return true
    }

    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        if (tag.toLowerCase().includes(searchString.toLowerCase())) {
          console.log(post)
          console.log(tag)
          return true
        }
      }
    }
  }

  const { allMdx } = data
  return (
    <Layout location={location} title={siteTitle}>
      <div className="container">
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="search"
            name="search"
            id="search"
            onChange={e => setSearchString(e.target.value)}
          />
        </form>
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
