import Itemlistauni from "./ItemListaUni";

import { FlatList, StyleSheet } from 'react-native';


export default function Listauniversidades({ data, onItemPress, mode }) {
    return (
        <FlatList
            style={styles.listauniversidades}
            data={data}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <Itemlistauni 
                    university={item} 
                    onPress={onItemPress(item)} 
                    mode={mode} 
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    listauniversidades: {
        margin: 5,
        paddingHorizontal: 16,
        paddingTop: 20,
        overflow: 'scroll',
        width: '100%',}
})