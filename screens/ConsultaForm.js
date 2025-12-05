import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { getDBConnection } from "../database";

export default function ConsultaForm({ navigation, route }) {
  const { paciente, consulta } = route.params || {};

  const [data, setData] = useState(consulta?.data || "");
  const [descricao, setDescricao] = useState(consulta?.descricao || "");

  const salvar = async () => {
    try {
      const db = await getDBConnection();
      
      if (consulta) {
        await db.runAsync(
          "UPDATE consultas SET data = ?, descricao = ? WHERE id = ?",
          [data, descricao, consulta.id]
        );
      } else {
        await db.runAsync(
          "INSERT INTO consultas (paciente_id, data, descricao) VALUES (?, ?, ?)",
          [paciente.id, data, descricao]
        );
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao salvar consulta");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Data (ex: 10/10/2023)"
        value={data}
        onChangeText={setData}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 }}
      />

      <TextInput
        placeholder="Descrição (ex: Dor de cabeça)"
        value={descricao}
        onChangeText={setDescricao}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 }}
      />

      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}