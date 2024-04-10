import style from "./button.module.css";
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
}
export const Button: React.FC<ButtonProps> = ({ title }) => {
  return <button className={style.btn}>{title}</button>;
};
