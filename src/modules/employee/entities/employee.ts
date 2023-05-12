import { Entity } from "@/kernel/types"
export type Employee = Entity<number> & {
    name: String,
    surname: String,
    lastname: String,
    email: Text
}