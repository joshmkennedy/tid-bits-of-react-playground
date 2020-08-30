// import React from 'react'
// import { Link, graphql } from 'gatsby'
// import Layout from '../components/Layout'
// import SEO from '../components/seo'

// export default function gistTemplate({ data }) {
//   return (
//     <Layout>
//       <h2>hello</h2>
//       <pre>{JSON.stringify(data.github.viewer.gist, null, 2)}</pre>
//     </Layout>
//   )
// }
// export const pageQuery = graphql`
//   query($name: String!) {
//     site {
//       siteMetadata {
//         title
//         author
//       }
//     }
//     github {
//       viewer {
//         gist(name: $name) {
//           id
//           files {
//             name
//             language {
//               name
//               id
//               color
//             }
//             extension
//             text
//           }
//           name
//           description
//         }
//       }
//     }
//   }
// `
