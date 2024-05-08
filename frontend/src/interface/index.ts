// import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

export interface FieldSetType {
  error?: string;
  label: string;
  children: React.ReactNode;
}

export interface InputTypes {
  type: boolean;
  error: boolean;
  isIcon: boolean;
  isVisible?: boolean;
  placeholder: string;
  onToggle?: () => void;
  register: any;
}

export interface SignUpUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignInUserData {
  email: string;
  password: string;
}

export interface ButtonType {
  type: "submit" | "reset";
  isSubmit?: boolean;
  children: React.ReactNode;
}

export interface IconTextType {
  type: boolean;
  visible: boolean;
}
