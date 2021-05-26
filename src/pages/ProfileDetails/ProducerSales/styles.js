import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.main};
`;

export const Title = styled.Text`
    color: #5c5c5c;
    font-size: 20px;
`;

export const PageBox = styled.View`
    flex: 1;
    background-color: #e3e3e3;
`;

export const ListTitle = styled.Text`
    color: #000;
    font-size: 14px;
    margin-top: 25px;
    text-align: center;
    font-weight: bold;
    font-variant:small-caps;
`;

export const FlatList = styled.FlatList`
    flex: 1;
`;

export const Divider = styled.View`
    height: 0.5px;
    background-color: #CCC;
    margin: 0 20px 10px 20px;
`;

export const ListTitleBox = styled.View`
    background-color: #e3e3e3;
    border-top-left-radius: 20px;
`;

export const EmptyListCard = styled.View`
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`;

export const EyeButton = styled.TouchableOpacity`
`;

export const HalfInputBox = styled.View`
    width: 48%;
    height: 48px;
    border-radius: 5px;
    background-color: #CCC;
    margin-bottom: 10px;
    justify-content: space-around;
`;
