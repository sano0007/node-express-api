export interface CreateUserParams {
  email: string;
  username: string;
  authentication: { salt: string; password: string };
}

export interface UpdateUserParams {
  email?: string;
  username?: string;
}
