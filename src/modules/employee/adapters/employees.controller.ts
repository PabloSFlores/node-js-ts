import { Request ,Response, Router } from "express"
import { GetEmployeesInteractor } from "../use-cases/get-employees.interactor"
import { GetEmployeeInteractor } from "../use-cases/get-employee.interactor"
import { SaveEmployeeInteractor } from "../use-cases/save-employee.interactor"
import { UpdateEmployeeInteractor } from "../use-cases/update-employee.interactor"
import { DeleteEmployeeInteractor } from "../use-cases/delete-employee.interactor"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "../use-cases/ports/employee.repository"
import { GetEmployeesDto } from "./dto/get-employees"
import { SaveEmployeeDto } from "./dto/save-employee"
import { UpdateEmployeeDto } from "./dto/update-employee"
import { EmployeeStorageGateway } from "./employees.storage.gateway"

const router = Router()

router.get('/employees', (req: Request, res: Response) => {
    const repo: EmployeeRepository = new EmployeeStorageGateway()
    const interactor: GetEmployeesInteractor = new GetEmployeesInteractor(repo)

    return interactor.execute(req, res)
})
router.get('/employees/:id', (req: Request, res: Response) => {
    const repo: EmployeeRepository = new EmployeeStorageGateway()
    const interactor: GetEmployeeInteractor = new GetEmployeeInteractor(repo)

    return interactor.execute(req, res)
})
router.post('/employees', (req: Request, res: Response) => {
    const repo: EmployeeRepository = new EmployeeStorageGateway()
    const interactor: SaveEmployeeInteractor = new SaveEmployeeInteractor(repo)

    return interactor.execute(req, res)
})
router.put('/employees/:id', (req: Request, res: Response) => {
    const repo: EmployeeRepository = new EmployeeStorageGateway()
    const interactor: UpdateEmployeeInteractor = new UpdateEmployeeInteractor(repo)

    return interactor.execute(req, res)
})
router.delete('/employees/:id', (req: Request, res: Response) => {
    const repo: EmployeeRepository = new EmployeeStorageGateway()
    const interactor: DeleteEmployeeInteractor = new DeleteEmployeeInteractor(repo)

    return interactor.execute(req, res)
})

export default router