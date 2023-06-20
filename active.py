import base64
import hashlib
import random

def get_activation_code(machine_code):
    salt = "FinalShellPro" # 改成这个
    key = hashlib.md5((machine_code + salt).encode()).hexdigest()
    code = base64.b64encode(key.encode()).decode()
    code = code[:4] + "-" + code[4:8] + "-" + code[8:12] + "-" + code[12:16]
    return code

machine_code = input("请输入机器码：")
activation_code = get_activation_code(machine_code)
print("激活码为：" + activation_code)