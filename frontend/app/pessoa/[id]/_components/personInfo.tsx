import { api } from "@/app/api";

type PersonInfoProps = {
  id: string;
};

const PersonInfo = async ({ id }: PersonInfoProps) => {
  const { data } = await api(`/pessoas/${id}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const person = data.data;

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex-1 p-2 flex justify-between">
        <span className="font-bold text-md">Nome:</span>
        <span>{person.nome}</span>
      </div>
      <div className="flex-1 p-2 flex justify-between">
        <span className="font-bold text-md">Email:</span>
        <span>{person.email}</span>
      </div>
      <div className="flex-1 p-2 flex justify-between">
        <span className="font-bold text-md">Estado:</span>
        <span>{person.estado.nome}</span>
      </div>
      <div className="flex-1 p-2 flex justify-between">
        <span className="font-bold text-md">Cidade:</span>
        <span>{person.cidade.nome}</span>
      </div>
    </div>
  );
};

export default PersonInfo;
