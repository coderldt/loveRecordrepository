## nginx 安装文档
+ cd /usr/src
+ wget http://nginx.org/download/nginx-1.13.7.tar.gz
+ tar -zxvf nginx-1.13.7.tar
+ apt-get install gcc libpcre3 livpcre3-dev zlib1g zlib1g-dev openssl  我是一个一个安装的
  + apt-get install libssl-dev
+ cd nginx-1.13.7
+ ./configure
+ make
+ make install
+ cd /usr/local/nginx/sbin
+ ./nginx

### 命令
<!-- 启动 -->
+ ./nginx
<!-- 重启 -->
+ nginx -s reload

### 配置
<!-- 反向3000代理到80 -->
``` js
  server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        proxy_pass http://127.0.0.1:3000;
        root   html;
        index  index.html index.htm;
    }
  }
```