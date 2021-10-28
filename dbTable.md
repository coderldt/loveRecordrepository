## userTable (预留测试账户) (接口已完成)
| 用户名   | 密码 | 手机号 | 头像 | id |
| username | password | phone | avatarUrl | id |


## detailGroup
{
    startTime: '',
    user: [
        {
            username: '',
            name: '',
            phone: '',
            idCard: '',
            dirthday: '',
            age: '',
        },
        {
            username: '',
            name: '',
            phone: '',
            idCard: '',
            dirthday: '',
            age: '',
        }
    ]
}

## photoGroup 相册
{
    list: [
        {
            time: '',
            pic: ['', ''],
            desc: '',
            comment: [
                {
                    id: '',
                    username: '',
                    desc: '',
                    creatTime: '',
                    replys: [
                        {
                            id: '',
                            username: '',
                            desc: '',
                            creatTime: '',
                            replys: [
                                
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

## recordGroup 记录(纪念)表 (接口已完成)
{
    descriptions: [
        { createTime: '', content: '' }
    ],
    img: '',
    list: [
        {
            createTime: '',
            title: '',
            desc: '',
            daysCount: '',
            pics: []
        }
    ]
}

## moodGroup 心情表 (接口已完成)
{
    list: [
        {
            time: '',
            status: '1|2|3',
            desc: '',
            type: '1|2' // 1 及时 2 补充
        }
    ]
}

## noteGroup 备忘录
{
    list: [
        {
            createTime: '',
            title: '',
            desc: '',
            RichTextContent: '',
            expectTime: ''
        }
    ]
}