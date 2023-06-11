import { UserAPI, UserForm, UserSaved } from '../types/user.types';

export const mockUserFormValid: UserForm = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  password: 'Password!',
};

export const mockUserFormInvalid: UserForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const mockUserAPI: UserAPI = {
  _id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
};

export const mockUserSaved: UserSaved = {
  id: '1',
  name: 'John Doe',
};
