import React, { useState, useEffect, createContext } from 'react';

import api from '../services/api'

export const RequestContext = createContext({})

const RequestProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)
    const [producers, setProducers] = useState([])
    const [products, setProducts] = useState([])
    const [activities, setActivities] = useState([])
    const [tasks, setTasks] = useState([])
    const [todayTasks, setTodayTasks] = useState([])
    const [futureTasks, setFutureTasks] = useState([])

    const loadProducers = async () => {
        setLoading(true)
        const response = await api.getAllProducers()
        setProducers(response.data)
        setLoading(false)
    }

    const loadProducts = async () => {
        setLoading(true)
        const response = await api.getAllProducts()
        setProducts(response.data)
        setLoading(false)
    }

    const loadActivities = async () => {
        setLoading(true)
        const response = await api.getAllActivities()
        setActivities(response.data)
        setLoading(false)
    }

    const loadTasks = async () => {
        setLoading(true)
        const response = await api.getAllTasks()
        setTasks(response.data)
        setLoading(false)
    }

    const loadTodayTasks = async () => {
        setLoading(true)
        const response = await api.getAllTodayTasks()
        setTodayTasks(response.data)
        setLoading(false)
    }

    const loadFutureTasks = async () => {
        setLoading(true)
        const response = await api.getAllFutureTasks()
        setFutureTasks(response.data)
        setLoading(false)
    }

    useEffect(() => {
        loadProducers()
        loadProducts()
        loadActivities()
        loadTasks()
        loadTodayTasks()
        loadFutureTasks()
    }, [])

    return (
        <RequestContext.Provider value={{
            loading, setLoading,
            producers, loadProducers,
            products, loadProducts,
            activities, loadActivities,
            tasks, loadTasks,
            todayTasks, loadTodayTasks,
            futureTasks, loadFutureTasks,
        }}>
            {children}
        </RequestContext.Provider>
    )
}

export default RequestProvider

