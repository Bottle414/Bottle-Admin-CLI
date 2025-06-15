import { debounce } from "./debounce"

// utils/chartsResize.ts
export default function useChartResize(chart: any) {
    const resizeHandler = debounce(() => {
        chart.resize()
    }, 1200)// 防抖

    window.addEventListener('resize', resizeHandler)

    // 返回销毁方法（可在组件卸载时移除监听器）
    return () => {
        window.removeEventListener('resize', resizeHandler)
    }
}