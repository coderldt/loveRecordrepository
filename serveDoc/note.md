## /note/create
> 添加笔记
### 参数

| 参数      | 含义  | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| title | 标题 | true    | ''     |
| desc | 描述   | false   | 123456 |
| richTextContent    | 富文本内容   | false   | ''     |
| expectTime    | 期待实现时间   | false   | ''     |

### 返回
``` js
    
```

## /note/remove
> 删除笔记
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
| expectTime | 期待时间段 | false | '' |
| createTime | 创建时间段 | false | '' |
| expectTimeSort | 期待实现时间排序 | false | '' |
| createTimeSort | 创建实现时间排序 | false | '' |
| page | 当前页 | false | 1 |
| pageSize | 当前页总个数 | false | 10 |
> expectTime参数优先级高于createTime， expectTimeSort优先级高于createTimeSort
### 返回
``` js
```

## /note/update
> 查询当前筛选列表
### 参数
| 参数 | 含义 | 是否必传 | 默认值 |
| :---:| :---: | :----: | :---: |
| id | 当前id | true | '' |
| desc | 描述 |  false | '' |
| richTextContent | 富文本内容 |  false | '' |
| expectTime | 希望实现时间 |  false | '' |
### 返回
``` js
```