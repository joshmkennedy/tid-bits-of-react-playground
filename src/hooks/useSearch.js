import React, { useState, useEffect } from 'react'

export default function useSearch(posts) {
  const [searchString, setSearchString] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [availableTags, setAvailableTags] = useState([])
  const [activeTags, setActiveTags] = useState(['browser'])

  useEffect(() => {
    const querySearch = getParameterByName('s')
    if (querySearch) {
      setSearchString(querySearch)
    }
  }, [getParameterByName])

  function search(needle, haystack) {
    return haystack.toLowerCase().includes(needle.toLowerCase())
  }
  function filterFn(post) {
    const {
      frontmatter: { title, tags },
    } = post
    console.log()
    if (activeTags.length >= 1) {
      for (let i = 0; i < activeTags.length; i++) {
        const tag = activeTags[i]
        if (!tags || !tags.some(t => t.toLowerCase() === tag.toLowerCase())) {
          return false
        }
      }
    }

    if (searchString.length < 2) {
      return true
    }

    if (search(searchString, title)) {
      return true
    }

    if (tags) {
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i]
        if (tag.toLowerCase().match(searchString.toLowerCase())) {
          return true
        }
      }
    }
  }

  useEffect(() => {
    const filtered = posts.filter(filterFn)
    const tags = posts.reduce((tagList, post) => {
      if (!post.frontmatter.tags) return tagList
      return [...new Set([...tagList, ...post.frontmatter.tags])]
    }, [])
    setAvailableTags(tags)
    setFilteredPosts(filtered)
  }, [posts, searchString, activeTags])

  return {
    searchString,
    setSearchString,

    availableTags,
    setAvailableTags,
    setActiveTags,
    activeTags,

    filteredPosts,
  }
}
function getParameterByName(name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}
