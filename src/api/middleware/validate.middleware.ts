import type { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validate =
  (schema: ZodObject) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // .parseAsync ensures transforms like .toLowerCase() are applied properly
      const result = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Zod v4 returns the transformed data; we re-assign it to req
      req.body = result.body;
      req.query = result.query as any;
      req.params = result.params as any;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "fail",
          errors: error.issues.map((issue) => ({
            field: issue.path.join("."), // Identifies 'email' or 'password'
            message: issue.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
