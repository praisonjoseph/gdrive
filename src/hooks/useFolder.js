import { useEffect, useReducer } from "react";
import { database } from "../firebase";
import { query, where, onSnapshot, orderBy, doc, getDoc } from "firebase/firestore";

const ACTIONS = {
    SELECT_FOLDER: 'select_folder',
    UPDATE_FOLDER: 'update_folder',
    SET_CHILD_FOLDERS: 'set_child_folders'
}

export const ROOT_FOLDER = { name: 'Root', id: null, path: [] }

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: [],
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders,
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles,
            }
        default:
            return state
    }
}
export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    })

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: { folderId, folder }
        })
    }, [folderId, folder])

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER }
            })
        }

        const folderdocRef = doc(database.folders, folderId);
        const folderdocSnap = getDoc(folderdocRef);
        folderdocSnap
        .then((doc) => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: database.formattedDoc(doc) }
            })
        } )
        .catch(() => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER }
            })            
        })

    }, [folderId])


    useEffect(() => {
        const q = query(database.folders,
            where("parentId", "==", folderId), orderBy("createdAt")
        )
        return onSnapshot(q, (querySnapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders: querySnapshot.docs.map(database.formattedDoc) }
            })

        });
    }, [folderId])

    useEffect(() => {
        const q = query(database.files,
            where("parentId", "==", folderId), orderBy("createdAt")
        )
        return onSnapshot(q, (querySnapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FILES,
                payload: { childFiles: querySnapshot.docs.map(database.formattedDoc) }
            })
        });
    }, [folderId])

    return state
}