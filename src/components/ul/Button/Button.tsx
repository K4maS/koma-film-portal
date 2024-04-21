import React from 'react'
import SetClasses from '../../../util/setClasses'
import style from './button.module.css'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={SetClasses(
        style.btn,
        className,
        props.disabled ? style.disabled : '',
      )}
      onClick={onClick}
      {...props}
    >
      {title}
    </button>
  )
}
