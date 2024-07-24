"use server"

import { InputUser, PartialUser } from "./types"
import bcrypt from "bcrypt"
import { nanoid } from "nanoid"
import { addUser, getUserByLogin } from "./api"
import { handlePassword } from "./utils"
import { redirect } from "next/navigation"




export const handleSignup = async (prev:unknown, data:FormData) => {
    let user:PartialUser = {
        id:nanoid(),
        name:data.get("name") as string,
        surname:data.get("surname") as string,
        login:data.get("login") as string  ,
        password:data.get("password") as string

    }
    if( getUserByLogin(user.login)){
         return {
            message:"Cannot signup with this login"
         } 

    }

    if(!handlePassword(user.password)){
       
        return {
            message:"password must be 6 characters 1uppercase 1 lowercase 1 digit and 1 characters"
        }
    }
    
    
   

    if(user.password){
 
         user.password = await bcrypt.hash(user.password, 10)
    }
    const result = addUser(user)
   
    redirect("/login")

}

export const handlelogin = async (prev:unknown,data:FormData) =>{

    const login  = data.get("login") as string
    const password = data.get("password") as string
    if( !login || !password){
        return {
            message:"Please fill all fields"
        }
    }

   

   const user = getUserByLogin(login)
   if(!user){
    return {
        message:"Such user doesnt exist"
    }
   }

   const comparePassword= await bcrypt.compare(password, user.password)
   if(!comparePassword){
    return {
        message:"Password is incorrect"
    }
   }

   redirect("/profile")


}