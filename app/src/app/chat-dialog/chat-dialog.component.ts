import {Component, OnInit} from '@angular/core';
import io from 'socket.io-client';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  private socket = io('http://localhost:8000'); // 连接到服务器

  constructor() {
  }

  ngOnInit(): void {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // 添加其他事件处理程序...
  }

  sendMessage() {
    const inputElement = document.getElementById("message-input") as HTMLInputElement;
    const messageText = inputElement.value;

    if (messageText) { // 如果输入框不为空，则发送新消息
      this.socket.emit("new_message", messageText);
      inputElement.value = "";
    }
  }

  changeTopic(topicName: string) {
    this.socket.emit("change_topic", topicName); // 发送更改话题请求给服务器
    // 更新应用程序中的聊天记录和UI元素等...
  }
}
