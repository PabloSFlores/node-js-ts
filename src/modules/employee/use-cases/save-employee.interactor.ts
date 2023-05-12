import { UseCase } from "@/kernel/contracts"
import { SaveEmployeeDto } from "../adapters/dto/save-employee"
import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "./ports/employee.repository"
import { Request, Response } from "express"

export class SaveEmployeeInteractor implements UseCase<SaveEmployeeDto, Response> {
    constructor(private readonly employeeRepository: EmployeeRepository){}
    execute(req: Request, res: Response): Promise<Response> {
        return this.employeeRepository.saveEmployee(req, res)        
    }
}