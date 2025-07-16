import express from "express";
import {
  CreateTag,
  DeleteTag,
  DetailTag,
  GetTag,
  UpdateTag,
} from "../controller/tags";
const router = express.Router();
router.get("/tag", GetTag);
router.get("/tag/:id", DetailTag);
router.post("/tag", CreateTag);
router.put("/tag/:id", UpdateTag);
router.delete("/tag/:id", DeleteTag);

export default router;
