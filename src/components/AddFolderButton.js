import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { database, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { ROOT_FOLDER } from './../hooks/useFolder';

export default function AddFolderButton({currentFolder}) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const openModal = () =>{
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
        setName("")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        // Create a folder in the database
        if (currentFolder == null) return
        
        const path = [...currentFolder.path]
        // console.log(currentFolder, ROOT_FOLDER, currentFolder !== ROOT_FOLDER, JSON.stringify(currentFolder) !== JSON.stringify(ROOT_FOLDER))
        if (JSON.stringify(currentFolder) !== JSON.stringify(ROOT_FOLDER)) {
            path.push({name: currentFolder.name, id: currentFolder.id})
        }
        const docRef = await addDoc(database.folders, {
            name: name,
            parentId: currentFolder.id,
            path: path,
            createdAt: serverTimestamp()
          });

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
