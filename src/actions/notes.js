import {db} from '../firebase/firebase-config'
import { collection, addDoc,updateDoc, doc, deleteDoc } from "firebase/firestore";
import {types} from "../types/types";
import { loadNotes } from '../helpers/loadNotes';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = ()=>{

    return async(dispatch,getState)=>{

        const {uid} =getState().auth;
        const  newNote ={
            title:'',
            body:'',
            date: new Date().getTime(),
        }
    

        const doc = await addDoc(collection(db, `${ uid }`, "journal/notes"),newNote);
       

        
        dispatch(activeNote(doc.id,newNote));
        dispatch(addNewNote(doc.id,newNote))


    }
}


export const addNewNote =(id,notes)=>( {
    

    type:types.notesAddNew,
    payload:{id,...notes}
})

export const activeNote =(id,notes)=>({

    type:types.notesActive,
    payload:{
        id,
        ...notes
    }

});


export const StartLoadingNotes =(uid)=>{
    return  async(dispatch)=>{
        const notes= await loadNotes(uid);
        dispatch(setNotes(notes));

    }

}


export const setNotes =(notes)=>({

    type:types.notesLoad,
    payload:notes

});
// react-journal

export const startSaveNote =(note)=>{
    return async(dispatch,getState)=>{

        const {uid} =getState().auth;
        if (!note.url) {
            delete note.url;
        }
        const noteToFirestore ={...note};

        delete noteToFirestore.id;
        await updateDoc(doc(db, `${ uid }/journal/notes/${note.id}`),noteToFirestore);

        dispatch(refreshNote(note.id,noteToFirestore));
        Swal.fire('Save',note.title,'success');

    }
}


export const refreshNote =(id,note)=>({

    type:types.notesUpdate,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }

});

export const startUploading=(file)=>{
    return async(dispatch,getState) =>{
        const {active} =getState().notes;

        Swal.fire({
            title:'Cargando...',
            text:'Porfavor Espere...',
            allowOutsideClick:false,
      
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }

        })

        const fileUrl = await fileUpload(file);
        active.url=fileUrl;
  
        dispatch(startSaveNote(active))

        Swal.close();

       

    }
}

export const startDelete=(id) => {

    return async(dispatch,getState)=>{
        const uid =getState().auth.uid;
        await deleteDoc(doc(db, `${ uid }/journal/notes/${id}`));

        dispatch(deleteNote(id));
    }
}

export const deleteNote=(id) =>( {
    type:types.notesDelete,
    payload:id

}
)

export const noteLogout=() =>({
    type:types.notesLogoutCleaning,

});

