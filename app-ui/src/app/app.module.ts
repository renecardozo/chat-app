import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ConsoleLogsComponent } from './components/console-logs/console-logs.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { WebsocketService } from './components/socket-provider/websocket.service';
import { environment } from 'src/environments/environment';
const config: SocketIoConfig = { url: environment.WS_API, options: {} };
import { appReducer } from './store/store.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConsoleLogsComponent,
    LeftPanelComponent,
    RightPanelComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    StoreModule.forRoot({messages: appReducer}),
  ],
  providers: [
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
