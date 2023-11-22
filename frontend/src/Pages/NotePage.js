import { formatDate } from '../helpers';
import { Header } from '../Components/Header';
import React, { useState, useEffect } from 'react'
import { Link, redirect, useParams } from 'react-router-dom';
import { getNoteById, deleteNote, editNoteById } from '../helpers';
import { ReactComponent as ArrowLeft } from '../Assets/arrow-left.svg'

export const NotePage = ({ props }) => {

  const { id } = useParams();
  const [singNote, setSingleNote] = useState(null);
  const [noteChange, setNoteChange] = useState(false);
  const [initialNote, setInitialNote] = useState("");

  useEffect(() => {
    getInitialData();
  }, [])

  useEffect(() => {
    setNoteChange(initialNote !== singNote?.note_body);
  }, [singNote])

  const getInitialData = async () => {
    const noteData = await getNoteById(id)
    !noteData.hasOwnProperty('error') && setSingleNote(noteData);
    !noteData.hasOwnProperty('error') && setInitialNote(noteData?.note_body);
  }

  const onNoteChange = (e) => {
    const updatedNote = e.target.value;
    setSingleNote({ ...singNote, note_body: updatedNote });
  }

  const temp = async () => {
    if (noteChange) {
      await editNoteById(singNote?.id, singNote?.note_body);
    }
  }

  const showData = () => {
    return (
      <div className='note-meta-data'>
        <hr />
        <h1>Note Number : {singNote?.id}</h1>
        <h1>Created At : {formatDate(singNote?.created_at)}</h1>
        <h1>Updated At : {formatDate(singNote?.updated_at)}</h1>
        <hr />
        <textarea defaultValue={singNote?.note_body} onChange={onNoteChange}></textarea>
      </div>
    )
  }

  const onDeleteNote = async () => {
    const resp = await deleteNote(singNote?.id);
  }

  return (
    <div className='note'>
      <Header />
      <div className='note-header'>
        <h3>
          <Link to="/">
            <ArrowLeft onClick={temp} />
          </Link>
        </h3>
        <Link to="/">
          <button onClick={onDeleteNote}>
            Delete
          </button>
        </Link>
      </div>
      {!!singNote ? showData() : <h1>No Note Found</h1>}
    </div>
  )
}