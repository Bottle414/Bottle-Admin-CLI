// 节流

export function throttle(func: Function, gap = 200) {
    let lastTime = 0
    return function (...args: any) {
        const now = Date.now()
        if (now - lastTime >= gap) {
            lastTime = now
            func(...args)
        }
    }
}