import axios from 'axios';
export const sendNote = () => // создание новой записи в базе
axios.post('http://localhost:8000/notes/add', {
        'title': 'KEBAB228',
        'body': 'TEST1337'
    });
export const getAllNotes = () => // получение всех записей
axios.get('http://localhost:8000/notes/all');
