import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { database } from '../firebase';

export default function AddFolderButton() {
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
        // Create a folder in the database
        database.folders.add({
            name: name,
            createdAt: database.getCurrentTimestamp
        })
        setName("")
        closeModal()
    }
  return (
    <>
    <Button onClick={openModal} variant='outline-success' size='sm'>
        <FontAwesomeIcon icon={faFolderPlus} />
    </Button>
    <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Folder Name</Form.Label>
                    <Form.Control type='text' required value={name} onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closeModal} >Close</Button>
                <Button variant="success" type="submit">Add Folder</Button>
            </Modal.Footer>
            
        </Form>
    </Modal>
    </>
  )
}