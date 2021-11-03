## /api/login
> 登录
### 参数

| 参数      | 含义  | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| username | 用户名 | true    | ''    |
| password | 密码   | true   | '' |

### 返回
``` js
    {
        "status": 200,
        "msg": "登录成功",
        "data": {
            "id": "617f92e5279a6785db77f11b",
            "username": "test",
            "phone": "18735674699",
            "token": "6340a645948438cf7530aeab4eaa486f",
            "expirationTime": "2021-11-04 14:14:58"
        }
    }
```