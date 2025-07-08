const app = require('./app')
const { serverPort : port } = require('./config')

app.listen(port, () => {
    console.log(`listening in port: ${ port }...`)
})