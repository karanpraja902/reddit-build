'user server'

import { getUser } from "@/sanity/lib/user/getUser";
import { subredditType } from "@/sanity/schemaTypes/subredditType";
import { error } from "console";


export type ImageData={
    base64:string,
    filename:string;
    contentType:string;
}|null;

export async function creatCommunity(
    name:String,
    imageBase64:string|null|undefined,
    imageFilename:string|null|undefined,
    imageContentType:string|null|undefined,
    slug?:string,
    description?:string
){
    try{
        const user=await getUser();
        if("error" in user){
            return user.error
        }
        //Prepare image data if provided 
        let imageData:ImageData=null;
        if(imageBase64&&imageFilename&&imageContentType){
            imageData={
base64:imageBase64,
filename:imageFilename,
contentType:imageContentType
            }
        }
        const result=await createSubreddit(
            name,
            user._id,
            imageData,
            slug,
            description
        )
        return result;

    }catch(error){
        console.log("Error in createCommunity:", error);
        return{error:"Failed to create community"}
    }
}