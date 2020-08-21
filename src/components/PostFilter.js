import React from 'react'
import styled from 'styled-components'

function PostFilter({ value, setValue, className }) {
  console.log(value)
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
    </div>
  )
}
export default styled(PostFilter)`
  padding: 20px 10px;
  border-radius: 8px;
  background: #fff9f6;
  p {
    margin-top: 0;
    font-weight: 600;
    color: var(--darkblue);
  }
  input[type='search'] {
    background: var(--lightsand);
    border-radius: 4px;
    border: none;
    font-size: 18px;
    padding: 10px 8px;
    color: var(--blue);
    font-weight: 400;
  }
`
