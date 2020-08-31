import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
function PostCard({ post, className }) {
  const { title, tags, category, slug } = post
  return (
    <div className={className}>
      <Link to={`/${category}`} className="category">
        {category}
      </Link>
      <h3>
        <Link style={{ boxShadow: `none` }} to={slug}>
          {title}
        </Link>
      </h3>
      <ul className="tags">
        {tags &&
          tags.map(tag => (
            <li key={tag}>
              <span className="tag">{tag}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
export default styled(PostCard)`
  border: 1px solid var(--blue);
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 20px 10px;
  position: relative;
  h3 {
    margin: 0;
    margin-bottom: 0.5em;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .category {
    display: block;
    position: absolute;
    margin-top: -1.65em;
    margin-left: 20px;
    padding: 0 5px;
    background: var(--body-bg);
    margin-bottom: 20px;
    border-radius: 4px;
    &:hover {
      color: var(--text-color);
      text-decoration: none;
      border: 1px solid var(--blue);
    }
  }
  .tag {
    display: block;
    padding: 2px 5px;
    background: var(--sand);
    color: var(--darkblue);
    font-weight: 600;
    font-size: 14px;
    border-radius: 3px;
  }
`
