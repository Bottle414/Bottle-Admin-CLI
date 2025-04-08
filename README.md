# tourism-project

后台管理系统的前端
## 前三次提交是英文的解释
一开始想遵守git提交规范，但是发现每写一句话都要问问ai怎么翻译，于是后续全部改成中文了。git提交有不及时的地方。请老师包涵！

## 项目运行流程
main.ts -> app.vue(一级导航) -> layout(主要界面, 含有main, main是二级导航显示的地方) -> 其他各种功能……

## # 项目结构
<pre>
src/
|
|—— assets/           # 静态资源
|   |—— images        # 图片
|   |—— icons         # svg图标
|—— api/  # 接口
|    |—— ...          # 一些对应的接口
|    |—— index.ts     # 封装axios
|
|—— style/            # 样式
|   |—— _color.scss   # 全局颜色
|   |—— _variable.scss# 全局变量
|
│── components/       # 可复用 的组件
│   ├── Header.vue    # 顶部栏
│   ├── Category.vue  # 三级分类组件
│   ├── Sidebar.vue   # 侧边栏  
|
|—— layout/           # 分页
|   |—— topbar/       # 顶部栏
|   |—— main/         # 二级路由展示位置
|   |—— index.ts      # 分页的基本页面
|   |—— logo.ts       # 分页里的logo封装
|
│── views/            # 页面 级组件 都采用文件夹 + index.vue方式，便于拓展
│   ├── Home/      # 首页
│   ├── About/    # [废弃]
│   ├── Login/     # 登录
|   |—— Register/  # 注册
|
│── router/           # 路由配置
|   |—— index.ts      # 配置所有路由
|   |—— asyncRoutes   # 异步路由
|   |—— basicRoutes   # 常量路由
|   |—— permissions   # 全局守卫，用于路由鉴权
|
│── store/            # 状态管理 (Vuex/Pinia)
|   |—— index.ts      # 大仓库
|   |—— settingStore.ts  # 记录侧边栏折叠状态、界面是否局部刷新
|   |—— moudules      # 小仓库模块
|         |—— userStore.ts       # 用户仓库
|         |—— catogoryStore.ts   # 分类仓库
|
|—— utils/            # 封装的一些工具函数
|—— setting.ts        # 配置logo参数
│── App.vue           # 根组件
│── main.ts           # 入口文件

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install(项目初始化，需要安装node环境，当前项目node版本v22.13.0)
```

### Compile and Hot-Reload for Development

```sh
npm run dev(项目启动方法)
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
