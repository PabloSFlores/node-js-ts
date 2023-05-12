import { Request, Response } from "express";
export interface UseCase<TInput, TOutput> {
    execute(req: Request, res: Response): Promise<TOutput>;
}