## /mood/create
> 添加心情记录
### 参数

| 参数      | 含义  | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| status | 心情状态 | true    | '' [1,2,3]     |
| desc | 描述   | false   | 123456 |
| time    | 时间   | false   | ''     |

### 返回
``` js
    
```

## /note/remove
> 删除心情记录
### 参数
| 参数 | 含义 | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| id | 当前笔记id | true | - |
### 返回
``` js
```

## /note/list
> 查询当前筛选列表
### 参数
| 参数 | 含义 | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| status | 心情状态 | false | '' |
| timeSort | 时间排序（asc生 desc降） | false | 'asc' |
| time | 时间段筛选 { start， end } | false | '' |
| page | 当前页 | false | 1 |
| pageSize | 当前页总个数 | false | 10 |
### 返回
``` js
```