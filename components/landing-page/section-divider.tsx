import React from 'react'

const SectionDivider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-24">
      <h2 className="text-center text-3xl font-poppins mb-8">{children}</h2>
    </div>
  )
}

export default SectionDivider
