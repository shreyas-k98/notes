import { getAllNotes, addNote } from '../helpers';
import { Header } from '../Components/Header';
import { ListItem } from '../Components/ListItem';
import React, { useState, useEffect } from 'react'
import { ReactComponent as AddNote } from '../Assets/plus-button.svg'
import { AddNoteModal } from '../Components/AddNoteModal';

export const NotesListPage = () => {

    const [notes, setNotes] = useState([]);
    const [modal, setModal] = useState(false);
    const [noteData, setNoteData] = useState('');

    useEffect(() => {
        getInitialData();
    }, [])

    const getInitialData = async () => {
        const data = await getAllNotes();
        !data.hasOwnProperty('error') && setNotes(data);
    }

    const modalBody = () => {
        return (
            <div className='modal-header'>
                <h2>Enter Note :</h2>
                <textarea className='textarea' defaultValue={noteData} onChange={(e) => setNoteData(e.target.value)}></textarea>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <div className='notes'>
                <div className='notes-header'>
                    <h2 className='notes-title'>&#9782; Notes</h2>
                    <p className='notes-count'>{notes?.length}</p>
                </div>
                <div className='notes-list'>
                    {notes?.map((item, index) => (
                        <ListItem key={`key-${index}`} note={item} />
                    ))}
                    <div style={{
                        "fill": "#f68657",
                        "height": "50px",
                        "width": "50px",
                        "margin": "auto"
                    }}>
                        <AddNote onClick={() => setModal(true)} />
                    </div>
                </div>
            </div>
            <AddNoteModal
                isOpen={modal}
                modalBody={modalBody}
                onClose={() => setModal(false)}
                onSubmit={async () => {
                    const resp = await addNote(noteData);
                    const res = await getInitialData();
                    setModal(false);
                }}
            />
        </div>
    )
}
