import { UseCase } from "@/kernel/contracts"
import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "./ports/employee.repository"
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"

export class DeleteEmployeeInteractor implements UseCase<number, Response> {
    constructor(private readonly employeeRepository: EmployeeRepository){}

    execute(req: Request, res: Response): Promise<Response> {
        return this.employeeRepository.deleteEmployee(req, res)
    }
}