import AsyncStorage from '@react-native-async-storage/async-storage'
import BASE from './base'

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
        zipCode, city, district, uf, street, activityName, resultList, period
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
                    activityName: activityName,
                    period: period
                },
                products: resultList,
                manager: {
                    id: user.id,
                },
            }

            await fetch(`${BASE.API}/producers`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
        } catch (e) {
            console.log('Erro: createProducer ' + e)
        }
    },

    updateProducer: async (
        id, name, nickname, birthDate, phone, cpf, email, houseNumber, reference, averageCash,
        zipCode, city, district, uf, street, activityName, resultList, period
    ) => {
        try {

            console.log(resultList)

            const user = await JSON.parse(await AsyncStorage.getItem('@milkpoint:user')) || []

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
                birthDate: new Date(),
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
                    activityName: activityName,
                    period: period
                },
                products: resultList,
                manager: {
                    id: user.id,
                }
            }

            await fetch(`${BASE.API}/producers/${id}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            })
        } catch (e) {
            console.log('Erro: updateProducer ' + e)
        }
    },

    getAllProducts: async () => {
        try {
            const request = await fetch(`${BASE.API}/products`)
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: getAllProducts ' + e)
        }
    },

    deleteProducer: async (id) => {
        try {
            const request = await fetch(`${BASE.API}/producers/${id}`, { method: 'DELETE' })
            const response = await request.json()
            return response
        } catch (e) {
            console.log('Erro: deleteProducer ' + e)
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



}