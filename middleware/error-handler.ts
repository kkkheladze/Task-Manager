import { NextFunction, Request, Response } from "express";
const { CustomAPIError } = require("../errors/custom-error");

import { CustomApiErrorInterface } from "../interfaces/CustomApiError";

const errorHandlerMiddleware = (
  err: CustomApiErrorInterface | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((err as CustomApiErrorInterface) instanceof CustomAPIError) {
    return res
      .status((err as CustomApiErrorInterface).statusCode)
      .json({ msg: err.message });
  }
  return res.status(500).json({ msg: "Something went wrong" });
};
module.exports = errorHandlerMiddleware;
