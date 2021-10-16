const express = require('express')
const { json } = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()

const port = 3000

app.use(cors())
app.use(json())

app.get('/', (req, res) => {

    fs.readFile('log.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        const output = data.split(', ')

        res.send([{ "led_state": output[0] === "true" ? true : false, "pwm_value": Number(output[1]) }])
    })
})

app.post('/api', (req, res) => {

    const ledState = req.body.led_state === undefined ? 0 : req.body.led_state
    const pwmValue = req.body.pwm_value === undefined ? 0 : req.body.pwm_value

    fs.writeFile('log.txt', `${ledState}, ${pwmValue}`, (err) => {

        if (err)

            return console.log(err)
    })

    res.status(200).send(req.body)
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
})