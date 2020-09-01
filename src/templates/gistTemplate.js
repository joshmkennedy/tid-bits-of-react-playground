import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { Snippet } from '../components/code'

export default function gistTemplate({ data }) {
  const { gist } = data.github.viewer
  return (
    <Layout title={data.site.siteMetadata.title}>
      <h2>{gist.title}</h2>
      <p>{gist.description}</p>
      {gist.files.map(file => {
        return (
          <div key={file.name}>
            <h3>{file.name}</h3>
            <Snippet language={file.language.name.toLowerCase()}>
              {file.text}
            </Snippet>
          </div>
        )
      })}
    </Layout>
  )
}
export const pageQuery = graphql`
  query($name: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    github {
      viewer {
        gist(name: $name) {
          id
          files {
            name
            language {
              name
              id
              color
            }
            extension
            text
          }
          title
          description
        }
      }
    }
  }
`
