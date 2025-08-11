import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/standardReponse";
import { z } from "zod";


export async function testController(req: Request, res: Response) {
  try {
    
    sendSuccessResponse(res, 201, "Connection is stable", "");
  } catch (error) {
    if (error instanceof z.ZodError) {
      sendErrorResponse(res, 400, "Invalid Input", error.issues);
    }
    sendErrorResponse(res, 500, "Internal Server Error", error);
  }
}

