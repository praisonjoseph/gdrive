import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import NavbarComponent from './Navbar';
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import { useFolder } from "../hooks/useFolder";
import Folder from "./Folder";
import { useParams } from "react-router-dom";
import FolderBreadcrumbs from './FolderBreadcrumbs';
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const { folderId } = useParams()
  const { state={} } = useLocation()
  // const {folder, childFolders} = useFolder("1il0IChSPrr7LLatLhDW")
  const { folder, childFolders } = useFolder(folderId, state.folder)
  // console.log(childFolders)
  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: '250px' }} className="p-2">
                <Folder folder={childFolder} />
              </div>
            )
            )}
          </div>
        )}
      </Container>
    </>
  )
}
