import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {
    
     const dispatch = useDispatch();
      const {active}=  useSelector(state => state.notes);
      


    const handleSave=()=>{
       

        dispatch(startSaveNote(active));

    }

    const handlePicture=()=>{
        document.querySelector('#fileSelector').click();
    }


    const handleFileChange=(e)=>{
        const file= e.target.files[0];

        if (file) {
            dispatch(startUploading(file));
        }


    }
  return (
    <div className="notes_appbar">
        <span>28 de Agosto del 2022</span>

        <input
            id="fileSelector"
            name="file"
            type="file" 
            style={{display:'none'}}
            onChange={handleFileChange}
        />


        <div>
            <button className="btn" onClick={handlePicture}>
                Picture
            </button>
            <button className="btn" onClick={handleSave}>
                Save
            </button>
        </div>
    </div>
 )
}

      
