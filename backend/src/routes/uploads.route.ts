import { Url } from '@app/config/config';
import { generateSuccessResponse } from '@app/utils/response';
import {Router} from 'express';
import multer from 'multer';

const router = Router();

const upload = multer({
    dest:"uploads/",
    limits:{
        fileSize:8 * 1024 *1024 * 20 //20MB
    },
});

router.post("/image",upload.single("image"),(req,res)=>{
    const imageUrl = `http://${Url}/uploads/${req.file?.filename}`;
    generateSuccessResponse(res,imageUrl,201);
});

export default router;