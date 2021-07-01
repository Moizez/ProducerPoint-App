import React from 'react'
import { View, Text } from 'react-native'
import { RangeCalendar, NativeDateService } from '@ui-kitten/components';
import styled from 'styled-components/native'

import { i18n } from '../../../helpers'

const FilterTaskModal = ({ closeModal, range, setRange }) => {

    const localeDateService = new NativeDateService('pt', { i18n, startDayOfWeek: 1 })

    return (
        <Container>
            <CloseButton activeOpacity={1} onPress={closeModal} />
            <Header>
                <Text style={{textAlign: 'center'}}>
                    Dica: Selecione uma data inicial e uma data final para realizar a filtragem.
                </Text>
            </Header>

            <Calendar>
                <RangeCalendar
                    dateService={localeDateService}
                    range={range}
                    onSelect={nextRange => setRange(nextRange)}
                />
            </Calendar>

            <View style={{ backgroundColor: '#FFF' }}>
                <Button
                    onPress={closeModal}
                    activeOpacity={0.8}
                >
                    <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>FECHAR</Text>
                </Button>
            </View>

        </Container>
    );
}

export const Container = styled.View`
    flex: 1;
    justify-content: flex-end;
`;

export const Header = styled.View`
    background-color: #eee;
    padding: 5px 10px;
    align-items: center;
    justify-content: center;
`;

export const Calendar = styled.View`
    flex: 1;
    background-color: #eee;
`;

export const Button = styled.TouchableOpacity`
    height: 45px;
    width: 100%;
    background-color: #2a9d8f;
    align-items: center;
    justify-content: center;
`;

export const CloseButton = styled.TouchableOpacity`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
`;

export default FilterTaskModal