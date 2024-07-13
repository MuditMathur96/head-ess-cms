import ProjectController from "@app/controllers/project.controller";
import { authMiddleware } from "@app/middlewares/auth.middleware";
import { Router } from "express";

const router = Router();
router.use(authMiddleware)
router.post("/",ProjectController.createProject);
router.get("/",ProjectController.getProjects);
router.get("/:projectId",ProjectController.getProjectById);
router.put("/:projectId",ProjectController.updateProject);
router.delete("/:projectId",ProjectController.deleteProject);

export default router;