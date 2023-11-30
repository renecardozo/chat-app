import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WinnersService } from 'src/services/winners.service';
import { Logger } from '@nestjs/common';
import { JsonService } from 'src/services/json.service';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly winnersService: WinnersService,
    private readonly jsonService: JsonService
    ) {}

  @WebSocketServer()
  server: Server;

  nicknames: Map<string, string> = new Map();
  messages: any[] = [];
  private readonly logger = new Logger(ChatGateway.name);

  afterInit() {
    this.logger.log('Initialized');
  }

  @SubscribeMessage('set-nickname')
  setNickname(client: Socket, nickname: string) {
    this.nicknames[client.id] = nickname;
    this.server.emit('users-changed', {user: nickname, event: 'joined'}); 
  }

  @SubscribeMessage('add-message')
  addMessage(client: Socket, data: any) {
    let newMessage = {
      message: data.message.message,
      from: this.nicknames[client.id],
      created: new Date()
    }
    this.messages.push(newMessage);
    this.server.emit('message', newMessage);
  }
  @SubscribeMessage('save-chat-history')
  saveChat(client: Socket, data: any) {
    const pathJson = '../Shared/backup/chat-history.json';
    this.logger.log(`Cliend id:${client.id} savind json file...`);
    this.jsonService.writeJson(pathJson, this.messages)
      .then( response => {
        this.logger.log(`Cliend id:${client.id} json file save successfully`);
        // simulating async call
        setTimeout(() => {
          this.server.emit('chat-history-done', true);
        }, 5000);
      })
      .catch(error => {
        // simulating async call
        setTimeout(() => {
          this.logger.log(`Cliend id:${client.id} json file not save ${error.message}`);
          this.server.emit('chat-history-done', false);
        }, 5000);
      })
  }
  @SubscribeMessage('get-latest-winners') 
  async getCurrentWheter(client: Socket, message: string | null) {
    this.logger.log(`Message received from client id: ${client.id}`);
    this.logger.debug(`Payload: ${message}`);
    const response = await this.winnersService.findAll();
    const winnerList = response.map(res => res.username);
    this.server.emit('winners-list', {winners: winnerList, event: 'winners-list'});
  }

  handleDisconnect(client: Socket) {
    console.log('desconnected')
    this.server.emit('users-changed', {user: this.nicknames[client.id], event: 'left'});
    this.nicknames.delete(client.id);
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }

  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;
    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }
}
