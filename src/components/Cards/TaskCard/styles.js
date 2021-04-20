import styled from 'styled-components/native';

export const Container = styled.View`
    margin: 10px;
`;

export const CardBox = styled.View`
    background-color: #d9d9d9;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    padding: 10px;
`;

export const Text = styled.Text`
    font-size: 15px;
    font-weight: normal;
`;

export const BoldText = styled.Text`
    font-size: 15px;
    font-weight: bold;
`;

export const LeftBox = styled.View`
    flex: 1;
    background-color: #da1e37;
    justify-content: center;
    margin: 10px;
    border-radius: 8px;
    padding: 5px;
`;

export const ItemBox = styled.View`
    flex: 1;

`;

export const IconBox = styled.TouchableOpacity`

`;

export const Divider = styled.View`
    width: 1px;    
    height: 85%;
    background-color: #CCC;
    margin: 0 5px 0px 5px;
`;

export const Modal = styled.Modal``;

export const StatusBox = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;