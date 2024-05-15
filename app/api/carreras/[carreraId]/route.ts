
import{auth} from "@clerk/nextjs/server";
import {NextResponse} from "next/server"

import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}: {params:{carreraId:string}}
) {
    try{
        const {userId} = auth();
        const {carreraId} = params;
        const values = await req.json();

        if(!userId){
            return new NextResponse("Unautorized" ,{status:401});
        }

        const carrera = await db.carrera.update({
            where:{
                id: params.carreraId,
                userId
            },
            data:{
                ...values,
            }
        });
     return NextResponse.json(carrera);   
    }catch (error){
        console.log("[CARRERA_ID]",error);
        return new NextResponse("Internal Error",{status:500});
    }
}