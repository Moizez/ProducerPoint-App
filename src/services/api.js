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

    getCep: async (cep) => {
        try {
            const request = await fetch(`${BASE.CEP_API}/${cep}/json`)
            return request
        } catch (e) {
            console.log('Erro: getCep ' + e)
        }
    },

    createProducer: async (
        name, nickname, phone, cpf, email, houseNumber,
        reference, averageCash, zipCode, city, district,
        uf, street, activityName, productName, period
    ) => {
        try {
            const user = await JSON.parse(await AsyncStorage.getItem('@producerpoint:user')) || []

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                name: name,
                nickname: nickname,
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
                    productName: productName,
                    period: period
                },
                manager: {
                    id: user.id,
                }
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
}