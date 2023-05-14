import { ResponseApi } from "@/kernel/types"
import { Employee } from "../../entities/employee"
import { SaveEmployeeDto } from "../../adapters/dto/save-employee"
import { UpdateEmployeeDto } from "../../adapters/dto/update-employee"

export interface EmployeeRepository {
    findAll(): Promise<ResponseApi<Employee>>
    findEmployee(payload: number): Promise<ResponseApi<Employee>>
    saveEmployee(payload: SaveEmployeeDto): Promise<ResponseApi<Employee>>
    updateEmployee(payload: UpdateEmployeeDto): Promise<ResponseApi<Employee>>
    deleteEmployee(payload: number): Promise<ResponseApi<Employee>>
}