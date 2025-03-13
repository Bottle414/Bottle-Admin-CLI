// logo配置
export const logoConfig = {
    title: '垃圾系统',
    image: '/public/mouse.gif'    // @失效了 路由跳转图片又失效，改成import或直接放到public
    /*
        @/assets/ 里的文件会被 Webpack 或 Vite 打包，它的路径会变成动态的，如 /dist/assets/mouse.abc123.gif。
如果你的路由是 history 模式，路径可能会变成 相对路径，导致找不到图片。
    */
}

// export default {}写法也行