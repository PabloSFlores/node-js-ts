import { UseCase } from "@/kernel/contracts"
import { GetEmployeesDto } from "../adapters/dto/get-employees"
import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "./ports/employee.repository" 
import { Request, Response } from "express"

export class GetEmployeeInteractor implements UseCase<number, Response> {
    constructor(private readonly employeeReposotory: EmployeeRepository){}

    execute(req: Request, res: Response): Promise<Response> {
        return this.employeeReposotory.findEmployee(req, res)
    }
}

