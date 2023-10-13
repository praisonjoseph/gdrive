import React from "react"
import { Container } from "react-bootstrap"
import NavbarComponent from './Navbar';
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import { useFolder } from "../../hooks/useFolder";
import Folder from "./Folder";
import File from "./File";
import { useParams } from "react-router-dom";
import FolderBreadcrumbs from './FolderBreadcrumbs';
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const { folderId } = useParams()
  const { state={} } = useLocation()
  // const {folder, childFolders} = useFolder("1il0IChSPrr7LLatLhDW")
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)
  // console.log(folder, childFolders, state.folder)
  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {/* {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: '250px' }} className="p-2">
                <Folder folder={childFolder} />
              </div>
            )
            )}
          </div>
        )} */}
        
          <div className="d-flex flex-wrap">
          {childFolders.length > 0 && childFolders.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: '250px' }} className="p-2">
                <Folder folder={childFolder} />
              </div>
            )
          )}
          {childFiles.length > 0 && childFiles.map(childFile => (
                <div key={childFile.id} style={{ maxWidth: '250px' }} className="p-2">
                <File file={childFile} />
              </div>
            )
          )}
          </div>
        
        {/* {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div key={childFile.id} style={{ maxWidth: '250px' }} className="p-2">
                <File file={childFile} />
              </div>
            )
            )}
          </div>
        )} */}
      </Container>
    </>
  )
}
