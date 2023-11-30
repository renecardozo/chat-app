import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../socket-provider/websocket.service';
import { Store } from '@ngrx/store';
import { sendMessage } from 'src/app/store/store.actions';
@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {
  winnersList = [];
  constructor(
    private socket: WebsocketService,
    private store: Store) {
    this.socket.connect();
  }

  ngOnInit(): void {
    this.getWinnerList();
    this.store.dispatch(sendMessage({text: "[Response from backend] - [SYNC] Getting winner for the left panel"}));
  }
  
  getWinnerList() {
    this.socket.on('winners-list', (data: any) => {
      this.winnersList = data.winners;
    });
  }
}
