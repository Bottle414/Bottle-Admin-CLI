/**
 * 时间格式化函数
 * 示例：const dateStr = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
 */

export function formatDate(
    date: Date,
    pattern = 'YYYY-MM-DD HH:mm:ss'
): string {
    const pad = (n: number, len = 2) => n.toString().padStart(len, '0')

    const tokens: Record<string, string> = {
        YYYY: date.getFullYear().toString(),
        MM: pad(date.getMonth() + 1),
        DD: pad(date.getDate()),
        HH: pad(date.getHours()),
        mm: pad(date.getMinutes()),
        ss: pad(date.getSeconds()),
        SSS: pad(date.getMilliseconds(), 3),
        d: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]
    }

    return pattern.replace(
        /YYYY|MM|DD|HH|mm|ss|SSS|d/g,
        (token) => tokens[token] || token
    )
}
