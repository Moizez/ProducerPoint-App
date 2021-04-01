import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

import AuthRoutes from './AuthRoutes'
import AppRoutes from './AppRoutes'

const Routes = () => {

    const { signed } = useContext(AuthContext)

    return (
        signed ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes