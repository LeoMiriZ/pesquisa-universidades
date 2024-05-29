import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Listauniversidades from '../components/ListaUniversidades';
import { listar, excluir, debugDatabase } from '../components/Db';

export default function Unisfavoritadas() {
    let [universidade, setUniversidades] = useState([]);

    useEffect(() => {
        listar().then(setUniversidades);
    }, []);

    function removerfavoritado(uni) {
        return function () {  
            excluir(uni.web_pages)
                .then(() => {
                    let aux = new Set(universidade);
                    aux.delete(uni);
                    setUniversidades(aux);
                    listar().then((res) => setUniversidades(res))
                    debugDatabase()
                })
        }
    }

    return (
        <View style={styles.container}>
            <Listauniversidades
                data={Array.from(universidade)}
                onItemPress={removerfavoritado}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '100%',
    },
});
