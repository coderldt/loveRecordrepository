## 安装mongodb
+ wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1804-5.0.3.tgz 
    - 下载
+ tar -zxvf mongodb-linux-x86_64-ubuntu1804-5.0.3.tgz 
    - 解压
+ mv mongodb-linux-x86_64-ubuntu1804-5.0.3 /usr/local/mongodb
    - 移动到/usr/local/mongodb目录下
+ vim /etc/profile
``` js
    export PATH=$PATH:/usr/local/mongodb/bin
```
+ source /etc/profile
+ cd /usr/local/mongodb & mkdir -p /data/db & mkdir -p /data/logs & touch logs
    - 进入到相对目录，创建db和log文件
+ cd ./bin & touch mongodb.conf & vim mongodb.conf
``` js
    # 数据库数据存放目录
    dbpath = /usr/local/mongodb/data/db
    # 数据库日志存放目录
    logpath = /usr/local/mongodb/data/logs/logs
    # 以追加的方式记录日志
    logappend = true
    # 端口号
    port = 27017
    # 以后台方式启动
    fork = true
    # 允许外部访问，127.0.0.1仅本机可访问
    bind_ip = 0.0.0.0
```
+ 启动 ./mongod -r ./mongodb.conf 


### 备份数据库
+ 备份
    + cd /usr/local/mongodb/data/db
    + zip -r dataBaseCopy.zip ./
    + mv dataBaseCopy.zip /数据库备份地址/
+ 还原
    + unzip ./ dataBaseCopy.zip

### 工具
+ apt install vim