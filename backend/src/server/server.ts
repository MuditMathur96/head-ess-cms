import express from 'express';
import { PORT } from '@app/config/config';
import morgan from 'morgan';
import cors from 'cors';

//routes
import authRoutes from "@app/routes/auth.route";
import projectRoutes from '@app/routes/project.route';
import contentRoutes from '@app/routes/content.route';
import uploadRoutes from '@app/routes/uploads.route';
import schemaRoutes from '@app/routes/schema.route';
import { CompressionStream } from 'node:stream/web';

export function startServer(){
    
    const app = express();

    //register middlewares
    app.use(cors());
    app.use(express.json());
    app.use(morgan("dev"))


    //register routes
    app.use("/api/v1/auth",authRoutes);
    app.use("/api/v1/project",projectRoutes);
    app.use("/api/v1/content",contentRoutes);
    app.use("/api/v1/uploads",uploadRoutes);
    app.use("/api/v1/schema",schemaRoutes);
    app.use("/uploads",express.static("uploads"));

    app.listen(PORT,()=>{
        console.info("Server started at port ",PORT);
    })

}