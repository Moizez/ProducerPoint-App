import React from 'react'

import { Container, CardBox, BoldText, Text } from './styles'

const ProducersList = ({ data }) => {

    return (
        <Container>
            <CardBox style={{ elevation: 5 }}>
                <BoldText>Nome: <Text>{data.name}</Text></BoldText>
                <BoldText>Apelido: <Text>{data.nickname}</Text></BoldText>
                <BoldText>E-mail: <Text>{data.email}</Text></BoldText>
                <BoldText>Atividade: <Text>{data.farmingActivity.activityName}</Text></BoldText>
            </CardBox>
        </Container >
    );
}

export default ProducersList