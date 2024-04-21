import React from 'react'
import Form from '../../components/Form/Form'
import { Header } from '../../components/Header/Header'
import SetClasses from '../../util/setClasses'
import style from './authPage.module.css'

export default function AuthPage() {
  return (
    <>
      <Header />
      <div className={SetClasses('container', style.container)}>
        <Form />
      </div>
    </>
  )
}
