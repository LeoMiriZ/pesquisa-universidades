import { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Button from "../components/Botao"
import Listauniversidades from '../components/ListaUniversidades';
import axios from 'axios';
import Listafavcontext from '../contexts/ListaFavContext';
import { inserir, debugDatabase } from '../components/Db';

export default function Pesquisarunis({ navigation }) {
    let { listafavoritos, setlistafavoritos } = useContext(Listafavcontext)
    let [universidades, setunis] = useState([])

    let [nomeuni, setnomeuni] = useState("")
    let [paisuni, setpaisuni] = useState("")

    useEffect(() => {
        pesquisarunis(null, null);
    }, []);

    function mudartela() {
        navigation.navigate("Lista de Favoritos")
    }

    async function pesquisarunis(name, country) {
        if (name === "" && country === "") {
            return
        }

        let queryParams = {}
        if (name !== "") {
            queryParams.name = name
        }

        if (country !== "") {
            queryParams.country = country
        }

        let site = 'http://universities.hipolabs.com/search'

        const response = await axios.get(site, { params: queryParams })

        setunis(response.data)
    }

    function addfavorito(uni) {
        return () => {

            inserir(uni.name, uni.web_pages[0])
                .then(() => {
                    let aux = new Set(listafavoritos);
                    aux.add(uni);
                    setlistafavoritos(aux);
                    debugDatabase()
                })
        };

    }

    return <View style={styles.container}>
        <View>
            <TextInput
                style={styles.filtrounis}
                value={nomeuni}
                placeholder={"Nome da Universidade"}
                onChangeText={setnomeuni} />
            <TextInput
                style={styles.filtrounis}
                value={paisuni}
                placeholder={"País da Universidade"}
                onChangeText={setpaisuni} />
        </View>
        <View style={styles.grupobotoes}>
            <Button
                style={styles.botoesunis}
                title='Pesquisar 🔎'
                onPress={async function () {
                    return pesquisarunis(nomeuni, paisuni)
                }} />
            <Button
                style={styles.botoesunis}
                title='Favoritos ★'
                onPress={mudartela} />
        </View>
        <View style={{ flex: 1 }}>
            <Listauniversidades data={universidades} itemIdKey={'name'} onItemPress={addfavorito} mode={'name'} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    filtrounis: {
        marginBottom: 8,
        marginTop: 15,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderColor: "#000",
        borderWidth: 2,
        width: "20rem",
        fontSize: 20,
        borderRadius: 15,
    },
    grupobotoes: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "95%",
        marginTop: 15,
    },
    botoesunis: {
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 10,
            backgroundColor: '#0d6efd',
        },
        text: {
            fontWeight: 'bold',
            color: "white",
            fontSize: 20
        }
    },
});