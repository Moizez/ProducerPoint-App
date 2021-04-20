import React, { useState, useEffect, createContext } from 'react';

import Api from '../services/api'

export const RequestContext = createContext({})

const RequestProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [producers, setProducers] = useState([])
    const [products, setProducts] = useState([])
    const [tasks, setTasks] = useState([])
    const [todayTasks, setTodayTasks] = useState([])
    const [futureTasks, setFutureTasks] = useState([])

    const loadProducers = async () => {
        setLoading(true)
        const response = await Api.getAllProducers()
        setProducers(response)
        setLoading(false)
    }

    const loadProducts = async () => {
        setLoading(true)
        const response = await Api.getAllProducts()
        setProducts(response)
        setLoading(false)
    }

    const loadTasks = async () => {
        setLoading(true)
        const response = await Api.getAllTasks()
        setTasks(response)
        setLoading(false)
    }

    const loadTodayTasks = async () => {
        setLoading(true)
        const response = await Api.getAllTodayTasks()
        setTodayTasks(response)
        setLoading(false)
    }

    const loadFutureTasks = async () => {
        setLoading(true)
        const response = await Api.getAllFutureTasks()
        setFutureTasks(response)
        setLoading(false)
    }


    useEffect(() => {
        loadProducers()
        loadProducts()
        loadTasks()
        loadTodayTasks()
        loadFutureTasks()
    }, [])

    return (
        <RequestContext.Provider value={{
            loading, setLoading,
            producers, loadProducers,
            products, loadProducts,
            tasks, loadTasks,
            todayTasks, loadTodayTasks,
            futureTasks, loadFutureTasks
        }}>
            {children}
        </RequestContext.Provider>
    )
}

export default RequestProvider

