import { Noto_Kufi_Arabic } from "next/font/google";
import { IUser, PartialUser } from "./types";
import Database from "better-sqlite3";
const db = new Database("auth.db")

export const addUser = (user:PartialUser):Database.RunResult=> {
    return db.prepare(`
        INSERT INTO users(id, name, surname, login, password)
        VALUES(@id, @name, @surname, @login, @password)
        `).run(user)

}

export const getAllUsers = ():IUser[] => {
    return db.prepare("SELECT * from users").all() as IUser[]
}

export const getUserByLogin = (login:string | undefined):IUser|null => {
    let result = db.prepare(`
        SELECT * FROM users WHERE login =?
        `).get(login)
        if(!result){
            return null
        }
        return result as IUser
    
}

