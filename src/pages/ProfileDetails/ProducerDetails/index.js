import React from 'react'
import moment from 'moment'

import { formatMoney } from '../../../components/helpers'

import {
    Container, PageBox, Title, ProfileInfo, InfoBox, BoldText, Text, Divider
} from './styles'

const ProducerDetails = ({ data }) => {

    let birth = moment(data?.birthDate).locale('pt-br').format('L')
    const products = data?.products?.map(i => i.label)
    const money = data?.farmingActivity?.averageCash
        .toFixed(2)
        .replace('.', ',')
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

    return (
        <Container>
            <PageBox>

                <ProfileInfo>
                    <Title>Informações pessoais</Title>
                    <Divider />
                    <InfoBox>
                        <BoldText>Apelido: <Text>{data?.nickname}</Text></BoldText>
                        <BoldText>Nascimento: <Text>{birth}</Text></BoldText>
                        <BoldText>Telefone: <Text>{data?.phone}</Text></BoldText>
                        <BoldText>E-mail: <Text>{data?.email}</Text></BoldText>
                        <BoldText>Atividade: <Text>{data?.farmingActivity?.activityName?.label}(a), {data?.farmingActivity?.activityName2?.label}(a)</Text></BoldText>
                        <BoldText>Produto{products?.length > 1 && 's'}: <Text>{products?.join(', ')}</Text></BoldText>
                        <BoldText>Renda média: <Text>{money}</Text></BoldText>
                        <BoldText>Período: <Text>{data?.farmingActivity?.period}</Text></BoldText>
                    </InfoBox>

                    <Title>Endereço</Title>
                    <Divider />
                    <InfoBox>
                        <BoldText>Cidade: <Text>{data?.address?.city}</Text></BoldText>
                        <BoldText>Estado: <Text>{data?.address?.uf}</Text></BoldText>
                        <BoldText>CEP: <Text>{data?.address?.zipCode}</Text></BoldText>
                        <BoldText>Bairro: <Text>{data?.address?.district}</Text></BoldText>
                        <BoldText>Rua: <Text>{data?.address?.street}</Text></BoldText>
                        <BoldText>Número da casa: <Text>{data?.address?.houseNumber}</Text></BoldText>
                        <BoldText>Referência: <Text>{data?.address?.reference}</Text></BoldText>
                    </InfoBox>

                </ProfileInfo>
            </PageBox>
        </Container>
    );
}

export default ProducerDetails