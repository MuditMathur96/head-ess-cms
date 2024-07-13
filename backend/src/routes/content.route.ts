import ContentController from "@app/controllers/content.controller";
import { authMiddleware } from "@app/middlewares/auth.middleware";
import { Router } from "express";


const router = Router();
router.use(authMiddleware);
router.post("/",ContentController.createContent);
router.get("/",ContentController.getContents);
router.get("/:contentId",ContentController.getContentById);
router.put("/:contentId",ContentController.updateContent);
router.delete("/:contentId",ContentController.deleteContent);

export default router;