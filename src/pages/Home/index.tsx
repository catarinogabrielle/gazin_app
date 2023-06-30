import React, { useState, useEffect } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet, TextInput, ScrollView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useSWR from "swr"
import { Ionicons } from "@expo/vector-icons";

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
    IdProduct,
    Label,
    ContentLocation,
    ContentInfo2,
    Title,
    ButtonPicker,
    Line,
} from './styles';

import Colors from "../../../constants/Colors";
const ColorTheme = Colors['Theme'];

import { ApiDevices } from "../../services/apiDevices"
import { Api } from "../../services/api"

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
    const [loading, setLoading] = useState(false)
    const [branch, setBranch] = useState('10002')
    const [brand, setBrand] = useState('Marca')
    const [product, setProduct] = useState('Modelo')
    const [color, setColor] = useState('Cor')

    const data = {
        branch,
        brand,
        product,
        color
    }

    async function diveceItemsInfo() {
        await AsyncStorage.setItem('@deviceitem', JSON.stringify(data))
    }

    useEffect(() => {
        setLoading(true)

        async function getDeviceStorage() {
            const storageInfo = await AsyncStorage.getItem('@deviceitem')
            let hasDevice = JSON.parse(storageInfo || '{}')

            setLoading(false)

            if (Object.keys(hasDevice).length > 0) {
                setBranch(hasDevice.branch)
                setBrand(hasDevice.brand)
                setProduct(hasDevice.product)
                setColor(hasDevice.color)

                setLoading(true)
            }
        }

        getDeviceStorage()
    }, [])

    async function removeItemValue() {
        try {
            await AsyncStorage.removeItem('@deviceitem')
            setLoading(false)
            return true
        }
        catch (exception) {
            return false;
        }
    }

    function useVideo() {
        let address = `video`

        const fetcher = async (address: string) => await Api.get(address).then((res) => res.data)
        const { data, mutate } = useSWR(address, fetcher, { refreshInterval: 5000 })

        return {
            video: data,
            mutate
        }
    }

    const { video } = useVideo()

    function useLive() {
        let address = `live`

        const fetcher = async (address: string) => await Api.get(address).then((res) => res.data)
        const { data, mutate } = useSWR(address, fetcher, { refreshInterval: 5000 })

        return {
            live: data,
            mutate
        }
    }

    const { live } = useLive()

    function useDevice() {
        let address = `/celulares?idfilial=${branch}&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9tech`

        const fetcher = async (address: string) => await ApiDevices.get(address).then((res) => res.data)
        const { data, error, isLoading, mutate } = useSWR(address, fetcher, { refreshInterval: 5000 })

        return {
            device: data,
            isLoading,
            isError: error,
            mutate
        }
    }

    const { device, isLoading } = useDevice()

    const Marca = device?.map((item: { marca: string; }) => item.marca)
    const uniqueMarcaList = [...new Set(Marca)]

    function HandleLowestPrice(
        jsonData: any,
        tipo: string
    ): any {
        const hoje = new Date()
        const produtosFiltrados = jsonData.filter((produto: { idproduto: number; produto: string; cor: string; marca: string; tipo: string; datafinal: string | number | Date; }) => {
            return (
                produto.cor == color &&
                produto.produto == product &&
                produto.marca == brand &&
                produto.tipo == tipo &&
                new Date(produto.datafinal) > hoje
            )
        })

        if (tipo == 'A Vista') {
            produtosFiltrados.sort((a: { precovenda: string; }, b: { precovenda: string; }) => {
                return parseFloat(a.precovenda) - parseFloat(b.precovenda)
            })
        }

        if (tipo == 'Cartão' || tipo == 'Carteira')
            produtosFiltrados.sort((a: { precoaprazo: string; }, b: { precoaprazo: string; }) => {
                return parseFloat(a.precoaprazo) - parseFloat(b.precoaprazo)
            })

        console.log(produtosFiltrados[0])

        return produtosFiltrados[0]
    }

    function handleProductBrand(jsonData: any[], marca: string): string[] {
        const produtoNomes: string[] = []

        for (const value of jsonData) {
            if (value.marca === marca && !produtoNomes.includes(value.produto)) {
                produtoNomes.push(value.produto);
            }
        }

        return produtoNomes
    }

    function handleProductColor(jsonData: any[], produto: string): string[] {
        const produtoNomes: string[] = []

        for (const value of jsonData) {
            if (value.produto === produto && !produtoNomes.includes(value.cor)) {
                produtoNomes.push(value.cor);
            }
        }

        return produtoNomes
    }

    function mask(input: string): string {
        input = parseFloat(input).toFixed(2)
        input = input.toString().replace('.', ',')
        const valor = input.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

        return 'R$ ' + valor
    }

    return (
        <Container>
            {loading ? (
                <>
                    <Header>
                        <ContentLogo>
                            <Logo source={require('../../assets/logogazin.png')} />
                            <TextLogo>Seja Bem Vindo (a)</TextLogo>
                        </ContentLogo>
                        <Ionicons onPress={removeItemValue} name="exit-outline" size={22} color={ColorTheme.Branco3} />
                    </Header>

                    {isLoading == false ? (
                        <Content>
                            <ImageBackground source={require('../../assets/backgroundGazin.png')} resizeMode="cover" style={{ flex: 1 }}>
                                {live.map((e: { id: any; live: boolean; video: string | undefined; }) => (
                                    <BoxVideo key={e.id}>
                                        {e.live == true ? (
                                            <BoxLive>
                                                <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                                                <YoutubePlayer
                                                    width="100%"
                                                    height={222}
                                                    videoId={e.video}
                                                    play={true}
                                                    loopPlaylists
                                                />
                                            </BoxLive>
                                        ) : (
                                            <>
                                                {video.map((items: { brand: string; id: any; video: string | undefined; }) => {
                                                    if (brand == items.brand) return (
                                                        <BoxLive key={items.id}>
                                                            <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                                                            <YoutubePlayer
                                                                width="100%"
                                                                height={222}
                                                                videoId={items.video}
                                                                play={true}
                                                                loopPlaylists
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
                                        {brand == 'Marca' || product == 'Modelo' || color == 'Cor' ? (null) : (
                                            <>
                                                <Text>{product} - {color}</Text>
                                                {HandleLowestPrice(device, 'A Vista') && (
                                                    <IdProduct key={HandleLowestPrice(device, 'A Vista').idproduto + '4'}>{HandleLowestPrice(device, 'A Vista').idproduto}</IdProduct>
                                                )}
                                            </>
                                        )}
                                        <ContentLocation>
                                            {HandleLowestPrice(device, 'A Vista') && (
                                                <Label key={HandleLowestPrice(device, 'A Vista').idproduto + '1'}><Text style={{ color: ColorTheme.Azul }}>{mask(HandleLowestPrice(device, 'A Vista').precovenda)}</Text> (A Vista)</Label>
                                            )}
                                            {HandleLowestPrice(device, 'Cartão') && (
                                                <Label key={HandleLowestPrice(device, 'Cartão').idproduto + '2'}><Text style={{ color: ColorTheme.Azul }}>{mask(HandleLowestPrice(device, 'Cartão').precoaprazo)}</Text>  Parcelas em até<Text style={{ color: ColorTheme.Laranja }}> {HandleLowestPrice(device, 'Cartão').prazofinal}x </Text>no cartão.</Label>
                                            )}
                                            {HandleLowestPrice(device, 'Carteira') && (
                                                <Label key={HandleLowestPrice(device, 'Carteira').idproduto + '2'}><Text style={{ color: ColorTheme.Azul }}>{mask(HandleLowestPrice(device, 'Carteira').precoaprazo)}</Text>  Parcelas em até<Text style={{ color: ColorTheme.Laranja }}> {HandleLowestPrice(device, 'Carteira').prazofinal}x </Text>no carne.</Label>
                                            )}
                                        </ContentLocation>
                                    </ContentInfo>
                                </ScrollView>
                            </ImageBackground>
                        </Content>
                    ) : (
                        <Content style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator style={{ position: 'absolute', top: 80 }} size={40} color={ColorTheme.Azul} />
                        </Content>
                    )
                    }
                </>
            ) : (
                <ImageBackground source={require('../../assets/backgroundGazin.png')} resizeMode="cover" style={{ flex: 1 }}>
                    <ContentInfo2>
                        <Title>Selecione as opções:</Title>
                        <TextInput
                            style={isLoading == false ? styles.inputFiltro : styles.input}
                            onChangeText={setBranch}
                            value={branch}
                            placeholder="Filial"
                            keyboardType="numeric"
                        />

                        <Line />

                        {isLoading == false ? (
                            <>
                                <Picker
                                    style={brand == 'Marca' ? styles.container : styles.containerSelect}
                                    selectedValue={brand}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setBrand(itemValue)
                                    }>
                                    <Picker.Item label="Marca" value="Marca" />
                                    {uniqueMarcaList.map(item => {
                                        if (item !== 'AMET PELICULAS')
                                            return (
                                                <Picker.Item key={item} value={item} label={item} />
                                            )
                                    })}
                                </Picker>

                                <Picker
                                    style={product == 'Modelo' ? styles.container : styles.containerSelect}
                                    selectedValue={product}
                                    numberOfLines={2}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setProduct(itemValue)
                                    }>
                                    <Picker.Item label="Modelo" value="Modelo" />

                                    {handleProductBrand(device, brand).map(item => (
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
                                    {handleProductColor(device, product).map(item => (
                                        <Picker.Item key={item} label={item} value={item} />
                                    ))}
                                </Picker>

                                {brand == 'Marca' || product == 'Modelo' || color == 'Cor' ? (null) : (
                                    <ButtonPicker
                                        onPress={() => { setLoading(true), diveceItemsInfo() }}
                                        title="Filtrar"
                                        color="#6d057d"
                                        accessibilityLabel="Learn more about this purple button"
                                    />
                                )}
                            </>
                        ) : (
                            <ActivityIndicator style={{ top: 40 }} size={40} color={ColorTheme.Azul} />
                        )}
                    </ContentInfo2>
                </ImageBackground>
            )}
        </Container >
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
        marginBottom: 15,
        color: ColorTheme.Branco3,
        backgroundColor: ColorTheme.Azul,
        padding: 12,
    }
});