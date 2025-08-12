import { sanityFetch} from "../live";
    import {defineQuery} from "groq";
    import { currentUser} from "@clerk/nextjs/server";
import { userAgent } from "next/server";
import { addUser } from "./addUser";
    interface UserResult {
    _id: string;
    username: string;
    imageUrl: string;
    email: string;
    }
    const parseUsernmae=(username:string)=>{
        //remove whitespaces and convert camel case to avoid conflicts
        const randomNum=Math.floor(1000+Math.random()*9000)
        //add camel case to white spaces add random number to avoid conflicts
        return(
            username
            .replace(/\s+(.)/g,(_,char)=>char.toUpperCase())//convert whitespace to cameCase
            .replace(/\s+/g,"")+randomNum//remove all whitespaces and add random number
        )
    }
    export async function getUser(): Promise<UserResult |{ error: string}>{
        try{
            console.log("Getting current user from Clerk");
            const loggedInUser=await currentUser();
            if(!loggedInUser){
                console.log("no user logged in");
                return {error:"User not found"};
            }
            console.log(`Found Clerk user: ${loggedInUser.id}`);
// Check if user exists in the database first
const getExistingUserQuery=defineQuery(
`*[_type = "user" &&_id = $id] [0]`);
console.log("Checking if user exists in Sanity database");
const existingUser= await sanityFetch({
query: getExistingUserQuery,
params: (id: loggedInUser.id),
});
if(existingUser.data?._id){
    console.log(`User found in database with ID:${existingUser.data._d}`)
    const user={
        _id:existingUser.data._id,
        username:existingUser.data.username!,
        imageUrl:existingUser.data.imageUrl!,
        email:existingUser.data.email!,
    };
    return user;
}
console.log("User not found in database, creating new user")
const newUser= await addUser({
    id:loggedInUser.id,
    username:parseUsername(loggedInUser.fullName),
    email:loggedInUser.primaryEmailAddress?.emailAddress||loggedInUser.emailAddresses[0].emailAddress,
    imageUrl:loggedInUser.imageUrl,
});
        }catch(error){

        }
    }