import { Request, Response } from "express";
import { logger } from "../../app";
import User from "./authModel";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/standardReponse";
import { createFirebaseUser, pollEmailVerification } from "../../utils/firebase";
import bcrypt from 'bcrypt';
export async function registerController(req:Request, res:Response){
    console.log("reached!");
    let {email, password} = req.body;
    try{
        //check if user exsists
        const ifExists = await User.find({email: email});

        //if user exists, send res of user exists
        if(ifExists.length > 0){
            sendErrorResponse(res, 409, 'User already exists');
        }

        // hashing the password
        password = await bcrypt.hash(password, 10);

        //creating a user on firebase and sending email
        const firebaseUser = await createFirebaseUser(email, password);

        //verifying the email
        const verified = await pollEmailVerification(firebaseUser, 10, 20);
        
        //on verifying, save the user to database
        if(verified){
            const newUser = new User({email: email, password: password});
            newUser.save();
            sendSuccessResponse(res, 200, 'User registered successfully', newUser);
        } else{
            sendErrorResponse(res, 500, '', "failed to register user");
        }

    } catch(err){
        logger.error("Error registering  user with error message:" + err);
        sendErrorResponse(res, 500, '', err);
    }
}