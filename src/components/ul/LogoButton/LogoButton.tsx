import React, { ReactElement } from 'react'
import SetClasses from '../../../util/setClasses'
import style from './logoButton.module.css'

interface LogoButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  childred?: ReactElement
  className?: string
  active?: boolean
}

export const LogoButton: React.FC<LogoButtonProps> = ({
  children,
  className,
  active,
  onClick,
}) => {
  const styelActive = active ? style.active : ''
  return (
    <button
      className={SetClasses(style.btn, className, styelActive)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
