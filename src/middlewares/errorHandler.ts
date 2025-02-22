import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: "Internal server error",
    error: err.message,
  });
};

export default errorHandler;
