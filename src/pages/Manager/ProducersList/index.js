import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { Container, CardBox, BoldText, Text } from './styles'

const ProducersList = ({ data }) => {

    const navigation = useNavigation()

    return (
        <Container>
            <CardBox
                style={{ elevation: 5 }}
                onPress={() => navigation.navigate('ProfileDetails', { data: data })}
                onLongPress={() => navigation.navigate('ProducerUpdate', { data: data })}
            >
                <BoldText>Nome: <Text>{data.name}</Text></BoldText>
                <BoldText>Apelido: <Text>{data.nickname}</Text></BoldText>
                <BoldText>Atividade: <Text>{data.farmingActivity.activityName}(a)</Text></BoldText>
            </CardBox>
        </Container >
    );
}

export default ProducersList