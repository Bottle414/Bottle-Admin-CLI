// 防抖函数
export function debounce(fn: (...args: any[]) => void, delay = 300) {
    let timer: number | null = null
        return (...args: any[]) => {
            if (timer) clearTimeout(timer)
                timer = window.setTimeout(() => {
                fn(...args)
        }, delay)
    }
}  