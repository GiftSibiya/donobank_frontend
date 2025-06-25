export type SessionUser = {
  accessToken: string;
  role: string;
  id: number;
  email: string;
  name?: string;
  surname?: string;
};

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  association: number;
  association_name: string;
  access: string;
}