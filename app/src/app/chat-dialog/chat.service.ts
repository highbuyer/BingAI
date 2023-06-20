import { Injectable, InjectionToken } from '@angular/core';
import { StreamChat, ChannelData } from 'stream-chat';
import { Observable, from, EMPTY } from 'rxjs';

export const CHAT_SERVICE_TOKEN = new InjectionToken('chat_service_token');

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  client: StreamChat;
  user: any;
  channel: any;

  constructor() {
    this.client = new StreamChat('<YOUR_STREAM_CHAT_API_KEY>');
    // 在上面这行代码中，请将 <YOUR_STREAM_CHAT_API_KEY> 替换为您自己的 API key
    // 如果需要从环境变量中获取 API key，请使用以下方式：
    // this.client = new StreamChat(environment.apiKey);
  }

  async setUser(user: string): Promise<void> {
    this.user = user;

    await this.client.setUser(
      {
        id: user,
        name: user,
        image: `https://robohash.org/${user}`
      },
      '<YOUR_USER_TOKEN>'
      // 在上面这行代码中，请将 <YOUR_USER_TOKEN> 替换为在 Stream Chat 控制台生成和管理用户密钥（User Token）。
      // 如果需要从环境变量中获取用户密钥，请使用以下方式：
      // environment.token
     );

     this.channel = this.client.channel('team', 'talkshop');
     await this.channel.watch();
   }

   async sendMessage(messageText): Promise<void> {
     if (this.user) {
       await this.channel.sendMessage({
         text: messageText
       });
     }
   }

   getMessages(): Observable<any> {
     if (this.user) {
       return from(this.channel.query({
         messages: { limit: 100 }
       }));
     } else {
       return EMPTY;
     }
   }
}
