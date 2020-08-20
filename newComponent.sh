#!/bin/bash
cd content/components
mkdir $1 
cd $1
touch $1.jsx
echo 'import React from "react"' >> $1.jsx
echo 'import styled from "styled-components"' >> $1.jsx
echo '' >> $1.jsx
echo 'function '$1'({className}){' >> $1.jsx 
echo '  return <div className={className}>' >> $1.jsx 
echo '    <h1>'$1'</h1>' >> $1.jsx 
echo '  </div>' >> $1.jsx
echo '};' >> $1.jsx 
echo '' >> $1.jsx 
echo 'export default styled('$1')``' >> $1.jsx 

touch index.mdx

echo '---' >> index.mdx
echo 'title: ' $1 >> index.mdx
echo 'category:  React Component' >> index.mdx
echo 'tags: ' >> index.mdx
echo '---' >> index.mdx
echo '' >> index.mdx
echo 'import '$1' from "./'$1'.jsx"' >> index.mdx
echo '' >> index.mdx
echo '' >> index.mdx
echo '``` js react-live' >> index.mdx
echo '<'$1'/>' >> index.mdx
echo '```' >> index.mdx
