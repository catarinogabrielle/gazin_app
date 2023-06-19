import React, { useState, useEffect } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, TextInput, ScrollView } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { Picker } from '@react-native-picker/picker';

import ApiVideos from '../../../contexts/videos.json';
import ApiLive from '../../../contexts/live.json';
import device from '../../../contexts/device.json';

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

type DeviceProps = {
    codigofabricante: string,
    cor: string,
    datafinal: string,
    datainicial: string,
    departamento: string,
    estoque: string,
    iddepartamento: boolean,
    idgradex: boolean,
    idgradey: boolean,
    idproduto: string,
    idpromocao: boolean,
    idpromocaoccg: boolean,
    idpromocaoprodutograde: boolean,
    idsubdepartamento: string,
    idtipovendapromocao: boolean,
    isdepartamento: boolean,
    jurocomposto: string,
    juromes: string,
    jurosano: string,
    marca: string,
    ordem: string,
    prazofinal: boolean,
    prazoinicial: boolean,
    precoaprazo: string,
    precopartida: string,
    precovenda: string,
    prioridade: boolean,
    produto: string,
    promocao: string,
    promocaoccg: string,
    subdepartamento: string,
    tipo: string,
    tipoprazopromocao: string,
    tipovendapromocao: string,
    voltagem: string,
}

import { ApiDevices } from '../../services/apiDevices'
import { Api } from '../../services/api'

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
    const [apiDevices, setApiDevices] = useState<DeviceProps[] | []>([])
    const [Json, setJson] = useState(false)
    const [filtro, setFiltro] = useState(false)
    const [branch, setBranch] = useState('10002')
    const [brand, setBrand] = useState('Marca')
    const [product, setProduct] = useState('Modelo')
    const [color, setColor] = useState('Cor')

        useEffect(() => {
            async function loadingDevice() {
                const response = await Api.get('video')
                setApiVideos(response.data)
            }
    
            loadingDevice()
        }, [])
    
        useEffect(() => {
            async function loadingDevice() {
                const response = await Api.get('live')
                setApiLive(response.data)
            }
    
            loadingDevice()
        }, [])

    useEffect(() => {
        async function loadingDevice() {
            const response = await ApiDevices.get(`/celulares?idfilial=10002&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9tech`)
            setApiDevices(response.data)
        }

        loadingDevice()
    }, [branch, Json, filtro])

    const Marca = apiDevices.map(item => item.marca)
    const uniqueMarcaList = [...new Set(Marca)]

    const Produto = apiDevices.map(item => item.produto)
    const uniqueProdutoList = [...new Set(Produto)]

    const Cor = apiDevices.map(item => item.cor)
    const uniqueCorList = [...new Set(Cor)]

    const Device = apiDevices.map(item => item)
    const uniqueDeviceList = [...new Set(Device)]

    var date = new Date()
    var dataFormatada = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).substr(-2) + "-" + ("0" + date.getDate()).substr(-2)

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

                    {apiDevices.length > 0 ? (
                        <Content>
                            <ImageBackground source={require('../../assets/backgroundGazin.png')} resizeMode="cover" style={{ flex: 1 }}>
                                {apiLive.map(e => (
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
                                                {apiVideo.map(items => {
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

                                <ScrollView>
                                    <ContentInfo style={shadow}>
                                        <Text>{product} - {color}</Text>
                                        <ContentLocation>
                                            {uniqueDeviceList.map(item => {
                                                if (dataFormatada < item.datafinal && item.tipo == 'A Vista') return (
                                                    <Label key={item.idproduto}><Text style={{ color: ColorTheme.Azul }}>R$ {item.precovenda}</Text> (A Vista)</Label>
                                                )
                                            })}
                                            {uniqueDeviceList.map(item => {
                                                if (dataFormatada < item.datafinal && item.tipo == 'Cartão') return (
                                                    <Label key={item.idproduto}><Text style={{ color: ColorTheme.Azul }}>R$ {item.precoaprazo}</Text>, Parcela em até<Text style={{ color: ColorTheme.Laranja }}> {item.prazofinal}x </Text>no cartão.</Label>
                                                )
                                            })}
                                            {uniqueDeviceList.map(item => {
                                                if (dataFormatada < item.datafinal && item.tipo == 'Carteira') return (
                                                    <Label key={item.idproduto}><Text style={{ color: ColorTheme.Azul }}>R$ {item.precoaprazo}</Text>, Parcela em até<Text style={{ color: ColorTheme.Laranja }}> {item.prazofinal}x </Text>no carne. ({item.tipoprazopromocao})</Label>
                                                )
                                            })}
                                        </ContentLocation>
                                    </ContentInfo>
                                </ScrollView>
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
                        <TextInput
                            style={filtro ? styles.inputFiltro : styles.input}
                            onChangeText={setBranch}
                            value={branch}
                            placeholder="Filial"
                            keyboardType="numeric"
                        />

                        {filtro == true ? (null) : (
                            <ButtonPicker
                                onPress={() => setFiltro(true)}
                                title="Filtrar"
                                color="#6d057d"
                                accessibilityLabel="Learn more about this purple button"
                            />
                        )}

                        {filtro == true && (
                            <>
                                <Picker
                                    style={brand == 'Marca' ? styles.container : styles.containerSelect}
                                    selectedValue={brand}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setBrand(itemValue)
                                    }>
                                    <Picker.Item label="Marca" value="Marca" />
                                    {uniqueMarcaList.map(item => {
                                        return (
                                            <Picker.Item key={item} value={item} label={item} />
                                        )
                                    })}
                                </Picker>

                                <Picker
                                    style={product == 'Modelo' ? styles.container : styles.containerSelect}
                                    selectedValue={product}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setProduct(itemValue)
                                    }>
                                    <Picker.Item label="Modelo" value="Modelo" />
                                    {uniqueProdutoList.map(item => (
                                        <Picker.Item key={item} label={item} value={item} />
                                    ))}
                                </Picker>

                                <Picker
                                    style={color == 'Cor' ? styles.container2 : styles.containerSelect2}
                                    selectedValue={color}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setColor(itemValue)
                                    }>
                                    <Picker.Item label="Cor" value="Cor" />
                                    {uniqueCorList.map(item => (
                                        <Picker.Item key={item} label={item} value={item} />
                                    ))}
                                </Picker>

                                {brand == 'Marca' || product == 'Modelo' || color == 'Cor' ? (
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
                            </>
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
        marginTop: 15,
        backgroundColor: ColorTheme.Branco3,
    },
    containerSelect: {
        color: ColorTheme.Branco3,
        marginTop: 15,
        backgroundColor: ColorTheme.Azul,
    },
    container2: {
        color: ColorTheme.Cinza,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: ColorTheme.Branco3,
    },
    containerSelect2: {
        color: ColorTheme.Branco3,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: ColorTheme.Azul,
    },
    input: {
        color: ColorTheme.Cinza,
        marginBottom: 15,
        backgroundColor: ColorTheme.Branco3,
        padding: 12,
    },
    inputFiltro: {
        color: ColorTheme.Branco3,
        backgroundColor: ColorTheme.Azul,
        padding: 12,
    },
});