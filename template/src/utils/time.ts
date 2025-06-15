export function getTimeText() {
    const hour = new Date().getHours()
    if (hour < 5) {
        return ', It\'s late at night.'
    } else if (hour < 9) {
        return 'Good morning!'
    } else if (hour < 12) {
        return 'Good forenoon!'
    } else if (hour < 18) {
        return 'Good afternoon!'
    } else if (hour < 22) {
        return 'Good evening!'
    } else {
        return ', It\'s late at night.'
    }
}

export function getTimeTextZh(){
    const hour = new Date().getHours()
    if (hour < 5){
        return '夜深了。'
    }
    else if (hour < 9){
        return '早上好!'
    }else if (hour < 12){
        return '中午好!'
    }else if (hour < 18){
        return '下午好'
    }else if (hour < 22){
        return '晚上好!'
    }else {
        return '夜深了。'
    }
}