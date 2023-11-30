import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../socket-provider/websocket.service';
import { Store } from '@ngrx/store';
import { sendMessage  } from '../../store/store.actions';
import { selectMessages } from '../../store/store.selectors';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-console-logs',
  templateUrl: './console-logs.component.html',
  styleUrls: ['./console-logs.component.scss']
})
export class ConsoleLogsComponent implements OnInit {

  messages$: Observable<any[]>;
  messageList: string[] = [];
  constructor(
    private socket: WebsocketService,
    private store: Store) {
    this.socket.connect();
    this.messages$ = this.store.select(selectMessages);
    console.log(this.messages$)
  }
  ngOnInit(): void {
    this.getCurrentWeather();
  }

  getCurrentWeather() {
    this.store.dispatch(sendMessage({text: "[Request to backend] Getting the latest list of winners of past event"}));
    this.socket.emit('get-latest-winners', null);
  }
}
