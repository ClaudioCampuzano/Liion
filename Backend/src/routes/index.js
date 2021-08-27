import { Router } from "express";
import { get_, post_, delete_, put_, testRoute, register} from "../controllers/index";
import { checkIsAuth } from '../middleware/guard'

const router = Router();

router.get("/", get_);

router.post("/", post_);

router.post("/register",register);

router.use('/protected',checkIsAuth)
router.post('/unprotected',testRoute)
router.post('/protected',  testRoute )

router.delete("/:id", delete_);

router.put("/:id", put_);




export default router;
