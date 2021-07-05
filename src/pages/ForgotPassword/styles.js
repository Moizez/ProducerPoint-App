import styled from 'styled-components/native'

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
`;

export const InputTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 5px;
    color: #072;
`;

export const InputContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 0 35px;
`;

export const InputBox = styled.View`
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    margin-top: 20px;
    margin-left: 20px;
`;

export const Text = styled.Text`
    margin: 5px 0 0 15px;
    font-size: 11px;
    color: #007200;
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


