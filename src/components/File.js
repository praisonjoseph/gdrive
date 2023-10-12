import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function File({ file }) {
  // console.log(folder)
  return (

    <a 
    href={file.url} 
    target='blank' 
    className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} className='mr-2' />
      {file.name}
    </a>

  )
}
