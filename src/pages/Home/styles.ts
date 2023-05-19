import styled from 'styled-components';
import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

export const Container = styled.View`
height: 100%;
display: flex;
`;

export const Header = styled.View`     
width: 100%;
padding: 16px 10px 13px 10px;
background-color:${ColorTheme.Azul};
flex-direction: row;
height: 60px;
align-items: center;
justify-content: space-between;
`;

export const ContentLogo = styled.View`
display: flex;
flex-direction: row;
align-items: center;
`;

export const Logo = styled.Image`
width: 92px;
height: 26px;
`;

export const TextLogo = styled.Text`                                    
color: ${ColorTheme.Branco3};
font-size: 13px;
margin-left: 10px;
font-weight: 300;
margin-top: 1px;
font-family: Roboto;
`;

export const ContentMenu = styled.TouchableOpacity`
display: flex;
`;

export const Content = styled.View`
flex: 1;
background-color:${ColorTheme.Branco3};
flex-direction: column;
width: 100%;
`;

export const BoxVideo = styled.View`
align-items: center;
`;

export const ContentInfo = styled.View`
padding: 52px 10px;
margin: 35px 16px 0 16px;
align-items: center;
background: #F3F9FF;
border-radius: 10px;
`;

export const Text = styled.Text`                                    
color: ${ColorTheme.Preto};
font-size: 21px;
font-weight: 700;
text-align: center;
text-transform: uppercase;
margin-bottom: 12px;
font-family: Roboto;
`;

export const Label = styled.Text`                                    
color: ${ColorTheme.Preto};
font-size: 19px;
font-weight: 300;
margin-top: 22px;
font-family: Roboto;
`;

export const LabelInfo = styled.Text`                                    
color: ${ColorTheme.Preto};
font-size: 19px;
font-weight: 300;
margin-top: 4px;
font-family: Roboto;
`;

export const ContentLocation = styled.View`
align-items: center;
`;

export const ContainerModal = styled.SafeAreaView`
flex: 1;
`;

export const ContainerModalOpacity = styled.View`
flex: 1;
z-index: 9;
display: flex;
justify-content: flex-end;
background: rgba(0, 0, 0, 0.35);
`;

export const ContentModal = styled.View`
margin: 0 10px;
height: 50%;
background: ${ColorTheme.Branco3};
padding: 15px 5px;
border-top-left-radius: 40px;
border-top-right-radius: 40px;
display: flex;
z-index: 99;
align-items: flex-end;
`;

export const TouchableClosed = styled.TouchableOpacity`
display: flex;
margin: 5px 14px 18px 0;
width: 25px;
`;

export const BoxStore = styled.TouchableOpacity`
display: flex;
flex-direction: row;
align-items: center;
padding: 5px 3px;
border-bottom-color: ${ColorTheme.Branco};
border-bottom-width: 1px;
margin: 0px 15px 15px 15px;
`;

export const NameStore = styled.Text`                                    
color: ${ColorTheme.Cinza};
font-size: 17px;
font-weight: 200;
margin-left: 4px;
font-family: Roboto;
`;