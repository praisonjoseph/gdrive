import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import NavbarComponent from './Navbar';
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";

export default function Dashboard() {

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <AddFolderButton />

      </Container>
    </>
  )
}
