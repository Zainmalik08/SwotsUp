import React from 'react'

function ReviewModal({open,children}) {
  if(!open) return null
  return (
    <div>{children}</div>
  )
}

export default ReviewModal