import { Router } from "express";
import SchemaController
from "@app/controllers/schema.controller";
import { authMiddleware } from "@app/middlewares/auth.middleware";


const router = Router();
router.use(authMiddleware);
router.post("/",SchemaController.createSchema);
router.get("/:projectId",SchemaController.getSchemas);
router.get("/detail/:schemaId",SchemaController.getSchemaById);
router.put("/:schemaId",SchemaController.updateSchema);
router.delete("/:schemaId",SchemaController.deleteSchema);

export default router;