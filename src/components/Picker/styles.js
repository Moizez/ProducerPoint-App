import styled from 'styled-components/native';

export const Modal = styled.Modal``;

export const CloseBox = styled.TouchableOpacity`
    flex: 1;
    background-color: rgba(0,0,0,0.5);
`;

export const Container = styled.View`
    flex: 1;
`;

export const OpenButton = styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const TitleButton = styled.Text`
    font-size: 16px;
`;

export const ItemText = styled.Text`
    font-size: 16px;
    color: #FFF;
`;

export const ModalTitle = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
`;

export const ModalBox = styled.View`
    background-color: rgba(0,0,0,0.5);
    justify-content: flex-end;
`;

export const PickerBox = styled.View`
    background-color: #292b2c;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 10px 20px 40px 20px;
`;

export const ModalHeader = styled.View`
    height: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

export const ItemButton = styled.TouchableOpacity`
    padding-top: 8px;
    padding-bottom: 8px;
    align-items: center;
    justify-content:center;
`;



