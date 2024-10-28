import PersonForm from "@/app/_components/PersonForm";
import { api } from "@/app/api";

const AddPerson = async () => {
  const response = await api.get("estados-selecao");
  const states = response.data;

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <PersonForm states={states} />
    </div>
  );
};

export default AddPerson;
