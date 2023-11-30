import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocketIoConfig, Socket } from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: environment.WS_API,
  options: {
    autoConnect: false
} 
};

@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends Socket {
  constructor() {
    super(config);
  }
}