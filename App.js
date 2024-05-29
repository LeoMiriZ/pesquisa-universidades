import Pesquisarunis from "./screens/PesquisaUnis";
import Unisfavoritadas from "./screens/UnisFavoritadas";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaFavContext from "./contexts/ListaFavContext";
import { useState } from "react";
import { iniciar } from "./components/Db";

const Stack = createNativeStackNavigator()
iniciar().then(() => console.log("Banco de dados criado")).catch((err) => console.log(err))

export default function App() {
  let [listafavoritos, setlistafavoritos] = useState(new Set());

  return <ListaFavContext.Provider value={{ listafavoritos, setlistafavoritos }}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista de Universidades" component={Pesquisarunis} />
        <Stack.Screen name="Lista de Favoritos" component={Unisfavoritadas} />
      </Stack.Navigator>
    </NavigationContainer>
  </ListaFavContext.Provider>
}