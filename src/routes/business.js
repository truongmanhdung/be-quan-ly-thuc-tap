import express from "express";
import {
  createbusiness,
  getBusiness,
  insertBusiness,
  listBusiness,
  removeBusiness,
  updateBusiness,
  updateMany
} from "../controllers/businessController";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";
import { role } from "../utils/role";
const router = express.Router();

router.post("/business", isAuthenticateUser, authorizeRoles([role.manager]), insertBusiness);
router.post("/business/new", isAuthenticateUser, authorizeRoles([role.manager]), createbusiness);
router.get("/business", listBusiness);
router.delete("/business/:id",isAuthenticateUser, authorizeRoles([role.manager]),removeBusiness)
router.get("/business/:id",isAuthenticateUser, authorizeRoles([role.manager]),getBusiness)
router.patch("/business/:id",isAuthenticateUser, authorizeRoles([role.manager]),updateBusiness)
router.patch("/business",isAuthenticateUser, authorizeRoles([role.manager]), updateMany)


module.exports = router;
