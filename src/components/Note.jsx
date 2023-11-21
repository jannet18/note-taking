import React from 'react'

function Note({id, title, content, tag}) {
  return (
    <div>
        <h3>{title}</h3>
        <span>{tag}</span>
        <p>{content}</p>
    </div>
  )
}

export default Note