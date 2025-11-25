import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()
import Database from '../../config/dbConn'
import { Request, Response } from 'express'
import {usersTable} from '../db/schema'


export const authenticateUser = async (req: Request, res: Response) => {
    const {email, password} = req.body
    const db = Database.getInstance().getDB()

    const dbResult = await db.select().from(usersTable)


    if(dbResult) {
        const isPassCorrect = await bcrypt.compare(String(password), dbResult[0].password)
        if(isPassCorrect) {
            const token = jwt.sign({name: dbResult[0].name, email: dbResult[0].email}, process.env.JWT_SECRET!)
            return res.status(200).json({message: "Logged in successfully...", token})
        } else {
            return res.status(401).json({message: "Username or password incorrect..."})
        }
        
    } else {
        return res.status(401).json({message: "Username or password incorrect..."})
    }
}



export const createUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body
    const db = Database.getInstance().getDB()

    if(!name || !email || !password) {
        return res.status(400).json({message: "All fields are required..."})
    }

    const user: typeof usersTable.$inferInsert = {
        name,
        email,
        password: await bcrypt.hash(password, 10)
    }

    const insertUser = await db.insert(usersTable).values(user)
    
    if(insertUser) {
        const token = jwt.sign({name: name, email: email}, process.env.JWT_SECRET!)
        return res.status(200).json({message: "User created successfully...", token})
    } else {
        return res.status(500).json({message: "Error occurred while creating user..."})
    }

    
}


