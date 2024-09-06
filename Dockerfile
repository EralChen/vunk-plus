# 基于node:16.15.1镜像构建
FROM node:16.15.1 as builder

# 安装pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 将当前目录下的所有文件复制到工作目录下
COPY . ./v-admin

# 进入工作目录
WORKDIR /app/v-admin

# 安装依赖
RUN pnpm install

# 执行一些自定义的 init 脚本
RUN pnpm run app:init-arcgis

# 构建
RUN pnpm build

# 使用nginx镜像
FROM nginx:stable-alpine as prod

# 将打包输出目录复制到nginx的html目录下
COPY --from=builder /app/v-admin/app/dist /usr/share/nginx/html


# 将本地的nginx配置文件复制到nginx的配置文件目录下
COPY ./nginx.conf /etc/nginx/conf.d/default.conf


# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
