## /photo/create
> 添加笔记
### 参数

| 参数      | 含义  | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| title | 标题 | fasle    | ''     |
| desc | 描述   | false   | '' |
| pics    | 图片路径   | true   | []     |

### 返回
``` js
    
```

## /photo/removePic
> 删除笔记
### 参数
| 参数 | 含义 | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| id | 当前记录id | true | - |
| pic | 删除的图片url | true | - |
### 返回
``` js
```

## /photo/list
> 查询当前筛选列表
### 参数
| 参数 | 含义 | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| time | 期待时间段 | false | '' |
| timeSort | 创建时间段 | false | 'desc' |
| page | 当前页 | false | 1 |
| pageSize | 当前页总个数 | false | 5 |
> time 只支持筛选到天
### 返回
``` js
{
    "status": 200,
    "msg": "查询成功",
    "data": {
        "list": [
            {
                "createTime": "2021-10-30",
                "list": [
                    {
                        "_id": "617d42af5d5e5d8aba46a7b8",
                        "createTime": "2021-10-30 21:43:03",
                        "pics": [
                            "5"
                        ],
                        "title": "测试图片添加",
                        "comment": [],
                        "__v": 0
                    }
                ]
            },
            {
                "createTime": "2021-10-29",
                "list": [
                    {
                        "_id": "617d2da651de4a17fe696199",
                        "createTime": "2021-10-29 19:58:33",
                        "pics": [
                            "2"
                        ],
                        "title": "测试图片添加",
                        "comment": [],
                        "__v": 0
                    },
                    {
                        "_id": "617d2d5851de4a17fe696190",
                        "createTime": "2021-10-29 19:40:32",
                        "pics": [
                            "1"
                        ],
                        "title": "测试图片添加",
                        "comment": [],
                        "__v": 0
                    }
                ]
            }
        ]
    },
    "total": 2
}
```
