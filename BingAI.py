# -*- coding: utf-8 -*-
"""
Created on Mon Jun 12 23:14:04 2023

@author: AI
"""
from typing import Any, Coroutine

from bingai import BingSession  # + 导入BingAI类
from fastapi import FastAPI, WebSocket, Request, Response
from pydantic import BaseModel
import langdetect  # 导入语言检测库
import textblob  # 导入文本分析库
import markdown  # 导入Markdown库

app = FastAPI()


class Message(BaseModel):
    text: str


class BingAI(BingSession):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @app.post("/get_response", response_model=Message)  # 添加路径操作装饰器
    def get_response(self, message: Message) -> Response:  # 添加self参数
        try:  # 添加try-except语句
            if isinstance(message, str):  # 文字
                language = langdetect.detect(message.text)  # 检测语言
                self.set_language(language)  # 设置语言选项
                sentiment = textblob.TextBlob(message.text).sentiment  # 分析情感
                if sentiment.polarity > 0.5:  # 正面情感
                    self.set_theme("funny")  # 设置主题为搞笑
                elif sentiment.polarity < -0.5:  # 负面情感
                    self.set_theme("horror")  # 设置主题为恐怖
                else:  # 中性情感
                    self.set_theme("scifi")  # 设置主题为科幻
                if message.text.startswith("$"):  # LaTeX格式
                    self.set_format("latex")  # 设置格式为LaTeX
                elif markdown.markdown(message.text) != message.text:  # Markdown格式
                    self.set_format("markdown")  # 设置格式为Markdown
                else:  # 其他格式
                    self.set_format("html")  # 设置格式为HTML
                if message.text.startswith("/create images"):  # 创建图像指令
                    image = self.get_chat_image(message.text[14:])  # 获取图像
                    return Response(image, media_type="image/png")  # 返回图像响应
                elif message.text.startswith("/create poems"):  # 创建诗歌指令
                    poem = self.get_chat_poem(message.text[13:])  # 获取诗歌
                    return Response(poem, media_type="text/plain")  # 返回文本响应
                elif message.text.startswith("/create stories"):  # 创建故事指令
                    story = self.get_chat_story(message.text[15:])  # 获取故事
                    return Response(story, media_type="text/plain")  # 返回文本响应
                else:  # 其他内容
                    response = self.get_chat_message(message.text)  # 获取回复文字
                    return Response(response)  # 返回回复响应
            elif isinstance(message, bytes):  # 图片或音频
                response = self.get_chat_image(message)  # 获取回复图片或音频（暂未实现）
                return Response(response)  # 返回回复响应（暂未实现）
            else:  # 其他类型
                return Response("Unsupported input type")  # 返回错误信息
        except Exception as e:  # 捕获异常和错误
            return Response(f"Something went wrong: {e}")  # 返回错误信息

    def set_language(self, language):
        pass

    def set_theme(self, param):
        pass

    def set_format(self, param):
        pass

    def get_chat_image(self, message):
        pass


class BingAI2(BingAI):  # + 定义BingAI2类，继承自BingAI类
    def __init__(self, email, password):  # + 重写初始化方法
        super().__init__(email, password)  # + 调用父类的初始化方法
        self.mode = 'Creative'  # + 设置模式为Creative
        self.max_turns = 100  # + 设置最大回合数为100
        self.memory = {}  # + 设置内存为空字典

    def get_response(self, text):  # + 重写获取回复的方法
        if text.startswith('draw me a picture of'):  # + 如果输入是图像生成请求，返回图像生成指令
            query = text[len('draw me a picture of '):]
            return f'#generative_image{{"query": "{query}", "type":"IMAGE", "actionTag":"generative_image"}}'
        else:  # + 否则，调用父类的获取回复的方法
            return super().get_response(text)
