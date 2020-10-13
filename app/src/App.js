//import React from 'react';
//import logo from './logo.svg';
import './App.css';


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
    console.log(this.state)
    return (
	<div>
          <h1>Время: {this.state.time}</h1>, 
          <h1>Серверное время: {this.state.serverTime}</h1>
	</div>
    );
  }
} 


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
