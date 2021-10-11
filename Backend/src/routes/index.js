import { Router } from "express";
import { register, recoverEmail, getUserData} from "../controllers/index";
import { checkIsAuth } from "../middleware/guard";

const router = Router();

router.post("/register", register);

router.use("/protected", checkIsAuth);

router.post("/getuserdata", checkIsAuth, getUserData)

export default router;
