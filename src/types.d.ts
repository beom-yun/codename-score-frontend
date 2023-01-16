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

export interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
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
