import React from 'react'

import { Container } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export default function HomePage() {
  const [mdText, setMdText] = React.useState("")
  fetch("./DesignDocument.md").then(response => response.text()).then(text => { setMdText(text) })
  return (
      <Container>
        <ReactMarkdown>
        { mdText}
          </ReactMarkdown>
      </Container>
  )
}
