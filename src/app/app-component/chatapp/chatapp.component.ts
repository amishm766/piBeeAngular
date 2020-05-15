import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/app-service/chat-service/chat.service';
import { IMessage } from 'src/app/app-interface/Message';
import { User } from 'src/app/app-interface/User';
@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit {

  socketRef : WebSocket;
  path : string = 'ws://127.0.0.1:8000/ws/chat/lobby/' ;

  displayMessage = {
    message : ''
  }

  message : IMessage = {
    'sender' : '',
    'receiver' : 'ankit',
    'content' : ''
  }

  constructor(private _chat : ChatService) { }

  ngOnInit(): void {
    this.message.sender = localStorage.getItem('username');
    this.connect()
  }

  connect() {

    this.socketRef = new WebSocket(this.path);
    
    this.socketRef.onopen = () => {
      console.log('websocket open');
      this.getMessage();
    }

    this.socketRef.onmessage = e => {
      console.log(e);
      const data = JSON.parse(e.data);
      let receiverdMessageArray = data[data.command]
      console.log(receiverdMessageArray)
      for (let i=0; i<receiverdMessageArray.length; i++) {

        // this.display_message.content.push(messageArray[i]);

        this.displayMessage.message += '\n' +
        receiverdMessageArray[i].sender + '   :   ' + 
        receiverdMessageArray[i].content;
      }
    }

    this.socketRef.onerror = e => { console.log(e);}

    this.socketRef.onclose = () => {
      console.log('websocket is closed');
      this.connect();
    }
  }

  createMessage() {
    this._chat.createMessage(this.socketRef, this.message)
    this.message.content = "";  // Refreshes the input element after the message is created
  }

  getMessage() {
    this._chat.getMessage(this.socketRef, localStorage.getItem('username'))
  }
}
