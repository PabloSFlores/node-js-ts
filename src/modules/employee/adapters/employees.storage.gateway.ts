import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "../use-cases/ports/employee.repository"
import { GetEmployeesDto } from "./dto/get-employees"
import { SaveEmployeeDto } from "./dto/save-employee"
import { UpdateEmployeeDto } from "./dto/update-employee"
import { pool } from "../../../utils/dbconfig"
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"

export class EmployeeStorageGateway implements EmployeeRepository {
    getError(): ResponseApi<Employee> {
        return {
            code: 500,
            error: true,
            message: 'INTERNAL ERROR SERVER',
        } as ResponseApi<Employee>
    }

    isNumber(a: any): boolean {
        try {
            parseInt(a)
            return true
        } catch (error) {
            return false
        }
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const response = await pool.query('SELECT * FROM employees;')
            const body: ResponseApi<Employee> = {
                code: 200,
                error: false,
                message: 'OK',
                entities: response.rows,
                count: response.rowCount
            }
            return res.status(200).json(body)
        } catch (error) {
            console.error(error)
            return res.status(this.getError().code).json(this.getError())
        }
    }
    async findEmployee(req: Request, res: Response): Promise<Response> {
        try {
            if (this.isNumber(req.params.id)) {
                const id: number = parseInt(req.params.id)
                const response = await pool.query('SELECT * FROM employees WHERE id = $1;', [id])
                let body: ResponseApi<Employee> = {
                    code: 200,
                    error: false,
                    message: 'OK',
                    entity: response.rows[0],
                    count: response.rowCount
                }
                if (response.rowCount == 0) {
                    body = {
                        code: 404,
                        error: true,
                        message: 'NOT FOUND'
                    }
                }
                return res.status(body.code).json(body)
            } else {
                const body: ResponseApi<Employee> = {
                    code: 400,
                    error: true,
                    message: 'BAD_REQUEST',
                }
                return res.status(body.code).json(body)
            }
        } catch (error) {
            console.error(error)
            return res.status(this.getError().code).json(this.getError())
        }
    }
    async saveEmployee(req: Request, res: Response): Promise<Response> {
        try {
            const { name, surname, lastname, email }: SaveEmployeeDto = req.body
            const response = await pool.query('INSERT INTO employees(name, surname, lastname, email) VALUES($1, $2, $3, $4) RETURNING *;', [name, surname, lastname, email])
            // console.log(response)
            let body: ResponseApi<Employee> = {
                code: 201,
                error: false,
                message: 'CREATED',
                entity: response.rows[0],
                count: response.rowCount
            }
            return res.status(body.code).json(body)
        } catch (error) {
            console.error(error)
            return res.status(this.getError().code).json(this.getError())
        }
    }
    async updateEmployee(req: Request, res: Response): Promise<Response> {
        try {
            if (this.isNumber(req.params.id)) {
                const id: number = parseInt(req.params.id)
                const { name, surname, lastname, email }: UpdateEmployeeDto = req.body
                const response = await pool.query("UPDATE employees SET name = $2, surname = $3, lastname = $4, email = $5 WHERE id = $1 RETURNING *;", [id, name, surname, lastname, email])
                let body: ResponseApi<Employee> = {
                    code: 200,
                    error: false,
                    message: 'OK',
                    entity: response.rows[0],
                    count: response.rowCount
                }
                if (response.rowCount == 0) {
                    body = {
                        code: 404,
                        error: true,
                        message: 'NOT FOUND'
                    }
                }
                return res.status(body.code).json(body)
            } else {
                const body: ResponseApi<Employee> = {
                    code: 400,
                    error: true,
                    message: 'BAD_REQUEST',
                }
                return res.status(body.code).json(body)
            }
        } catch (error) {
            console.error(error)
            return res.status(this.getError().code).json(this.getError())
        }
    }
    async deleteEmployee(req: Request, res: Response): Promise<Response> {
        try {
            if (this.isNumber(req.params.id)) {
                const id: number = parseInt(req.params.id)
                const response = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *;', [id])
                // console.log(response)
                let body: ResponseApi<Employee> = {
                    code: 200,
                    error: false,
                    message: 'OK',
                    entity: response.rows[0],
                    count: response.rowCount
                }
                if (response.rowCount == 0) {
                    body = {
                        code: 404,
                        error: true,
                        message: 'NOT FOUND'
                    }
                }
                return res.status(body.code).json(body)
            } else {
                const body: ResponseApi<Employee> = {
                    code: 400,
                    error: true,
                    message: 'BAD_REQUEST',
                }
                return res.status(body.code).json(body)
            }
        } catch (error) {
            console.error(error)
            return res.status(this.getError().code).json(this.getError())
        }
    }
}