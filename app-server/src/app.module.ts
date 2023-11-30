import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiGateway } from './gateways/api.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { HttpModule } from '@nestjs/axios';
import { WinnersService } from './services/winners.service';
import { JsonService } from './services/json.service';


@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    ApiGateway,
    ChatGateway,
    WinnersService,
    JsonService,
  ],
})
export class AppModule {}
