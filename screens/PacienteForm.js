import { useState } from "react";
import { Button, TextInput, View, Alert, Text } from "react-native";
import { getDBConnection } from "../database";

export default function PacienteForm({ route, navigation }) {
  const paciente = route.params?.paciente;
  
  const [nome, setNome] = useState(paciente?.nome || "");
  const [telefone, setTelefone] = useState(paciente?.telefone || "");
  const [idade, setIdade] = useState(String(paciente?.idade || ""));

  const salvar = async () => {
    // Validação simples para evitar salvar nomes vazios
    if (nome.trim() === "") {
      Alert.alert("Erro", "O nome é obrigatório");
      return;
    }

    try {
      const db = await getDBConnection();
      
      // Converte idade para número. Se for inválido/vazio, vira null
      const idadeNumero = parseInt(idade);
      const idadeFinal = isNaN(idadeNumero) ? null : idadeNumero;

      if (paciente) {
        // Atualizar existente
        await db.runAsync(
          "UPDATE pacientes SET nome=?, telefone=?, idade=? WHERE id=?",
          [nome, telefone, idadeFinal, paciente.id]
        );
      } else {
        // Criar novo
        await db.runAsync(
          "INSERT INTO pacientes (nome, telefone, idade) VALUES (?, ?, ?)",
          [nome, telefone, idadeFinal]
        );
      }
      navigation.goBack(); 
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Falha ao salvar no banco de dados.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{marginBottom: 5}}>Nome do Paciente</Text>
      <TextInput
        placeholder="Ex: João da Silva"
        value={nome}
        onChangeText={setNome}
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5, borderColor: '#ccc' }}
      />

      <Text style={{marginBottom: 5}}>Telefone</Text>
      <TextInput
        placeholder="Ex: (11) 99999-9999"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5, borderColor: '#ccc' }}
      />

      <Text style={{marginBottom: 5}}>Idade</Text>
      <TextInput
        placeholder="Ex: 30"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5, borderColor: '#ccc' }}
      />

      <Button title="Salvar Paciente" onPress={salvar} />
    </View>
  );
}