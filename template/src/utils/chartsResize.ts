import { debounce } from "./debounce"

export default function useChartResize(chart: any) {
    // 防抖
    const resizeHandler = debounce(() => {
        chart.resize()
    }, 1200)

    window.addEventListener('resize', resizeHandler)

    // 返回销毁方法
    return () => {
        window.removeEventListener('resize', resizeHandler)
    }
}