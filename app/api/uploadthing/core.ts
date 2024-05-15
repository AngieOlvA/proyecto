import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuthn = () => {
    const {userId} = auth(); 
    if (!userId) throw new Error("Unautorized");
    return{userId};
} 
 
export const ourFileRouter = {
  carreraImage : f({image: {maxFileSize: "4MB", maxFileCount: 1} })
  .middleware(() => handleAuthn())
  .onUploadComplete(() => {}),
 courseAttachment: f(["text","image", "video", "audio", "pdf"])
 .middleware(() => handleAuthn())
 .onUploadComplete(() =>{}),
 chapterVideo: f({video:{maxFileCount:1, maxFileSize:"512GB"} })
 .middleware(()=> handleAuthn())
 .onUploadComplete(()=>{})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;