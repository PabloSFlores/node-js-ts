import express, { Application } from 'express';
import cors from 'cors'
import router from './modules/employee/adapters/employees.controller';
const app: Application = express()

// middlewares
app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/ping', (_req, res) => {
    console.log('Pinged')
    res.send('pong')
})
app.use(router)

app.listen(3000)
console.log('Server on port', 3000)