import { Injectable } from '@angular/core';
import { StreamChat } from 'stream-chat';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  client: StreamChat;
  user: any;
  channel: any;

  constructor() {
    this.client = new StreamChat(environment.apiKey);
  }

  async setUser(user) {
    this.user = user;
    await this.client.setUser(
      {
        id: user,
        name: user,
        image: `https://robohash.org/${user}`
      },
      environment.token
    );
    this.channel = this.client.channel('team', 'talkshop');
    await this.channel.watch();
  }

  async sendMessage(message) {
    if (this.user) {
      await this.channel.sendMessage({
        text: message
      });
    }
  }

  async getMessages() {
    if (this.user) {
      return await this.channel.query({
        messages: { limit: 100 }
      });
    }
  }
}
