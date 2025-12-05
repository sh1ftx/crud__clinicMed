import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { createTables, getDBConnection } from './database';

import ConsultaForm from "./screens/ConsultaForm";
import ConsultasList from "./screens/ConsultasList";
import PacienteForm from "./screens/PacienteForm";
import PacientesList from "./screens/PacientesList";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const initDB = async () => {
      const db = await getDBConnection();
      await createTables(db);
    };
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pacientes" component={PacientesList} />
        <Stack.Screen name="NovoPaciente" component={PacienteForm} options={{ title: "Novo Paciente" }} />
        <Stack.Screen name="EditarPaciente" component={PacienteForm} options={{ title: "Editar Paciente" }} />
        <Stack.Screen name="Consultas" component={ConsultasList} />
        <Stack.Screen name="NovaConsulta" component={ConsultaForm} options={{ title: "Nova Consulta" }} />
        <Stack.Screen name="EditarConsulta" component={ConsultaForm} options={{ title: "Editar Consulta" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}