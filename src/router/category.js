import express from "express";
import {
  CreateCategory,
  DeleteCategory,
  DetailCategory,
  GetCategory,
  UpdateCategory,
} from "../controller/category";
const router = express.Router();
router.get("/category", GetCategory);
router.get("/category/:id", DetailCategory);
router.post("/category", CreateCategory);
router.put("/category/:id", UpdateCategory);
router.delete("/category/:id", DeleteCategory);

export default router;
