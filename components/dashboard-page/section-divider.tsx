import React from 'react'

type SectionDividerProps = {
  children?: React.ReactNode
}

const SectionDivider = ({ children }: SectionDividerProps) => {
  return (
    <div className="items-left font-poppins text-secondary text-2xl mb-8 mt-16">
      {children}
    </div>
  )
}

export default SectionDivider
