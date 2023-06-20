import {Component, OnInit, Inject, NgModule} from '@angular/core';
import {CHAT_SERVICE_TOKEN, ChatService} from './chat-dialog/chat.service';

@NgModule({
  providers: [{ provide: CHAT_SERVICE_TOKEN, useClass: ChatService }],
})
export class AppModule {}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ChatService] // 添加 ChatService 到应用程序提供商列表
})
export class AppComponent implements OnInit {
  //constructor(private chatService: ChatService) { }
  constructor(@Inject(CHAT_SERVICE_TOKEN) private chatService: ChatService) { }
  ngOnInit() {

    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    })
  }

  messages: string[] = []; // 声明一个名为 messages 的字符串数组

  formValue!: string; // 声明一个名为 formValue 的字符串变量

   sendMessage() {
     this.chatService.sendMessage(this.formValue); // 将当前表单值作为消息发送到服务器
     this.formValue = ''; // 清空表单输入字段以准备下一条消息
   }
}
