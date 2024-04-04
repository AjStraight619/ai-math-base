import { TriangleAlertIcon } from 'lucide-react'
import React from 'react'

type ErrorMessageProps = {
  errorMessage?: string
}

export const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return (
    <>
      {errorMessage && (
        <div className="w-full p-2 rounded-md bg-rose-500/30 flex flex-row items-center gap-x-2 text-rose-400 text-center">
          <TriangleAlertIcon size={20} />
          <p className="text-center">{errorMessage}</p>
        </div>
      )}
    </>
  )
}
