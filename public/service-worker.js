self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/offline.html', // 离线页面
          '/offline.png', // 图标
          // 其他资源
        ])
      })
    )
  })
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // 如果缓存中有资源，返回缓存
        if (response) {
          return response
        }
        // 否则尝试从网络获取
        return fetch(event.request).catch(() => {
          // 网络请求失败时返回离线页面
          return caches.match('/offline.html')
        })
      })
    )
})