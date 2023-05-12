import { ResponseApi } from "@/kernel/types"
import { Employee } from "../../entities/employee"
import { SaveEmployeeDto } from "../../adapters/dto/save-employee"
import { UpdateEmployeeDto } from "../../adapters/dto/update-employee"
import { Request, Response } from "express"

export interface EmployeeRepository {
    findAll(req: Request, res: Response): Promise<Response>
    findEmployee(req: Request, res: Response): Promise<Response>
    saveEmployee(req: Request, res: Response): Promise<Response>
    updateEmployee(req: Request, res: Response): Promise<Response>
    deleteEmployee(req: Request, res: Response): Promise<Response>
}