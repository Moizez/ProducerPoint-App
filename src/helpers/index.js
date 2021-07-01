import moment from 'moment'

export const filterByBetweenDates = (data, initialDate, finalDate) => {
    let initial = moment(initialDate).format('MM/DD/YYYY')
    let final = moment(finalDate).format('MM/DD/YYYY')
    let result = data.filter(i => {
        let dateDatabase = moment(i.date).format('MM/DD/YYYY')
        return moment(dateDatabase).isBetween(initial, final, undefined, '[]')
    })
    return result
}

export const i18n = {
    dayNames: {
        short: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        long: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    },
    monthNames: {
        short: ['Jan', 'Fev', 'Мar', 'Аbr', 'Мai', 'Jun', 'Jul', 'Аgo', 'Set', 'Оut', 'Nov', 'Dez'],
        long: [
            'Janeiro',
            'Fevereiro',
            'Мarço',
            'Аbril',
            'Maio',
            'Junho',
            'Julho',
            'Аgosto',
            'Setembro',
            'Оutubro',
            'Novembro',
            'Dezembro',
        ],
    },
};











