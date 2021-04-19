import styled from 'styled-components/native';

export const Modal = styled.Modal``;

export const CloseContainer = styled.TouchableOpacity`
    flex: 1;
`;

export const Container = styled.View(({ bgColor }) => ({
    flex: 1,
    backgroundColor: bgColor ? 'rgba(0,0,0,0.5)' : null
}));

export const ModalBox = styled.View`
    background-color: #292b2c;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 15px 20px 40px 20px;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
`;

export const ModalHeader = styled.View`
    height: 40px;
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: 18px;
    color: #FFF;
    margin-left: 15px;
`;

export const ModalInfo = styled.View`
    background-color: #d9d9d9;
    flex-direction: row;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 8px;
    align-items: center;
    justify-content: space-around;
`;

export const InfoBox = styled.View`
    align-items: center;
`;

export const ItemBox = styled.View`
    align-items: center;
    justify-content: center;
`;

export const InfoTitle = styled.Text`
    font-weight: bold;
`;

export const InfoText = styled.Text`
    font-size: 15px;
    color: #000;
`;

export const ConfirmButton = styled.TouchableOpacity`
    height: 45px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #da1e37;
    border-radius: 5px;
`;

export const DividerH = styled.View`
    width: 100%;    
    height: 0.5px;
    background-color: #333533;
    margin: 5px 0 5px 0;
`;

export const DividerV = styled.View`
    height: 100%;    
    width: 0.5px;
    background-color: #333533;
    margin: 0 5px 0 5px;
`;

export const Avatar = styled.Image`
    width: 80px;
    height: 80px;
    margin-left: 30px;
    border-radius: 20px;
    border-width: 4px;
    border-color: #FFF;
`;




