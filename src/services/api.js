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
            console.log('Erro: getProducers ' + e)
        }
    }
}