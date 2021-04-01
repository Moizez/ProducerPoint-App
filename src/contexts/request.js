import React, { useState, createContext } from 'react';

import Api from '../services/api'

export const RequestContext = createContext({})

const RequestProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [producers, setProducers] = useState([])

    // Request Técnico
    const loadProducers = async () => {
        setLoading(true)
        const response = await Api.getAllProducers()
        setProducers(response)
        setLoading(false)
    }

    return (
        <RequestContext.Provider value={{
            loading, setLoading,
            producers, loadProducers,
        }}>
            {children}
        </RequestContext.Provider>
    )
}

export default RequestProvider

