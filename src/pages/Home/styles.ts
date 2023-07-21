import styled from 'styled-components';
import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

export const Container = styled.View`
height: 100%;
display: flex;
`;

export const Header = styled.View`     
width: 100%;
padding: 16px 13px 13px 10px;
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
font-weight: 300;
font-family: Roboto;
`;

export const Content = styled.View`
flex: 1;
background-color:${ColorTheme.Branco3};
flex-direction: column;
width: 100%;
display: flex;
`;

export const BoxVideo = styled.View`
display: flex;
`;

export const BoxLive = styled.View`
display: flex;
align-items: center;
`;

export const ContentInfo = styled.View`
padding: 35px 25px;
//margin: 20px 16px 20px 16px;
//background: ${ColorTheme.Branco3};
border-radius: 10px;
`;

export const Text = styled.Text`                                    
color: ${ColorTheme.Preto};
font-size: 21px;
font-weight: 700;
text-transform: uppercase;
font-family: Roboto;
`;

export const IdProduct = styled.Text`                                    
color: ${ColorTheme.Branco5};
font-size: 16px;
font-weight: 200;
text-transform: uppercase;
margin-top: 2px;
font-family: Roboto;
`;

export const Label = styled.Text`                                    
color: ${ColorTheme.Preto};
font-size: 19px;
font-weight: 300;
//margin-top: 22px;
font-family: Roboto;

margin-top: 32px;
`;

export const ContentLocation = styled.View`
display: flex;
`;

export const ContentInfo2 = styled.View`
display: flex;
flex: 1;
padding: 0 20px;
margin-top: 50px;
`;

export const Title = styled.Text`                                    
color: ${ColorTheme.Cinza};
font-size: 22px;
font-weight: 300;
margin-bottom: 18px;
font-family: Roboto;
`;

export const Filial = styled.View`
display: flex;
background-color: ${ColorTheme.Azul};
padding: 16px 12px;
margin-bottom: 15px;
`;

export const TextFilial = styled.Text`                                    
color: ${ColorTheme.Branco3};
font-size: 16px;
`;

export const Line = styled.View`
border: 0.5px solid #cecece;
`;

export const ButtonPicker = styled.Button`
display: flex;
`;