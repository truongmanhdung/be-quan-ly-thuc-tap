import express from "express";
const router = express.Router();

import {
  insertStudent,
  listStudent,
  listStudentReviewCV,
  readOneStudent,
  removeStudent,
  updateReviewerStudent,
  updateStatusStudent,
  updateStudent,
} from "../controllers/student";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";
import student from "../models/student";
router.get("/student", listStudent);
router.get("/student/reviewcv", listStudentReviewCV);
router.get("/student/:id", readOneStudent);
router.post("/student", authorizeRoles("manager"), insertStudent);
router.patch("/student", authorizeRoles("manager"), updateReviewerStudent);
router.patch("/student/status", authorizeRoles("manager"), updateStatusStudent);
router.patch("/student/:id", authorizeRoles("manager"), updateStudent);
router.delete("/student/:id", authorizeRoles("manager"), removeStudent);
router.post("/generate-fake-data", () => {
  for (let i = 0; i <= 30; i++) {
    student.create({
      name: "Dương Điệp" + i,
      CV: "61c5d4d60e722e6436118598",
      studentCode: "Ok" + i,
      email: "Còn Hàng",
      address: "Ngô thừa ân",
      internshipIndustry: "Kì 6",
      phoneNumber: 4,
    });
  }
});
module.exports = router;
