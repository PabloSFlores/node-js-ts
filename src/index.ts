import express, { Application, Request, Response, NextFunction } from 'express';
import employeeRouter from './modules/employee/adapters/employees.controller';
const app: Application = express()

// middlewares
app.use(express.json())
app.use((_req: Request, res: Response, next: NextFunction) =>  {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    next();
})
// Routes
app.get('/ping', (_req, res) => {
    console.log('Pinged')
    res.send('pong')
})
app.use('/employees', employeeRouter)

app.listen(3000)
console.log('Server on port', 3000)