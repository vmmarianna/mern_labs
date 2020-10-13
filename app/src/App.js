import './App.css';
import {Table, Card, Button} from 'antd'
import "antd/dist/antd.css";
import {sendNote, getAllNotes} from './api/api';



import React, { Component } from 'react';
import SockJS from 'sockjs-client';

class App extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
    serverTime: 'нет данных'
  }

  componentDidMount() {// выполнено монтирование компонента
    // создаем подключение к сокету
    this.sock = new SockJS('http://127.0.0.1:9999/echo');

    this.sock.onopen = function () {
      console.log('open');
      // при открытии пошлем на сервер сообщение
      this.send('socket opened');
    };
    // на событие onmessage навешиваем одноименную функцию
    this.sock.onmessage = this.onMessage.bind(this);
    this.sock.onclose = function () {
      console.log('close');
    };
    setInterval(this.tick, 1000);
    this.handleSendNote(); // следующие строки добавляем
    this.getAll();
  }


handleSendNote = () => {
sendNote()
.then(res => {
console.log(res)
      })
.catch(err => console.log(err));
  }

getAll = () => {
getAllNotes()
.then(res => {
        console.log(res.data)
this.setState({
          data: res.data
        })
      })
.catch(err => console.log(err));
}

  

  //функция получает данные...
  onMessage = (e) => {
    if (e.data) {
      // и помещает их в state
      this.setState({
        serverTime: e.data
      })
    }
  }

  tick = () => {
    this.setState({
      time: new Date().toLocaleTimeString(),
    })
  }
  
  render() {
    const columns = [
      {
        title: '_id',
dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'text',
dataIndex: 'text',
        key: 'text',
      },
      {
        title: 'title',
dataIndex: 'title',
        key: 'title',
      }
    ];
    return (
<Card 
        title={'Hello, world!'}
        actions={[
<h1>Время: {this.state.time}</h1>, 
<h1>Серверноевремя: {this.state.serverTime}</h1>
        ]}
>
<Table columns={columns} dataSource={this.state.data} />
<Button>Добавить запись</Button>
</Card>
    );
  }
}
export default App;
