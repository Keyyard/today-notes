interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  message: string;
  task?: Task;
}

export type { ErrorResponse, SuccessResponse };