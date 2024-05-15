"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm } from "react-hook-form";
import {ImageIcon, Pencil, PlusCircle} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import { Carrera } from "@prisma/client";
import { Image } from "next/image";

import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";




interface ImageFormProps {
    initialData: Carrera 
        carreraId: string;
    };


const formSchema = z.object({
    imagenUrl: z.string().min(1,{
        message: "Se requiere Imagen",
    }),
});

export const ImageForm = ({
    initialData,
    carreraId
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imagenUrl: initialData?.image || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;


    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        try{
            await axios.patch(`/api/carreras/${carreraId}`, values);
            toast.success("Carrera Actualizada");
            toggleEdit();
            router.refresh();
        }catch{
            toast.error("Algo salió mal");
        }
    }

    return(
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Imagen de la carrera
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.image && ( 
                      <>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Agregar una imagen
                      </>  
                    )}
                    {!isEditing && initialData.image && (
                        <>
                        <Pencil className="h-4 w-4 mr-2 "/>
                            Editar imagen
                        </>
                    )} 
                </Button>
            </div>
            {!isEditing && (
                !initialData.image ? (
                    <div className="flex items-center justify-center h-60
                    bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500"/>
                        </div>
                ) : (
                    <div className="relative aspect-video mt-2"> 
                        <Image 
                            alt ="Upload"
                            layout = "fill"
                            fill
                            className="object-cover rounded-md"
                            src= { initialData.image}
                        />
                    </div>
                )
            )}
            {isEditing &&(
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                        >
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) =>(
                                 <FormItem>
                                        <FormControl>
                                            <Textarea
                                                disabled={isSubmitting}
                                                placeholder="e.g 'Esta  carrera trata sobre...'"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                 </FormItem>
                                )}     
                            />
                            <div className="flex items-center gap-x-2">
                                <Button className="bg-blue-500 text-white"
                                  disabled={!isValid || isSubmitting}
                                  type="submit"
                                >
                                  Guardar
                                </Button>
                            </div>
                    </form>
                </Form>
            )}
        </div>
    )
}