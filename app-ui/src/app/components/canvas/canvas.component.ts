import { Component, OnDestroy, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { sendMessage } from 'src/app/store/store.actions';

type MessageType = {
  from?: string;
  message?: string;
  created?: string;
}
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnDestroy {
  messages: MessageType[] = [];
  nickname = '';
  message: MessageType = {};
  userJoined: boolean = false;
  constructor(
    private socket: Socket,
    private store: Store) {
    this.socket.connect();
  }
  ngOnInit(): void {
    this.socket.on('message', (message: MessageType) => {
      this.messages = [...this.messages, message];
      this.store.dispatch(sendMessage({text: '[Socket] - [ON Event "message"] - Arrieved new message in the chat'}));
    });
    this.socket.on('users-changed', (data: any) => {
      if (data['event'] === 'left') {
        this.store.dispatch(sendMessage({text: `[Socket] - [ON Event "users-changed"] Arrieved new message in the chat: ${data}`}));
      } else {
        this.store.dispatch(sendMessage({text: `[Socket] - [ON Event "users-changed"] New user joined: ${data}`}));
        this.userJoined = true;
      }
    });
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
  joinChat() {
    this.socket.emit('set-nickname', this.nickname);
    this.store.dispatch(sendMessage({text: `[Socket] - [EMIT Event "set-nickname"] Arrieved new message in the chat:`}));
  }
  sendMessage() {
    let newMessage = {
      message: this.message.message,
    }
    this.socket.emit('add-message', { message: newMessage });
    this.store.dispatch(sendMessage({text: `[Socket] - [EMIT Event "add-message"] Message sent to the chat: ${this.message.message}`}));
    this.message = {};
  }
}
