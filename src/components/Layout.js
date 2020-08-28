import React from 'react'
import { Link } from 'gatsby'
import './styles.css'

function Layout(props) {
  const { title, children } = props
  return (
    <div className={'app'}>
      <header>
        <div className="container">
          <h1>
            <Link
              style={{
                boxShadow: `none`,
                textDecoration: `none`,
                color: `inherit`,
              }}
              to={`/`}
            >
              {title}
            </Link>
          </h1>
        </div>
      </header>
      <main className="wrapper">{children}</main>
      <footer>
        <div className="container">
          © {new Date().getFullYear()}, Built with
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </div>
      </footer>
    </div>
  )
}

export default Layout
