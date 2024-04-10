import { PaperclipIcon } from 'lucide-react'
import React, { useRef } from 'react'

type UploadFileProps = {}

const UploadFile = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <input hidden ref={inputRef} />
      <PaperclipIcon onClick={() => inputRef.current?.click()} />
    </>
  )
}

export default UploadFile
