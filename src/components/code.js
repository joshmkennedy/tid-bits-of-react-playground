import React from 'react'
import { render } from 'react-dom'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import styled from 'styled-components'
import { useMDXScope } from 'gatsby-plugin-mdx/context'

export const Code = ({ codeString, language, ...props }) => {
  if (props['react-live']) {
    console.log(defaultProps)
    const components = useMDXScope()
    console.log(codeString)
    return (
      <LiveCodeBlock>
        <LiveProvider
          code={codeString}
          scope={components}
          noInline={false}
          {...defaultProps}
        >
          <LiveEditor />
          <LiveError />
          <LiveComponent>
            <div className="preview__label">Live Preview</div>
            <LivePreview />
          </LiveComponent>
        </LiveProvider>
      </LiveCodeBlock>
    )
  } else {
    return (
      <Highlight {...defaultProps} code={codeString} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <CodeBlock className={className} style={{ ...style }}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </CodeBlock>
        )}
      </Highlight>
    )
  }
}

const LiveCodeBlock = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
    0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
`
const LiveComponent = styled.div`
  padding: 10px;
  .preview__label {
    margin-top: -10px;
    margin-left: -10px;
    margin-right: -10px;
    padding: 10px;
    background: #f9f9f9;
    font-family: 'Montserrat';
    font-weight: 700;
    margin-bottom: 10px;
  }
`

const CodeBlock = styled.pre`
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
    0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`
