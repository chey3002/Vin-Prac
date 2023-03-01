import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import remarkGfm from 'remark-gfm'

export default function HomePage() {
  const [mdText, setMdText] = React.useState("")
  fetch("/DesignDocument.md").then(response => response.text()).then(text => { setMdText(text) })
  return (
      <>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
            { mdText}
        </ReactMarkdown>
      </>
  )
}
