export interface IBowler {
  id: number;
  last_login: string;
  username: string;
  email: string;
  name: string;
  phone_number: string;
}

export interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface ILoginProps {
  username: string;
  password: string;
}

export interface ILoginSuccess {
  ok: string;
}

export interface ILoginError {
  error: string;
}

export interface ISignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface IChangePasswordForm {
  old_password: string;
  new_password: string;
}

export interface IChangePasswordProps {
  old_password: string;
  new_password: string;
}

export interface IChangePasswordSuccess {
  ok: string;
}

export interface IChangePasswordError {
  error: string;
}
