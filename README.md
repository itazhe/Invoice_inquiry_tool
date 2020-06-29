#### 扫描查真伪功能

扫描后

1.向服务器发起GET请求:

携带参数: 

msg            # 发票号

2.服务器响应

验证成功返回       1

验证失败返回       0



#### 发票验重功能

##### 1.接口地址

http://127.0.0.1:8000/pm/check/ 

##### 2.返回格式

json

##### 3.请求方式

http  get

##### 4.请求示例

http://127.0.0.1:8000/pm/check/?input_infor=555 

##### 5.请求参数

| 名称        | 必填 | 类型   | 说明             |
| ----------- | ---- | ------ | ---------------- |
| input_infor | 是   | string | 用户输入的发票号 |

##### 6.返回参数说明

| 名称 | 类型 | 说明                                       |
| ---- | ---- | ------------------------------------------ |
| data | json | json中列表包含发票代码、报销人员、开票单位 |
| req  | json | 返回状态码  0 ，表示无记录                 |

##### 7.json返回示例

{

‘msg': [1231231231, azhe, 博政]           # 有记录时返回的json示例

}

{

'status'：0       # 表示无记录

}





#### 发票保存功能

##### 1.接口地址

http://127.0.0.1:8000/pm/add/ 

##### 2.返回格式

json

##### 3.请求方式

http  get

##### 4.请求示例

http://127.0.0.1:8000/pm/add/?numb=2134131&name=azhe&department=博政 

##### 5.请求参数

| 名称       | 必填 | 类型   | 说明     |
| ---------- | ---- | ------ | -------- |
| numb       | 是   | string | 发票代码 |
| name       | 是   | string | 报销人员 |
| department | 是   | string | 开票单位 |

##### 6.返回参数说明

| 名称 | 类型 | 说明                         |
| ---- | ---- | ---------------------------- |
| req  | json | 1：保存成功，2：信息不能为空 |

##### 7.json返回示例

{

’status'：1           #  1表示保存成功，2表示信息不能为空

}