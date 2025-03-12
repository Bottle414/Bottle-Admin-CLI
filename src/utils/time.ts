export function getTimeText(){
    const hour = new Date().getHours()
    if (hour < 5){
        return 'night'
    }
    else if (hour < 9){
        return 'morning'
    }else if (hour < 12){
        return 'noon'
    }else if (hour < 18){
        return 'afternoon'
    }else if (hour < 22){
        return 'evening'
    }else {
        return 'night'
    }
}