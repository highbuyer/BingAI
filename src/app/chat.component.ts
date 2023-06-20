import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  user: string;
  message: string;
  messages: any[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.user = prompt('Enter your name:');
    if (this.user) {
      this.chatService.setUser(this.user).then(() => {
        this.chatService.getMessages().then((data) => {
          this.messages = data.messages;
        });
        this.chatService.channel.on('message.new', (event) => {
          this.messages.push(event.message);
        });
      });
    }
  }

  sendMessage() {
    if (this.message) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

}