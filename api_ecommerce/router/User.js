import routerx from "express-promise-router"
import UserController from "../controllers/UserController"
import auth from "../middlewares/auth";

const router = routerx();

router.post("/register",UserController.register);
router.put("/update",UserController.update);
router.post("/login",UserController.login);
router.get("/list",auth.verifyAdmin,UserController.list);
router.delete("/delete",UserController.remove);

export default router;