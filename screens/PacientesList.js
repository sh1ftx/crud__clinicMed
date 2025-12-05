import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { getDBConnection } from "../database";

export default function PacientesList({ navigation }) {
  const [lista, setLista] = useState([]);
  const isFocused = useIsFocused(); 

  const carregar = async () => {
    try {
      const db = await getDBConnection();
      const result = await db.getAllAsync("SELECT * FROM pacientes");
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
    const db = await getDBConnection();
    await db.runAsync("DELETE FROM pacientes WHERE id=?", [id]);
    await carregar();
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Button title="Novo Paciente" onPress={() => navigation.navigate("NovoPaciente")} />

      <FlatList
        data={lista}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{fontWeight: 'bold'}}>{item.nome}</Text>
            <Text>Tel: {item.telefone} - Idade: {item.idade}</Text>

            <View style={{flexDirection: 'row', gap: 10, marginTop: 5}}>
                <Button title="Editar" onPress={() => navigation.navigate("EditarPaciente", { paciente: item })} />
                <Button title="Consultas" onPress={() => navigation.navigate("Consultas", { paciente: item })} />
                <Button color="red" title="Excluir" onPress={() => excluir(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}