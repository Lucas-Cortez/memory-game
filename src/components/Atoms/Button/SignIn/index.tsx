import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type SignInButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function SignInButton(props: SignInButtonProps) {
  const { children, ...other } = props;
  return <button {...other}>{children}</button>;
}
