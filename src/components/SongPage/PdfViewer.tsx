import { Document, Page as PdfPage, pdfjs } from 'react-pdf'
import styled from 'styled-components'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
  pdfUrls: string[]
  width: number | undefined
  className?: string
}

// TODO: handle multiple pages pdfs
export const PdfViewer = ({ pdfUrls, width, className }: Props) => {
  return (
    <Wrapper className={className}>
      {pdfUrls.map(pdfUrl => (
        <Document key={pdfUrl} file={{ url: pdfUrl }}>
          <PdfPage pageNumber={1} width={width} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div``

