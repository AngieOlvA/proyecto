import { auth} from "@clerk/nextjs/server";
import { redirect} from "next/navigation";
import { LayoutDashboard } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";

import { TtitleForm } from "./_components/title-form";

import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";



const CarreraIdPage = async ({
    params
}: {
    params : {carreraId: string}    
}) => {
    const {userId} = auth();

    if (!userId){
        return redirect("/");
    }



    const carrera = await db.carrera.findUnique({
        where :{
            id:params.carreraId
        }
    });

    if (!carrera){
        return redirect("/");
    }


    const requiredFields = [
        carrera.title,
        carrera.description,
        carrera.image,
        carrera.price,
        carrera.categoryId
    ];

    const totalFields = requiredFields.length;
    const compeltedFields = requiredFields.filter(Boolean).length;

    const completionText = `(${compeltedFields}/${totalFields})`

    return (
        <div className="p-6">
            <div className=" flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">
                        Configuracion de la carrera
                    </h1>
                    <span className="text-sm text-slate-700">
                        Completar todos los campos{completionText}
                    </span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge  icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            Personaliza tu carrera
                        </h2>
                    </div>
                    <TtitleForm
                        initialData={carrera}
                        carreraId={carrera.id}
                    />
                    <DescriptionForm
                        initialData={carrera}
                        carreraId={carrera.id} description={""}                    />
                    <ImageForm
                        initialData={carrera}
                        carreraId={carrera.id}
                    />
                </div>
            </div>
        </div>
      );
}
 
export default CarreraIdPage;