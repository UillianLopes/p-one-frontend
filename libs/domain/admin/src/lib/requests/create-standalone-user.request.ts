export interface CreateStandaloneUserRequest {
  name: string;
  email: string;
  language: string;
  birthDate: Date;
  password: string;
  passwordConfirmation: string;
}
