import express from 'express';
import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv'
import {removeBackground} from "@imgly/background-removal-node";
import uploads from './Middleware/upload.js';

const app = express();
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 5000;


app.post("/remove-bg",uploads.single("image"), async(req,res)=>{
    try {
        const  inputPath = req.file.path;
        const result = await removeBackground(inputPath);

        res.set("Content-Type","image/png");
        res.send(Buffer.from(await result.arrayBuffer()))
        fs.unlinkSync(inputPath);
    } catch (error) {
        console.log("Internal server Error",error)
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`);
})