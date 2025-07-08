# 使用官方 Node.js 镜像
FROM node:22.13.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制整个后端项目文件到容器中
COPY ./src ./src

# 暴露后端端口，假设后端监听 3000 端口
EXPOSE 3000

# 启动后端应用
CMD ["npm", "run", "start"]
