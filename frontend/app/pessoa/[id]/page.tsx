import Image from "next/image";
import { Suspense } from "react";
import PersonInfo from "./_components/personInfo";
import Loading from "./_components/loading";

type PersonPageProps = {
  params: {
    id: string;
  };
};

const PersonDetail = async ({ params }: PersonPageProps) => {
  const { id } = await params;

  return (
    <div className="h-screen flex w-full justify-center items-center">
      <div className="p-10 flex shadow-md bg-slate-100 flex-col min-w-[420px] ">
        <h2 className="text-xl font-bold mb-4 text-left">
          Informações da Pessoa
        </h2>
        <Suspense fallback={<Loading />}>
          <div className="w-full flex justify-center p-4">
            <Image
              src="https://github.com/shadcn.png"
              alt="imagem-pessoa"
              height={100}
              width={100}
              className="rounded-full"
            />
          </div>

          <div className="flex w-full flex-col pt-6">
            <PersonInfo id={id} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default PersonDetail;
