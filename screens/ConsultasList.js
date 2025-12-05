import { useEffect, useState } from "react";
import { Button, FlatList, Text, View, Alert } from "react-native";
import { getDBConnection } from "../database";
import { useIsFocused } from '@react-navigation/native';

export default function ConsultasList({ navigation, route }) {
  const paciente = route.params.paciente;
  const [lista, setLista] = useState([]);
  const isFocused = useIsFocused();

  const carregar = async () => {
    try {
      const db = await getDBConnection();
      const result = await db.getAllAsync(
        "SELECT * FROM consultas WHERE paciente_id=?",
        [paciente.id]
      );
      setLista(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      carregar();
    }
  }, [isFocused]);

  const excluir = async (id) => {
    try {
      const db = await getDBConnection();
      await db.runAsync("DELETE FROM consultas WHERE id=?", [id]);
      await carregar();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir");
    }
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
        Consultas de {paciente.nome}
      </Text>

      <Button
        title="Nova Consulta"
        onPress={() => navigation.navigate("NovaConsulta", { paciente })}
      />

      <FlatList
        data={lista}
        keyExtractor={(i) => i.id.toString()}
        style={{ marginTop: 15 }}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text style={{fontWeight:'bold'}}>{item.data}</Text>
            <Text>{item.descricao}</Text>

            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                <Button
                title="Editar"
                onPress={() =>
                    navigation.navigate("EditarConsulta", {
                    consulta: item,
                    paciente,
                    })
                }
                />
                <Button color="red" title="Excluir" onPress={() => excluir(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}