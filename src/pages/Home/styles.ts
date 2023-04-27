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
padding: 45px 14px;
margin: 35px 16px 0 16px;
align-items: center;
background-color:${ColorTheme.Branco4};
`;

export const Text = styled.Text`                                    
color: ${ColorTheme.Preto};
font-size: 22px;
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