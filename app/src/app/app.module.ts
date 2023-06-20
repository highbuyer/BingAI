// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
//
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ChatModule } from './chat-dialog/chat.module';
// import {CHAT_SERVICE_TOKEN, ChatService} from './chat-dialog/chat.service';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { MatCardModule } from '@angular/material/card';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
//
// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     ChatModule,
//     BrowserModule,
//     FormsModule,
//     FlexLayoutModule,
//     MatCardModule,
//     MatInputModule,
//     MatButtonModule
//   ],
//   providers: [CHAT_SERVICE_TOKEN, ChatService],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule}from'@angular/platform- browser/animations';
import { ChatModule } from './chat-dialog/chat.module';
import { CHAT_SERVICE_TOKEN, ChatService} from './chat-dialog/chat.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChatModule,

    FormsModule,
    ReactiveFormsModule,

    FlexLayoutModule,

    MatCardModule
  ],
  providers: [{ provide: CHAT_SERVICE_TOKEN, useClass: ChatService }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
