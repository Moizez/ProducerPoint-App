import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/auth'

import AuthRoutes from './AuthRoutes'
import AppRoutes from './AppRoutes'
import LoadScreen from '../components/LoadScreen'

const Routes = () => {

    const { signed } = useContext(AuthContext)
    const [show, setShow] = useState(true)

    setTimeout(() => {
        setShow(false)
    }, 2500)

    if (show) {
        return <LoadScreen msg={'Seja bem-vindo!'} />
    } else {
        return signed ? <AppRoutes /> : <AuthRoutes />
    }
}

export default Routes