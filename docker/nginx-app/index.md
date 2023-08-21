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
#! 用于向用户和其他开发人员传达容器内应用程序所监听的端口。
#! 它本身并不会在构建或运行镜像时触发任何动作。
#! EXPOSE 仅仅是一个元数据，用于提供关于容器的信息
EXPOSE 8080
```

`webapp.conf`

```nginx
server {
  listen       4534;
  server_name  localhost;

  location / {
    # 可以使用数据卷共享
    root   /usr/share/nginx/html;
    index  index.html index.htm;
  }
  location /api {
    # webserver 表示一个容器
    proxy_pass http://webserver:3000;
  }
}
```

### 4、使用 `dockder compose` 管理容器

`doker-compose up` 使用 docker-compose 启动容器

```yml
version: "3" #? 用最新就行了
services:
  web: # 容器名
    # image: nginx # 镜像
    build: ./webapp # 根据指定目录下的Dockerfile构建镜像
    ports: # 端口映射
      - "4534:4534"
    links:
      - webserver # 允许一个容器能够访问另一个容器，并在它们之间建立网络连接
    # volumes: # 通过数据卷的方式共享配置
    #   - ./nginx/conf.d:/etc/nginx/conf.d #通过数据卷的方式共享配置
  webserver: # 容器名(一个node后台服务)
    # image: app
    build: ./webserver # 根据指定目录下的Dockerfile构建镜像
    expose: # 暴露容器给link到当前容器的容器， 和ports的区别是，expose不会将端口暴露给主机。
      - "3000"
```

- 步骤 1：`docker-compose build`(可选)构建镜像
- 步骤 2：`docker-compose up -d`后台启动容器
