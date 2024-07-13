import express from 'express';
import { PORT } from '@app/config/config';

//routes
import authRoutes from "@app/routes/auth.route";
import projectRoutes from '@app/routes/project.route';

export function startServer(){
    
    const app = express();

    //register middlewares
    app.use(express.json());


    //register routes
    app.use("/auth",authRoutes);
    app.use("/project",projectRoutes);


    app.listen(PORT,()=>{
        console.info("Server started at port ",PORT);
    })

}