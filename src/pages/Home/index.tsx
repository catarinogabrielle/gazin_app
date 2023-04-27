import React from "react";
import { ActivityIndicator, Platform } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

import { Container, Header, Logo, TextLogo, Content, BoxVideo, ContentInfo, Text, Label, LabelInfo } from './styles';

import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

var shadow = {
    elevation: 3,
    shadowColor: "grey",
    shadowOpacity: 0.4,
    shadowRadius: 10,
}

console.log(JSON.stringify(Platform.constants.Model, null, 2))

export default function Home() {
    return (
        <Container>
            <Header>
                <Logo source={require('../../assets/logogazin.png')} />
                <TextLogo>Seja Bem Vindo (a)</TextLogo>
            </Header>

            <Content>
                <BoxVideo>
                    <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                    <YoutubePlayer
                        width="100%"
                        height={222}
                        videoId={"IentQeNVJFU"}
                        play={true}
                    />
                </BoxVideo>

                <ContentInfo style={shadow}>
                    <Text>Celular Samsung galaxy a-53 5g 128gb dual</Text>
                    <Label>Preço à Vista: <Text style={{ color: ColorTheme.Azul }}>R$ 2.299,00</Text></Label>
                    <Label>Preço à Prazo: <Text style={{ color: ColorTheme.Azul }}>R$ 2.299,00</Text></Label>
                    <LabelInfo>em <Text style={{ color: ColorTheme.Laranja }}>12x</Text> de <Text style={{ color: ColorTheme.Laranja }}>R$ 64,42 </Text>sem juros</LabelInfo>
                </ContentInfo>
            </Content>
        </Container>
    )
}
