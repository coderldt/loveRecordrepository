+ 安装express
``` js
    const { express } = require('express')
    const app = express()

    app.get('/', (req, res) => {
        res.send('hello word')
    })

    app.listen(3000, () => {
        console.log(`Example app listening at http://localhost:3000`)
    })
```

+ 安装mongoose
``` js
    const mongoose = require('mongooes')
    const Schema = mongoose.Schema

    const userSchema = new Schema({
        name: String
    }, { collection: 'user' })

    const user = mongoose.model('user', userSchema, 'user')
    user.find((err, data) => {
        if (err) log(err)
        log(data)
    })
```

+ express-parser
``` js
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
```

+ nodemon
```js
    yarn add nodemon
    nodemon ./app.js
```