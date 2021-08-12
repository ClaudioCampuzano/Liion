import { Router } from "express";
import { get_, post_, delete_, put_ } from "../controllers/index";

const router = Router();

router.get("/", get_);

router.post("/", post_);

router.delete("/:id", delete_);

router.put("/:id", put_);

export default router;
