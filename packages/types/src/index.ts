export interface ApiSuccess<TData, TMeta = never> {
  data: TData;
  meta?: TMeta;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}
