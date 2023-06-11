export type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserSaved = {
  id: string;
  name: string;
};

export type UserAPI = {
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
};