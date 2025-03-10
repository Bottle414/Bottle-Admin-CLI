export async function getAllUsers(){
    try {
        const response = await fetch('http://localhost:3000/Users')
        const user = await response.json()
        return user
    } catch (error) {
        console.log('获取所有用户失败')
        return 'error'
    }
}

export async function login(username : String, password : String){
    try {
        const response = await fetch(`http://localhost:3000/Users?username=${ username }`)
        const user = await response.json()
        if (user === '') {
            return {code: 404, data: {message: 'user not find'}}
        }
        const { pwd } = user
        if (pwd === password){
            const { token } = user
            return {code: 200, date:{token: token}}
        }else {
            return {code: 400, data: {message: 'password is wrong'}}
        }
    } catch (error) {
        
    }
}