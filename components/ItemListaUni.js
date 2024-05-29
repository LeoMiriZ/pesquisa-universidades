import { StyleSheet, View } from "react-native";
import Button from "./Botao";

export default function Itemlistauni({ university, onPress, mode }) {
    return (
        <View style={styles.ItemlistauniContainer}>
            {mode === 'name' ? (
                <Button 
                    title={university.name} 
                    style={{ text: styles.ItemlistauniText }} 
                    onPress={onPress} 
                />
            ) : (
                <Button 
                    title={university.web_pages} 
                    style={{ text: styles.ItemlistauniText }} 
                    onPress={onPress} 
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    ItemlistauniContainer: {
        marginBottom: 20,
        padding: 10,
        borderColor: "#000",
        borderWidth: 5,
        borderRadius: 15,
    },
    ItemlistauniText: {
        fontSize: 20,
        maxWidth: "100%",
        textAlign: "center"
    }
});