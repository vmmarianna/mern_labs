//import axios from 'axios';
const axios = require('axios')
const sendNote = () => // создание новой записи в базе
axios.post('http://localhost:8000/notes/add', {
        'title': 'KEBAB228',
        'body': 'TEST1337'
    });
const getAllNotes = () => // получение всех записей
axios.get('http://localhost:8000/notes/all');


sendNote()
.then(res => {
    console.log(res)
})


getAllNotes()
.then(res => {
    console.log(res)
})