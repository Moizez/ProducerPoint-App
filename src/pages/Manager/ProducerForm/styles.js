import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.main};
`;

export const Header = styled.SafeAreaView`
    width: 100%;
    height: 100px;
    background-color: ${props => props.theme.main};
    align-items: center;
    margin-top: 20px;
`;

export const Title = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
`;

export const PageBox = styled.ScrollView`
    flex: 1;
    background-color: #e3e3e3;
    border-top-left-radius: 20px;
    margin-top: -50px;
`;

export const FormContainer = styled.View`
    flex: 1;
`;

export const FormBox = styled.SafeAreaView`
    flex: 1;
    align-items: center;
`;

export const FormTitle = styled.Text`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #000;
`;

export const InputContainer = styled.View`
    width: 90%;
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

export const HalfInputBox = styled.View`
    width: 48%;
    height: 48px;
    border-radius: 5px;
    background-color: #CCC;
    margin-bottom: 10px;
    justify-content: space-around;
`;

export const Input = styled.TextInput`
    width: 100%;
    font-size: 18px;
    color: #292b2c;
    padding-left: 15px;
`;

export const Text = styled.Text`
    margin: 5px 0 0 3px;
    font-size: 11px;
    color: #495057;
`;

export const IconBox = styled.TouchableOpacity`
    height: 48px;
    width: 15%;
    align-items: center;
    justify-content: center;
    margin-right: 25px;
    background-color: #5c5c5c;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
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

export const ButtonBox = styled.View`
    width: 90%;
    height: 48px;
    border-radius: 5px;
    margin-bottom: 35px;
    justify-content: space-between;
`;

export const SaveButton = styled.TouchableOpacity`
    width: 100%;
    height: 48px;
    flex-direction: row;
    background-color: #2a9d8f;
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const ResetForm = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;

export const Modal = styled.Modal``;

export const MultiButton = styled.TouchableOpacity`
    flex: 1;
    border-radius: 5px;
    flex-direction: row;
    background-color: #CCC;
    align-items: center;
    justify-content: space-around;
`;

export const MultiBox = styled.ScrollView`
    height: 100%;
`;

export const MultiItemsBox = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
`;

export const MultiItem = styled.View`
    background-color: #e3e3e3;
    margin: 10px 3px 0 3px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`;

export const MultiInfo = styled.View`
    background-color: ${props => props.theme.main};
    padding: 10px;
`;

export const NumberBox = styled.View`
    height: 30px;
    width: 30px;
    border-radius: 15px;
    background-color: #2a9d8f;
    align-items: center;
    justify-content: center;
`;

export const MultiText = styled.Text`
    font-size: 16px;
`;

export const Divider = styled.View`
    width: 85%;    
    height: 0.5px;
    background-color: #CCC;
    margin: 8px 0 15px 0;
`;



