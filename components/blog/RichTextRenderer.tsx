import parse, { DOMNode, Element, attributesToProps } from 'html-react-parser'
import ZoomImage from './ZoomImage'

interface RichTextRendererProps {
  html: string
}

export default function RichTextRenderer({ html }: RichTextRendererProps) {
  const options = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.attribs) {
        if (domNode.name === 'img') {
          const props = attributesToProps(domNode.attribs)
          return (
            <ZoomImage>
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img {...props} />
            </ZoomImage>
          )
        }
      }
    }
  }

  return <>{parse(html, options)}</>
}
