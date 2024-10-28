"use server";

import { Person } from "../_components/PersonForm";
import { api } from "../api";

export const createPersonAction = async (data: Person) => {
  const { nome, email, cidade, estado } = data;
  
  try {
    //await new Promise((resolve) => setTimeout(resolve, 2000));
    const { data: state } = await createState(estado);

    const { data: city } = await createCity({
      nome: cidade,
      estadoId: state.id,
    });

    const requestBody = {
      data: {
        nome,
        email,
        cidade: city.id,
        estado: state.id,
      },
    };

    const { data } = await api.post("/pessoas", requestBody);

    return data;
  } catch (error: any) {
    const errorMessage = error?.response?.data.error.message;
    throw new Error(errorMessage);
  }
};

export const createState = async (value: { nome: string; sigla: string }) => {
  try {
    const requestBody = {
      data: {
        nome: value.nome,
        sigla: value.sigla,
      },
    };

    const { data } = await api.post("/estados", requestBody);

    return data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error?.response?.data;
    throw new Error(errorMessage);
  }
};

export const createCity = async (value: { nome: string; estadoId: number }) => {
  try {
    const requestBody = {
      data: {
        nome: value.nome,
        estado: value.estadoId,
      },
    };

    const { data } = await api.post("/cidades", requestBody);

    return data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error?.response?.data;
    throw new Error(errorMessage);
  }
};
