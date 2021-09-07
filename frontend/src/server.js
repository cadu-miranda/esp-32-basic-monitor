const http = require('http')
const port = 3000

http.createServer((req, res) => {

    const ledState = 1
    const pwmValue = 255

    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': "*",
        'Connection': "keep-alive"
    })
    res.write(`[{ \"led_state\": ${ledState}, \"pwm_value\": ${pwmValue}}]`)
    res.end()

}).listen(port);