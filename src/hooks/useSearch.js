import React, { useState, useEffect } from 'react'

export default function useSearch() {
  const [searchString, setSearchString] = useState('')
  useEffect(() => {
    function getParameterByName(name, url) {
      if (!url) url = window.location.href
      name = name.replace(/[\[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
    const querySearch = getParameterByName('s')
    if (querySearch) {
      setSearchString(querySearch)
    }
  }, [])
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
        if (tag.toLowerCase().match(searchString.toLowerCase())) {
          return true
        }
      }
    }
  }
  return {
    searchString,
    setSearchString,
    filterFn,
  }
}
