import React, { useState, useEffect } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Picker } from '@react-native-picker/picker';

import ApiDevices from '../../../contexts/devices.json';
import ApiVideos from '../../../contexts/videos.json';
import ApiLive from '../../../contexts/live.json';

import JsonApi from '../../../contexts/Json.json';

import {
    Container,
    Header,
    ContentLogo,
    Logo,
    TextLogo,
    Content,
    BoxVideo,
    BoxLive,
    ContentInfo,
    Text,
    Label,
    LabelInfo,
    ContentLocation,
    ContentInfo2,
    Title,
    ButtonPicker
} from './styles';

import Colors from '../../../constants/Colors';
const ColorTheme = Colors['Theme'];

type LiveProps = {
    id: string,
    live: boolean,
    video: string
}

type VideoProps = {
    id: string,
    brand: string,
    code: string,
    video: string
}

import { api } from '../../services/api'

var shadow = {
    elevation: 3,
    shadowColor: "grey",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: {
        width: 0,
        height: 2
    }
}

export default function Home() {
    const [apiLive, setApiLive] = useState<LiveProps[] | []>([])
    const [apiVideo, setApiVideos] = useState<VideoProps[] | []>([])
    const [Json, setJson] = useState(false)
    const [branch, setBranch] = useState('Filial')
    const [brand, setBrand] = useState('Marca')
    const [product, setProduct] = useState('Modelo')
    const [color, setColor] = useState('Cor')
    /** 
        useEffect(() => {
            async function loadingDevice() {
                const response = await api.get('video')
                setApiVideos(response.data)
            }
    
            loadingDevice()
        }, [])
    
        useEffect(() => {
            async function loadingDevice() {
                const response = await api.get('live')
                setApiLive(response.data)
            }
    
            loadingDevice()
        }, [])
    */

    return (
        <Container>
            {Json == true ? (
                <>
                    <Header>
                        <ContentLogo>
                            <Logo source={require('../../assets/logogazin.png')} />
                            <TextLogo>Seja Bem Vindo (a)</TextLogo>
                        </ContentLogo>
                    </Header>

                    {JsonApi ? (
                        <Content>
                            <ImageBackground source={require('../../assets/backgroundGazin.png')} resizeMode="cover" style={{ flex: 1 }}>
                                {ApiLive.live.map(e => (
                                    <BoxVideo key={e.id}>
                                        {e.live == true ? (
                                            <BoxLive>
                                                <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                                                <YoutubePlayer
                                                    width="100%"
                                                    height={222}
                                                    videoId={e.video}
                                                    play={true}
                                                />
                                            </BoxLive>
                                        ) : (
                                            <>
                                                {ApiVideos.videos.map(items => {
                                                    if (brand == items.brand) return (
                                                        <BoxLive key={items.id}>
                                                            <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                                                            <YoutubePlayer
                                                                width="100%"
                                                                height={222}
                                                                videoId={items.video}
                                                                play={true}
                                                            />
                                                        </BoxLive>
                                                    )
                                                })}
                                            </>
                                        )}
                                    </BoxVideo>
                                ))}

                                {JsonApi.map(item => {
                                    if (product == item.produto && branch == item.idsubdepartamento && color == item.cor) return (
                                        <ContentInfo style={shadow}>
                                            <Text>{item.produto} - {item.cor}</Text>
                                            <ContentLocation>
                                                <Label>Preço à Vista:
                                                    <Text style={{ color: ColorTheme.Azul }}> R$ {item.precovenda}</Text>
                                                </Label>
                                                <Label>Preço à Prazo:
                                                    <Text style={{ color: ColorTheme.Azul }}> R$ {item.precoaprazo}</Text>
                                                </Label>
                                                <LabelInfo>em
                                                    <Text style={{ color: ColorTheme.Laranja }}> {item.prazofinal}x </Text>
                                                    de
                                                    <Text style={{ color: ColorTheme.Laranja }}> R$ {item.prazofinal} </Text>sem juros
                                                </LabelInfo>
                                            </ContentLocation>
                                        </ContentInfo>
                                    )
                                })}
                            </ImageBackground>
                        </Content>
                    ) : (
                        <Content style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                        </Content>
                    )}
                </>
            ) : (
                <ImageBackground source={require('../../assets/backgroundGazin.png')} resizeMode="cover" style={{ flex: 1 }}>
                    <ContentInfo2>
                        <Title>Selecione as opções:</Title>
                        <Picker
                            style={branch == 'Filial' ? styles.container : styles.containerSelect}
                            selectedValue={branch}
                            onValueChange={(itemValue, itemIndex) =>
                                setBranch(itemValue)
                            }>
                            <Picker.Item label="Filial" value="Filial" />
                            {JsonApi.map(item => (
                                <Picker.Item label={item.idsubdepartamento} value={item.idsubdepartamento} />
                            ))}
                        </Picker>

                        <Picker
                            style={brand == 'Marca' ? styles.container : styles.containerSelect}
                            selectedValue={brand}
                            onValueChange={(itemValue, itemIndex) =>
                                setBrand(itemValue)
                            }>
                            <Picker.Item label="Marca" value="Marca" />
                            {JsonApi.map(item => (
                                <Picker.Item label={item.marca} value={item.marca} />
                            ))}
                        </Picker>

                        <Picker
                            style={product == 'Modelo' ? styles.container : styles.containerSelect}
                            selectedValue={product}
                            onValueChange={(itemValue, itemIndex) =>
                                setProduct(itemValue)
                            }>
                            <Picker.Item label="Modelo" value="Modelo" />
                            {JsonApi.map(item => (
                                <Picker.Item label={item.produto} value={item.produto} />
                            ))}
                        </Picker>

                        <Picker
                            style={color == 'Cor' ? styles.container : styles.containerSelect}
                            selectedValue={color}
                            onValueChange={(itemValue, itemIndex) =>
                                setColor(itemValue)
                            }>
                            <Picker.Item label="Cor" value="Cor" />
                            {JsonApi.map(item => (
                                <Picker.Item label={item.cor} value={item.cor} />
                            ))}
                        </Picker>

                        {branch == 'Filial' || brand == 'Marca' || product == 'Modelo' || color == 'Cor' ? (
                            <ButtonPicker
                                title="Filtrar"
                                color="#b1b1b1"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        ) : (
                            <ButtonPicker
                                onPress={() => setJson(true)}
                                title="Filtrar"
                                color="#6d057d"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        )}
                    </ContentInfo2>
                </ImageBackground>
            )}
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        color: ColorTheme.Cinza,
        marginBottom: 15,
        backgroundColor: ColorTheme.Branco3,
    },
    containerSelect: {
        color: ColorTheme.Branco3,
        marginBottom: 15,
        backgroundColor: ColorTheme.Azul,
    },
});