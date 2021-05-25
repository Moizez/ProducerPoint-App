import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${props => props.theme.main};
`;

export const Header = styled.SafeAreaView`
    width: 100%;
    height: 100px;
    background-color: ${props => props.theme.main};
`;

export const PageBox = styled.View`
    flex: 1;
    background-color: #e3e3e3;
    border-top-left-radius: 50px;
    margin-top: -50px;
`;

export const ProfileBox = styled.View`
    flex-direction: row;
    margin-top: -30px;
`;

export const Avatar = styled.Image`
    width: 110px;
    height: 110px;
    margin-left: 30px;
    margin-right: 20px;
    border-radius: 20px;
    border-width: 4px;
    border-color: #FFF;
`;

export const ButtonBox = styled.View`
    width: 100%;
    height: 48px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
    width: 90%;
    height: 48px;
    background-color:  ${props => props.theme.main};
    height: 45px;
    padding: 5px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const TextButton = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;

export const Modal = styled.Modal``;

export const ProfileNameBox = styled.View`
    flex: 1;
    justify-content: center;
    margin-top: 15px;
`;

export const ProfileName = styled.Text`
    color: #000;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const ProfileRole = styled.Text`
    color: #000;
    font-size: 13px;
    margin-top: 10px;
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
`;

export const EmptyListCard = styled.View`
    margin-top: 50px;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    color: #5c5c5c;
    font-size: 20px;
`;