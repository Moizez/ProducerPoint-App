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
    width: 200px;
    align-items: center;
    justify-content: center;
`;

export const InfoTitle = styled.Text`
    font-weight: bold;
`;

export const InfoText = styled.Text`
    text-align: center;
    font-size: 15px;
    color: #000;
`;

export const ConfirmButton = styled.TouchableOpacity`
    height: 45px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #2a9d8f;
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

export const HalfInputBox = styled.View`
    width: 48%;
    height: 48px;
    border-radius: 5px;
    background-color: #CCC;
    margin-bottom: 10px;
    justify-content: space-around;
`;


export const InputContainer = styled.View`
    width: 100%;
`;

export const InputBox = styled.View`
    width: 100%;
    height: 48px;
    border-radius: 5px;
    background-color: #CCC;
    margin-bottom: 10px;
    justify-content: space-around;
`;

export const InputsBox = styled.View`
    width: 100%;
    height: 48px;
    flex-direction: row;
    border-radius: 5px;
    margin-bottom: 10px;
    justify-content: space-between;
`;

export const Input = styled.TextInput`
    width: 100%;
    font-size: 18px;
    color: #292b2c;
    padding-left: 15px;
`;

export const ErrorBox = styled.View`
    align-self: flex-start;
`;

export const ErrorText = styled.Text`
    font-size: 11px;
    color: #c1121f;
    margin-top: -8px;
    margin-bottom: 3px;
`;

export const Text = styled.Text`
    margin: 5px 0 0 3px;
    font-size: 11px;
    color: #495057;
`;

export const DateButton = styled.TouchableOpacity`
    flex-direction: row;
    height: 45px;
    width: 100%;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;

export const TextButton = styled.Text`
    color: #000;
    font-weight: bold;
    font-size: 18px;
    margin-right: 12px;
`;




