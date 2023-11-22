import axios from "axios"
import moment from "moment";

export const getAllNotes = async () => {
    try {
        const response = await axios.get('/api/notes/');
        return response?.data;
    }
    catch (error) {
        return error;
    }
}
export const getNoteById = async (noteId) => {
    try {
        const response = await axios.get(`/api/note/?id=${noteId}`);
        return response?.data;
    }
    catch (error) {
        return error;
    }
}

export const editNoteById = async (noteId, noteData) => {
    try {
        const formData = new FormData();
        formData.append('note_body', noteData);
        const response = await axios.put(`/api/note/?id=${noteId}`, formData);
        return response?.data;
    }
    catch (error) {
        return error;
    }

}

export const formatDate = (date) => {
    const formatted = moment(date).format("LLL");
    return formatted;
}

export const deleteNote = async (noteId) => {
    try {
        const response = await axios.delete(`/api/note/?id=${noteId}`);
        return response?.data;
    }
    catch (error) {
        return error;
    }
}

export const addNote = async (note) => {
    try {
        const formData = new FormData();
        formData.append('note_body', note);
        const response = await axios.post(`/api/note/`, formData);
        return response?.data;
    }
    catch (error) {
        return error
    }
}