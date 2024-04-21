import style from './footer.module.css'
import { Logo } from '../ul/Logo/Logo'
import React from 'react'

export const Footer: React.FC = ({ ...props }) => {
  return (
    <footer className={style.footer} {...props}>
      <div className="container">
        <div className={style.block}>
          <div className={style.footerLeft}>
            <Logo />
          </div>
          <div className={style.footerRight}>
            <a href="malito:sultaonwkamilgod@yandex.ru" className={style.link}>
              sultaonwkamilgod@yandex.ru
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
