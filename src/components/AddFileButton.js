import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileUpload} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { database } from '../firebase';

export default function AddFileButton() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const openModal = () =>{
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
        setName("")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // Create a File in the database
        database.files.add({
            name: name,
            
        })
        
        closeModal()
    }
  return (
    <>
    <Button onClick={openModal} variant='outline-success' size='sm'>
        <FontAwesomeIcon icon={faFileUpload} />
    </Button>
    <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>File Name</Form.Label>
                    <Form.Control type='text' required value={name} onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closeModal} >Close</Button>
                <Button variant="success" type="submit">Add File</Button>
            </Modal.Footer>
            
        </Form>
    </Modal>
    </>
  )
}
