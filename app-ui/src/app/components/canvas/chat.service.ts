// chat.service.ts
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { SocketIoConfig, Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { WebsocketService } from '../socket-provider/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: WebsocketService) {}
}
