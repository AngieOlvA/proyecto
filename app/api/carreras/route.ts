import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

 import { db } from "@/lib/db";

export async function POST(
    req: Request,
){
    try{
        const {userId} = auth();
        const {title} = await req.json();

        if (!userId){
            return new NextResponse("Unautorized",{status: 401});
        }

        const carrera = await db.carrera.create({
            data: {
                userId,
                title,
            }
        });
        return NextResponse.json(carrera); 
    } catch (error) {
        console.log("[CARRERAS]",error);
        return new NextResponse("Internal Error ",{status:500});
    }
}