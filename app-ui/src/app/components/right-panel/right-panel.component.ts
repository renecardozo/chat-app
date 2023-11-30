import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { WebsocketService } from '../socket-provider/websocket.service';
import { sendMessage } from 'src/app/store/store.actions';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  isSaving: boolean = false;
  message: string = '';
  success: boolean = false;
  constructor(
    private socket: WebsocketService,
    private store: Store) { }

  ngOnInit(): void {
    this.socket.on('chat-history-done', (data: boolean) => {
      this.isSaving = false;
      this.success = data;
      if (data) {
        this.message = 'Chat history Saved Sucessfully';
        this.store.dispatch(sendMessage({text: `[Response from backend] - [ASYNC] ${this.message}`}));
      } else {
        this.message = 'There was some problems saving the history chat';
        this.store.dispatch(sendMessage({text: `[Response from backend] - [ASYNC] ${this.message}`}));
      }
      setTimeout(() => {
        this.message = '';
      }, 3000);
    })
  }

  saveChatHistory() {
    this.socket.emit('save-chat-history');
    this.store.dispatch(sendMessage({text: "[Request to backend] - [ASYNC] Saving chat history"}));
    this.isSaving = true;
  }

}
