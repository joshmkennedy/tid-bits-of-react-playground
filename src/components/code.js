import React from 'react'
import nightOwl from 'prism-react-renderer/themes/oceanicNext'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import styled from 'styled-components'
import { useMDXScope } from 'gatsby-plugin-mdx/context'

export const Code = ({ codeString, language, ...props }) => {
  if (props['react-live']) {
    const components = useMDXScope()

    return (
      <LiveCodeBlock>
        <LiveProvider
          code={codeString}
          scope={components}
          noInline={false}
          {...defaultProps}
          theme={theme}
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
      <Highlight
        {...defaultProps}
        theme={theme}
        code={codeString}
        language={language}
      >
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
  background: white;
  .preview__label {
    margin-top: -10px;
    margin-left: -10px;
    margin-right: -10px;
    padding: 10px;
    background: #f9f9f9;
    font-weight: 700;
    margin-bottom: 10px;
  }
`

const CodeBlock = styled.pre`
  padding: 10px;
  overflow-x: scroll;
  border-radius: 8px;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
    0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`
export const Snippet = ({ children, language }) => {
  return (
    <Highlight
      {...defaultProps}
      theme={theme}
      code={children}
      language={language}
    >
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

const theme = {
  plain: {
    color: '#F5ECE9',
    backgroundColor: '#150E41',
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgba(239, 83, 80, 0.56)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted', 'attr-name'],
      style: {
        color: 'rgb(173, 219, 103)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'hsl(248, 45%, 50%)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: 'hsl(164, 73%, 50%)',
      },
    },
    {
      types: ['variable'],
      style: {
        color: 'var(--sand)',
      },
    },
    {
      types: ['number'],
      style: {
        color: 'hsl(351, 54%, 57%)',
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function'],
      style: {
        color: 'hsl(351, 94%, 77%)',
      },
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ['punctuation'],
      style: {
        color: 'hsl(273, 40%, 60%)',
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: 'hsl(351, 94%, 77%)',
        fontStyle: 'italic',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'var(--sand)',
      },
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: 'hsl(248, 55%, 70%)',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'hsl(207, 76%, 49%)',
      },
    },
    {
      types: ['property'],
      style: {
        color: 'hsl(164, 53%, 60%)',
      },
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)',
      },
    },
  ],
}
