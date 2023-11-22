import React from 'react'
import { Link, redirect } from 'react-router-dom';
import { NotePage } from '../Pages/NotePage';

export const ListItem = (props) => {
  const { note } = props;

  return (
    <Link to={`/note/${note.id}`}>
      <div className='notes-list-item'>
        <h3>{note?.note_body?.slice(0, 40) + " ..."}</h3>
      </div>
    </Link>
  )
}