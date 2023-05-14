import { Request, Response, Router } from "express"
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

export class EmployeeController {
    static findAll = async (req: Request, res: Response) => {
        const repo: EmployeeRepository = new EmployeeStorageGateway()
        const interactor: GetEmployeesInteractor = new GetEmployeesInteractor(repo)

        const response = await interactor.execute()
        return res.status(response.code).json(response)
    }
    static findOneEmployee = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const repo: EmployeeRepository = new EmployeeStorageGateway()
        const interactor: GetEmployeeInteractor = new GetEmployeeInteractor(repo)

        const response = await interactor.execute(id)
        return res.status(response.code).json(response)
    }
    static saveEmployee = async (req: Request, res: Response) => {
        const payload: SaveEmployeeDto = { ...req.body } as SaveEmployeeDto
        const repo: EmployeeRepository = new EmployeeStorageGateway()
        const interactor: SaveEmployeeInteractor = new SaveEmployeeInteractor(repo)

        const response = await interactor.execute(payload)
        return res.status(response.code).json(response)
    }
    static updateEmployee = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const payload: UpdateEmployeeDto = { id: id, ...req.body } as UpdateEmployeeDto
        const repo: EmployeeRepository = new EmployeeStorageGateway()
        const interactor: UpdateEmployeeInteractor = new UpdateEmployeeInteractor(repo)

        const response = await interactor.execute(payload)
        return res.status(response.code).json(response)
    }
    static deleteEmployee = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const repo: EmployeeRepository = new EmployeeStorageGateway()
        const interactor: DeleteEmployeeInteractor = new DeleteEmployeeInteractor(repo)

        const response = await interactor.execute(id)
        return res.status(response.code).json(response)
    }
}

router.get('/', EmployeeController.findAll)
router.get('/:id', EmployeeController.findOneEmployee)
router.post('/', EmployeeController.saveEmployee)
router.put('/:id', EmployeeController.updateEmployee)
router.delete('/:id', EmployeeController.deleteEmployee)

export default router