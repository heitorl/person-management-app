"use client";

import { useEffect, useState } from "react";
import { api } from "../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPersonAction } from "../_actions/createPersonAction";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

type State = {
  id?: number;
  nome: string;
  sigla: string;
};

type PersonFormProps = {
  states: State[];
};

export type Person = {
  nome: string;
  email: string;
  cidade: string;
  estado: State;
};

type FormSchema = z.infer<typeof PersonSchema>;

export const PersonSchema = z.object({
  id: z.number().optional(),
  nome: z.string().trim().min(1, { message: "O nome é obrigatório" }).max(250),
  email: z.string().email({ message: "O email é obrigatório" }),
  estado: z.object({
    sigla: z.string(),
    nome: z.string(),
  }),
  cidade: z.string().min(1, { message: "A cidade é obrigatória" }),
});

const PersonForm = ({ states }: PersonFormProps) => {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(PersonSchema),
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      const { data: person } = await createPersonAction(values);

      const personId = person.documentId;
      router.push(`/pessoa/${personId}`);
    } catch (error) {
      const errorMessage =
        (error as Error).message || "Ocorreu um erro inesperado";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        const { data } = await api.get(`/cidades`, {
          headers: { estado: selectedState.sigla },
        });
        setCities(data);
        setSelectedCity(data[0] || "");
        setValue("cidade", data[0] || "");
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedState, setValue]);

  return (
    <div className="bg-white px-10 py-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-left">
        Adicionar Pessoa
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="block text-gray-700 font-medium ">Nome</label>
          <input
            {...register("nome")}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#484dff]"
            type="text"
            placeholder="Digite o nome"
          />
          {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
        </div>

        <div>
          <label className="block text-gray-700 font-medium ">Email</label>
          <input
            {...register("email")}
            className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#484dff]"
            type="email"
            placeholder="Digite seu email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col mt-0">
          <label className="block text-gray-700 font-medium ">Estado</label>
          <select
            className="custom-scrollbar bg-transparent w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#484dff]"
            value={selectedState?.sigla || ""}
            onChange={(e) => {
              const state =
                states.find((s) => s.sigla === e.target.value) || null;
              setSelectedState(state);
              setValue("estado", {
                nome: state?.nome || "",
                sigla: state?.sigla || "",
              });
            }}
          >
            <option value="">Selecione um estado</option>
            {states.map((state) => (
              <option key={state.sigla} value={state.sigla}>
                {state.nome}
              </option>
            ))}
          </select>
          {errors.estado && (
            <p className="text-red-500">{errors.estado.message}</p>
          )}
        </div>

        <div className="flex flex-col w-4/5 mt-0">
          <label className="block text-gray-700 font-medium ">Cidade</label>
          <select
            {...register("cidade")}
            className={`w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#484dff] ${
              selectedState ? "bg-transparent" : "bg-gray-200"
            }`}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">
              {selectedState
                ? "Selecione uma cidade"
                : "Escolha um estado primeiro"}
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.cidade && (
            <p className="text-red-500">{errors.cidade.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#484dff] text-white font-bold py-2 rounded-lg flex justify-center items-center gap-1.5"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2Icon className="animate-spin" size={22} />}
          {isSubmitting ? "Enviando..." : "Adicionar"}
        </button>
      </form>
    </div>
  );
};

export default PersonForm;
