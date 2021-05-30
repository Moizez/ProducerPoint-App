import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

const CEP_API = 'https://viacep.com.br/ws'
const API = 'https://apiproducers.serviceapp.net.br/api'
//const API = 'http://192.168.1.128:8080/api'
//const API = 'https://producersapi.herokuapp.com/api'


const apiFetchPost = async (endpoint, body) => {

    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Accept", 'application/json')

    const response = await fetch(API + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })

    if (response.status >= 200 && response.status <= 299) {
        const json = await response.json()
        if (json) {
            return {
                data: json,
                status: response.status
            }
        } else {
            return {
                data: null,
                status: response.status
            }
        }
    } else {
        return {
            data: null,
            status: response.status,
        }
    }
}

const apiFetchGet = async (endpoint) => {

    const response = await fetch(API + endpoint)
    if (response.status >= 200 && response.status <= 299) {
        const json = await response.json()
        if (json) {
            return {
                data: json,
                status: response.status
            }
        } else {
            return {
                data: null,
                status: response.status
            }
        }
    } else {
        return {
            data: null,
            status: response.status,
        }
    }
}

const apiFetchPut = async (endpoint, body) => {

    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Accept", 'application/json')

    const response = await fetch(API + endpoint, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    })

    if (response.status >= 200 && response.status <= 299) {
        const json = await response.json()
        if (json) {
            return {
                data: json,
                status: response.status
            }
        } else {
            return {
                data: null,
                status: response.status
            }
        }
    } else {
        return {
            data: null,
            status: response.status,
        }
    }
}

const apiFetchDelete = async (endpoint) => {

    const response = await fetch(`${API + endpoint}`, { method: 'DELETE' })
    if (response.status >= 200 && response.status <= 299) {
        return {
            status: response.status
        }
    } else {
        return {
            status: response.status,
        }
    }
}

export default {

    onSignIn: async (email, password) => {
        const data = { email: email, password: password }
        const request = await apiFetchPost('/signin', data)
        return request
    },

    getAllProducers: async () => {
        const response = await apiFetchGet('/producers')
        return response
    },

    getProduceById: async (id) => {
        const response = await apiFetchGet(`/producers/${id}`)
        return response
    },

    findProducersByNameOrNickname: async (name) => {
        const request = await apiFetchGet(`/producers/findByName0rNickname/${name}`)
        return request
    },

    getCep: async (cep) => {
        try {
            const request = await fetch(`${CEP_API}/${cep}/json`)
            return request
        } catch (e) {
            console.log('Erro: getCep ' + e)
        }
        return []
    },

    createProducer: async (
        name, nickname, birthDate, phone, cpf, email, houseNumber, reference, averageCash,
        zipCode, city, district, uf, street, activityId, resultList, period
    ) => {
        try {

            const user = await JSON.parse(await AsyncStorage.getItem('@producerpoint:user')) || []

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
                birthDate: birthDate,
                phone: phone,
                cpf: cpf,
                email: email,
                address: {
                    zipCode: zipCode,
                    city: city,
                    uf: uf,
                    district: district,
                    street: street,
                    houseNumber: houseNumber,
                    reference: reference,
                },
                farmingActivity: {
                    averageCash: parseFloat(averageCash),
                    activityName: {
                        value: activityId
                    },
                    period: period
                },
                products: resultList,
                manager: {
                    id: user.id,
                },
            }

            const request = await fetch(`${API}/producers`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: createProducer ' + e)
        }
    },

    updateProducer: async (
        id, name, nickname, birthDate, phone, cpf, email, houseNumber, reference, averageCash,
        zipCode, city, district, uf, street, activityId, resultList, period
    ) => {
        try {

            const user = await JSON.parse(await AsyncStorage.getItem('@producerpoint:user')) || []

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
                birthDate: birthDate,
                phone: phone,
                cpf: cpf,
                email: email,
                address: {
                    zipCode: zipCode,
                    city: city,
                    uf: uf,
                    district: district,
                    street: street,
                    houseNumber: houseNumber,
                    reference: reference,
                },
                farmingActivity: {
                    averageCash: parseFloat(averageCash),
                    activityName: {
                        value: activityId
                    },
                    period: period
                },
                products: resultList,
                manager: {
                    id: user.id,
                }
            }

            const request = await fetch(`${API}/producers/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: updateProducer ' + e)
        }
    },

    deleteProducer: async (id) => {
        const request = await apiFetchDelete(`/producers/${id}`)
        return request
    },

    createProduct: async (label) => {
        const data = { label }
        const request = await apiFetchPost('/products', data)
        return request
    },

    updateProduct: async (id, label) => {
        const data = { value: id, label: label }
        const request = await apiFetchPut(`/products/${id}`, data)
        return request
    },

    getAllProducts: async () => {
        const response = await apiFetchGet('/products')
        return response
    },

    deleteProduct: async (id) => {
        const request = await apiFetchDelete(`/products/${id}`)
        return request
    },

    createActivity: async (label) => {
        const data = { label: label }
        const request = await apiFetchPost('/activities', data)
        return request
    },

    updateActivity: async (id, label) => {
        const data = { value: id, label: label }
        const request = await apiFetchPut(`/activities/${id}`, data)
        return request
    },

    getAllActivities: async () => {
        const response = await apiFetchGet('/activities')
        return response
    },

    deleteActivity: async (id) => {
        const request = await apiFetchDelete(`/activities/${id}`)
        return request
    },

    setStateRoles: async (id) => {
        const data = { id: id, status: false }
        const request = await apiFetchPut(`/producers/${id}`, data)
        return request
    },

    createTask: async (description, date, id) => {
        const formatDate = moment(date).format('yyyy-MM-DD')
        const data = {
            description: description,
            status: false,
            date: formatDate,
            manager: {
                id: id,
            },
        }
        const request = await apiFetchPost('/tasks', data)
        return request
    },

    getAllTasks: async () => {
        const response = await apiFetchGet('/tasks')
        return response
    },

    getAllTodayTasks: async () => {
        const response = await apiFetchGet('/tasks/todaytasks')
        return response
    },

    getAllFutureTasks: async () => {
        const response = await apiFetchGet('/tasks/futuretasks')
        return response
    },

    setStateTasks: async (id, status) => {
        const data = { status: status }
        const request = await apiFetchPut(`/tasks/${id}`, data)
        return request
    },

    deleteTask: async (id) => {
        const request = await apiFetchDelete(`/tasks/${id}`)
        return request
    },

    getAllSales: async () => {
        const response = await apiFetchGet('/sales-producers')
        return response
    },

    getSalesByProducer: async (id) => {
        const response = await apiFetchGet(`/producers/${id}/sales`)
        return response
    },

    createSaleProducer: async (date, quantity, valor, parameter, city, id, product) => {

        try {
            
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                date: date,
                quantity: quantity,
                valor: valor,
                parameter: parameter,
                city: city,
                producer: {
                    id: id,
                },
                product: {
                    value: product,
                },
            }

            const request = await fetch(`${API}/sales-producers`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            
            return request

        } catch (e) {
            console.log('Erro: createSaleProducer ' + e)
        }

    },

    deleteSales: async (id) => {
        const request = await apiFetchDelete(`/sales-producers/${id}`)
        return request
    },

}