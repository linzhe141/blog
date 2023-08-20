# 安装 Nginx

### 1、下载镜像

- 镜像(一个微型 Linux 系统？)

```bash
docker pull nginx:latest
# docker pull nginx[:版本号]
```

### 2、命令运行容器

```bash
docker run --name nginx-test -p 8080:80 -d nginx

```

### 3、使用 `dockerfile` 制作镜像

`dockerfile`

```dockerfile
FROM nginx

# 复制文件到容器
COPY ./webapp.conf /etc/nginx/conf.d/webapp.conf
# 需要在nginx配置文件中加入这个配置 include conf.d/*.conf;
# 暴露端口
EXPOSE 8080
```

`webapp.conf`

```nginx
server {
  listen       8080;
  server_name  localhost;

  location / {
    # 可以使用数据卷共享
    root   /usr/share/nginx/html;
    index  index.html index.htm;
  }
  location /api {
    # app 表示一个容器
    proxy_pass http://app:1234;
  }
}
```

### 4、使用 `dockder compose` 管理容器

`doker-compose up` 使用 docker-compose 启动容器

```yml
version: "3" # 用最新就行了
services:
  web: # 容器名
    image: nginx # 镜像
    ports: # 端口映射
      - "8080:8080"
    links:
      - app
    # volumes: # 通过数据卷的方式共享配置
    #   - ./nginx/conf.d:/etc/nginx/conf.d #通过数据卷的方式共享配置
  app: # 容器名(一个node后台服务)
    image: app
    expose: # 暴露容器给link到当前容器的容器， 和ports的区别是，expose不会将端口暴露给主机。
      - 1234
```
