import { Router } from "express";

import usersRoutes from "./index.js";

const router = Router({mergeParams: true});

router.get("/", (req, res) => {
   res.send("Users Home Page");
});

export default router;
