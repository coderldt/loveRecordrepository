## /user/addUser
> 添加用户
### 参数

| 参数      | 含义  | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| username | 用户名 | true    | ''     |
| password | 密码   | false   | 123456 |
| phone    | 电话   | false   | ''     |

### 返回
``` js
    const status = {
        200: 添加成功,
        400: 账户名已存在，请勿重复添加
        403: 用户名或者密码为空
    }
    const res = {
        "status": 200,
        "msg": "添加成功",
        "data": {
            "username": "test"
        }
    }
```

## /user/updateUser
> 更新用户信息
### 参数
| 参数 | 含义 | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| username | 用户名 | true | - |
| password | 密码 | false | 123456 |
| phone | 电话 | false | - |
| avatarUrl | 头像 | false | - |
### 返回
``` js
    const status = {
        200: 成功,
        400: 失败
    }
    const res = {
        "status": 200,
        "msg": "更新成功",
        "data": {
            "_id": "6177c64d9edb5a295361710d",
            "username": "test",
            "password": "159369",
            "phone": "123456",
        }
    }
```

## /user/removeUser
> 删除用户信息
### 参数
| 参数 | 含义 | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| id | 用户名唯一标识 | true | - |
### 返回
``` js
    const status = {
        200: 成功,
        400: 失败
    }
    const res = {
        "status": 200,
        "msg": "删除成功",
        "data": null
    }
```

## /user/resetPassword
> 重置用户密码
### 参数
| 参数 | 含义 | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| id | 用户名唯一标识 | true | - |
### 返回
``` js
    const status = {
        200: 成功,
        400: 失败
    }
    const res = {
        "status": 200,
        "msg": "密码重置成功，为123456",
        "data": {}
    }
```

## /user/detail
> 获取用户详细信息
### 参数
| 参数 | 含义 | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| id | 用户名唯一标识 | true | - |
### 返回
``` js
    const status = {
        200: 成功,
        400: 失败
    }
    const res = {
        "status": 200,
        "msg": "",
        "data": {
            "_id": "6177b0f6bd62cdb27d21c5bd",
            "username": "tt",
            "password": "123456",
            "phone": "123456"
        }
    }
```