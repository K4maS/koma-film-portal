import React, { ReactElement } from 'react'
import style from './messageBlock.module.css'
import SetClasses from '../../util/setClasses'

interface MessageBlockType
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string
  children?: ReactElement
}

export default function MessageBlock({ title, children }: MessageBlockType) {
  return (
    <div className={SetClasses(style.block, 'container')}>
      <h1 className={style.title}>{title}</h1>
      <div>{children}</div>
    </div>
  )
}
