import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE from './base'
import moment from 'moment'

export default {

    onSignIn: async (email, password) => {
        try {
            const request = await fetch(`${BASE.API}/signin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            return request

        } catch (e) {
            console.log('Error: onSignIn ' + e)
        }
    },

    getAllProducers: async () => {
        try {
            const request = await fetch(`${BASE.API}/producers`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getAllProducers ' + e)
        }
    },

    findProducersByNameOrNickname: async (name) => {
        try {
            const request = await fetch(`${BASE.API}/producers/findByName0rNickname/${name}`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: findProducersByNameOrNickname ' + e)
        }
    },

    getCep: async (cep) => {
        try {
            const request = await fetch(`${BASE.CEP_API}/${cep}/json`)
            return request
        } catch (e) {
            console.log('Erro: getCep ' + e)
        }
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

            const request = await fetch(`${BASE.API}/producers`, {
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

            const request = await fetch(`${BASE.API}/producers/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: updateProducer ' + e)
        }
    },

    getAllProducts: async () => {
        try {
            const request = await fetch(`${BASE.API}/products`) || []
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getAllProducts ' + e)
        }
    },

    deleteProducer: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/producers/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteProducer ' + e)
        }
    },

    getAllActivities: async () => {
        try {
            const request = await fetch(`${BASE.API}/activities`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getAllActivities ' + e)
        }
    },

    setStateRoles: async (id) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = { id: id, status: false }

            const request = await fetch(`${BASE.API}/producers/${id}`,
                {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(data)
                }
            )
            return request
        } catch (e) {
            console.log('Erro: setStateRoles ' + e)
        }
    },

    createTask: async (description, date) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@producerpoint:user')) || []

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const formatDate = moment(date).format('yyyy/MM/DD')

            const data = {
                description: description,
                status: false,
                date: formatDate,
                manager: {
                    id: user.id,
                },
            }

            const request = await fetch(`${BASE.API}/tasks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            return request
        } catch (e) {
            console.log('Erro: createTask ' + e)
        }
    },

    getAllTasks: async () => {
        try {
            const request = await fetch(`${BASE.API}/tasks`) || []
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getAllTasks ' + e)
        }
    },

    getAllTodayTasks: async () => {
        try {
            const request = await fetch(`${BASE.API}/tasks/todaytasks`) || []
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getAllTodayTasks ' + e)
        }
    },

    getAllFutureTasks: async () => {
        try {
            const request = await fetch(`${BASE.API}/tasks/futuretasks`) || []
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getAllFutureTasks ' + e)
        }
    },

    setStateTasks: async (id, status) => {
        try {

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = { status: status }

            const request = await fetch(`${BASE.API}/tasks/${id}`,
                {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(data)
                }
            )
            return request
        } catch (e) {
            console.log('Erro: setStateTasks ' + e)
        }
    },

    deleteTask: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/tasks/${id}`, { method: 'DELETE' })
            return request
        } catch (e) {
            console.log('Erro: deleteTask ' + e)
        }
    },


}