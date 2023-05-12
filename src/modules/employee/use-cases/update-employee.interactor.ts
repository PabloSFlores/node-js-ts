import { UseCase } from "@/kernel/contracts"
import { UpdateEmployeeDto } from "../adapters/dto/update-employee"
import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "./ports/employee.repository"
import { Request, Response } from "express"

export class UpdateEmployeeInteractor implements UseCase<UpdateEmployeeDto, Response> {
    constructor(private readonly employeeRepository: EmployeeRepository){}
    execute(req: Request, res: Response): Promise<Response> {
        return this.employeeRepository.updateEmployee(req, res)
    }
}
