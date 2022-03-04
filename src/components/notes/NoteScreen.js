import React, { useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';


export const NoteScreen = () => {

  const {active: note} =useSelector(state=>state.notes);
 const dispatch =useDispatch();
  const [formValue,handleInputChange,reset]= useForm(note); 
  const {body,title,id} = formValue;
  
  const activeId =useRef(note.id);



  useEffect(() => {
    //con el current obtengo el valor actual
    //lo que este usando el el useEffet es lo que debo de mardar de referencia

    if ( note.id !== activeId.current ) {
      reset(note);
      activeId.current = note.id;


    }
  }, [reset,note])

  useEffect(() => {

    dispatch(activeNote(formValue.id,{...formValue}));


  },[formValue,dispatch])
      


  const handleDelete=() => {
    dispatch(startDelete(id));
  }
    
  


  return (
    <div className="notes__main-content">
      <NotesAppBar/>

      <div className="notes__content">
       
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          onChange={handleInputChange}
          value={title}
          name="title"
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          onChange={handleInputChange}
          value={body}
          name="body"

        ></textarea>
        {
            
         ( note.url) &&
        (  <div>
            <img className="notes__images"
              src={note.url}
              alt="imagen"
            />

          </div>)
        }
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Eliminar
      </button>
    </div>
  )
}
     
     

