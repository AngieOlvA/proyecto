"use client";

import * as z from "zod";
import axios from "axios";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import{
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { title } from "process";


const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",

    }),
});

const CreatePage  = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title:""
        }
    });

    const { isSubmitting, isValid} = form.formState;

    const onSubmit =  async (values: z.infer<typeof formSchema>) =>{
        try {
            const response = await axios.post("/api/carreras",values);
            router.push(`/administrator/carreras/${response.data.id}`);
        } catch {
            toast.error("Algo salio mal");
        }
    }
    
    return (
        <div  className="max-w-5xl mx-auto flex md:items-center
        md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Nombre de tu Carrera
                </h1>
                <p className="text-sm text-slate-600">
                ¿Cómo te gustaría nombrar tu carrera? No te preocupes, 
                puedes cambiar esto más tarde.
                </p>
                <Form {...form}>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                    >
                        <FormField
                        control={form.control}
                            name="title"
                            render={({field}) =>(
                                <FormItem>
                                    <FormLabel>
                                        Titulo de la carrera
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Advanced web 
                                        development'"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course?
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>

                        )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Link href="/">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    Cancelar
                                </Button>
                            </Link>
                            <Button
                                className="bg-blue-500 text-white"
                                type="submit"
                                disabled={!isValid || isSubmitting}

                            >
                                Continuar
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            
        </div>
    );
}
 
export default CreatePage ;