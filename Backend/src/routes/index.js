import { Router } from "express";
import { get_, post_, delete_, put_, login_foward} from "../controllers/index";

const router = Router();

router.get("/", get_);

router.post("/", post_);
router.post('/login',login_foward)

router.delete("/:id", delete_);

router.put("/:id", put_);

export default router;
