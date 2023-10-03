import { createImage, deleteImage, listImages } from "../controllers/imageController";
import { Router } from "express";
import {v4 as uuidv4} from 'uuid'
import multer from 'multer'
import { mkdir } from "fs";

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        mkdir('uploads/', ()=>{})
        cb(null, 'uploads/'); //Define diretorio para armazenar imagens
    },
    filename:(req, file, cb) => {
        const ext = file.originalname.split('.')[1]
        const filename = uuidv4() + '--' + file.originalname + '--' + Date.now() + "." + ext;
        cb(null, filename)
    },
});

//DIMINUIR TAMANHO DO ARQUIVO, fileSize está em bytes
const upload = multer ({storage,limits:{fileSize:20000000}, fileFilter(req, file, callback) {
    const ext = file.originalname.split('.')[1]
    callback(null, ext == "pdf" || ext == "png")
},})

const imageRoutes = Router()

imageRoutes.post("/teste", upload.single("teste"), createImage)
imageRoutes.delete("/teste/:id", deleteImage);
imageRoutes.get("/teste/images/list", listImages)

export default imageRoutes
