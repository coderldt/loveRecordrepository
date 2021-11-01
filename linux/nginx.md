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

### ssl配置 需要开启安全组为前提
+ 文件 （放置路径：/usr/local/ssl/）
  - 6526938_litt.club.pem
  - 6526938_litt.club.key
``` js
  server {
    listen       443 ssl;
    server_name  litt.club;
    ssl_certificate /usr/local/ssl/6526938_litt.club.pem;
    ssl_certificate_key /usr/local/ssl/6526938_litt.club.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #表示使用的加密套件的类型。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #表示使用的TLS协议的类型。
    ssl_prefer_server_ciphers on;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
        proxy_pass https://127.0.0.1:3000;
        root   html;
        index  index.html index.htm;
    }
  }
```

### 开启安全组
+ sudo ufw status 查看当前防火墙的端口状态
+ sudo ufw default deny incoming 阻止所有流量进入linux
+ sudo ufw allow in "Nginx Full" 选择 Nginx Full 配置文件
+ sudo ufw enable 开启防火墙
+ sudo ufw status verbos 
[连接](https://blog.csdn.net/weixin_34479122/article/details/116634913)
