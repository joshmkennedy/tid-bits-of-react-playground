import React from 'react'
import styled from 'styled-components'

function PostFilter({
  value,
  setValue,
  className,
  tags = [],
  activeTags = [],
  setActiveTags,
}) {
  function handleIncludingTag(tag) {
    if (activeTags.includes(tag)) {
      setActiveTags(prev => removeTag(tag, prev))
    } else {
      setActiveTags(prev => addTag(tag, prev))
    }
  }

  return (
    <div className={className}>
      <p>Search by Tag or Title of Post</p>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="search"
          name="search"
          id="search"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
      <ul>
        {tags.sort().map(tag => {
          return (
            <li key={tag}>
              <button
                className="tag"
                type="button"
                onClick={() => handleIncludingTag(tag)}
                style={{
                  borderColor: activeTags.some(activeTag => tag === activeTag)
                    ? `var(--darkblue)`
                    : `transparent`,
                  opacity:
                    activeTags.some(activeTag => tag === activeTag) && `1`,
                }}
              >
                {tag}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default styled(PostFilter)`
  /* padding: 20px 10px;
  border-radius: 8px;
  background: #fff9f6; */
  p {
    margin-top: 0;
    font-weight: 600;
    color: var(--darkblue);
  }
  form {
    margin-bottom: 15px;
  }
  input[type='search'] {
    background: var(--offwhite);
    border-radius: 4px;
    width: 100%;
    border: none;
    box-shadow: inset 0 0 0 1px var(--blue);
    font-size: 18px;
    padding: 10px 8px;
    color: var(--blue);
    font-weight: 400;
    &:focus {
      box-shadow: inset 0 0 0 1px var(--darkblue), 0 2px 6px var(--sand);
      border: none;
      outline: none;
    }
  }
  ul {
    display: flex;
    overflow-x: scroll;
    li + li {
      margin-left: 5px;
    }
  }
  .tag {
    padding: 5px 8px;
    background: var(--sand);
    color: var(--darkblue);
    font-weight: 600;
    font-size: 16px;
    border-radius: 3px;
    opacity: 0.589;
    white-space: nowrap;
    &:hover {
      opacity: 1;
    }
  }
`
function removeTag(tag, tagList) {
  return tagList.filter(_tag => _tag !== tag)
}
function addTag(tag, tagList) {
  return [...tagList, tag]
}
