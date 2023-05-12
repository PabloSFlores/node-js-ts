import { UseCase } from "@/kernel/contracts"
import { ResponseApi } from "@/kernel/types"
import { GetEmployeesDto } from "../adapters/dto/get-employees"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "./ports/employee.repository"
import { Request, Response } from "express"

export class GetEmployeesInteractor implements UseCase<GetEmployeesDto, Response> {
    constructor(private readonly employeeRepository: EmployeeRepository){}
    execute(req: Request, res: Response): Promise<Response> {
        return this.employeeRepository.findAll(req, res)
    }
}