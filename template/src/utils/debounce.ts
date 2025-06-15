// 防抖

export function debounce(func: Function, delay = 300) {
    let timer: number | null = null
    return (...args: any[]) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, delay)
    }
}