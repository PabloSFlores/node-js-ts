import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "../use-cases/ports/employee.repository"
import { GetEmployeesDto } from "./dto/get-employees"
import { SaveEmployeeDto } from "./dto/save-employee"
import { UpdateEmployeeDto } from "./dto/update-employee"
import { pool } from "../../../utils/dbconfig"
import { Request, Response } from "express"

export class EmployeeStorageGateway implements EmployeeRepository {
    getError(): ResponseApi<Employee> {
        return {
            code: 500,
            error: true,
            message: 'INTERNAL ERROR SERVER',
        } as ResponseApi<Employee>
    }

    async findAll(): Promise<ResponseApi<Employee>> {
        try {
            const response = await pool.query('SELECT * FROM employees;')
            const body: ResponseApi<Employee> = {
                code: 200,
                error: false,
                message: 'OK',
                entities: response.rows,
                count: response.rowCount
            }
            return body
        } catch (error) {
            console.error(error)
            return this.getError()
        }
    }
    async findEmployee(payload: number): Promise<ResponseApi<Employee>> {
        try {
            const id: number = payload
            const response = await pool.query('SELECT * FROM employees WHERE id = $1;', [id])
            if (response.rowCount == 0) return {
                code: 404,
                error: true,
                message: 'NOT FOUND'
            } as ResponseApi<Employee>
            return {
                code: 200,
                error: false,
                message: 'OK',
                entity: response.rows[0],
                count: response.rowCount
            } as ResponseApi<Employee>
        } catch (error) {
            console.error(error)
            return this.getError()
        }
    }
    async saveEmployee(payload: SaveEmployeeDto): Promise<ResponseApi<Employee>> {
        try {
            const { name, surname, lastname, email } = payload
            const response = await pool.query('INSERT INTO employees(name, surname, lastname, email) VALUES($1, $2, $3, $4) RETURNING *;', [name, surname, lastname, email])
            // console.log(response)
            return {
                code: 201,
                error: false,
                message: 'CREATED',
                entity: response.rows[0],
                count: response.rowCount
            } as ResponseApi<Employee>
        } catch (error) {
            console.error(error)
            return this.getError()
        }
    }
    async updateEmployee(payload: UpdateEmployeeDto): Promise<ResponseApi<Employee>> {
        try {
            const { id, name, surname, lastname, email } = payload
            const response = await pool.query("UPDATE employees SET name = $2, surname = $3, lastname = $4, email = $5 WHERE id = $1 RETURNING *;", [id, name, surname, lastname, email])
            if (response.rowCount == 0) return {
                code: 404,
                error: true,
                message: 'NOT FOUND'
            } as ResponseApi<Employee>
            return {
                code: 200,
                error: false,
                message: 'OK',
                entity: response.rows[0],
                count: response.rowCount
            } as ResponseApi<Employee>
        } catch (error) {
            console.error(error)
            return this.getError()
        }
    }
    async deleteEmployee(payload: number): Promise<ResponseApi<Employee>> {
        try {
            const id: number = payload
            const response = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *;', [id])
            // console.log(response)
            if (response.rowCount == 0) return {
                code: 404,
                error: true,
                message: 'NOT FOUND'
            } as ResponseApi<Employee>
            return {
                code: 200,
                error: false,
                message: 'OK',
                entity: response.rows[0],
                count: response.rowCount
            } as ResponseApi<Employee>
        } catch (error) {
            console.error(error)
            return this.getError()
        }
    }
}