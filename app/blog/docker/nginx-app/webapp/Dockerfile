FROM nginx
# nginx配置
COPY ./nginx/webapp.conf /etc/nginx/conf.d/webapp.conf
# 这个www目录就是当前打包出来的应用
COPY ./www /usr/share/nginx/html
#! 用于向用户和其他开发人员传达容器内应用程序所监听的端口。
#! 它本身并不会在构建或运行镜像时触发任何动作。
#! EXPOSE 仅仅是一个元数据，用于提供关于容器的信息
# EXPOSE 4534 