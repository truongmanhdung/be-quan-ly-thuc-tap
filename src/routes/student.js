import express from "express";
const router = express.Router();

import {
  insertStudent,
  listStudent,
  listStudentReviewCV,
  listStudentReviewForm,
  readOneStudent,
  removeStudent,
  updateReviewerStudent,
  updateStatusStudent,
  updateStudent,
  listStudentReviewReport,
} from "../controllers/student";
import student from "../models/student";
router.get("/student", listStudent);
router.get("/student/reviewform", listStudentReviewForm);
router.get("/student/reviewcv", listStudentReviewCV);
router.get("/student/reviewreport", listStudentReviewReport);
router.get("/student/:id", readOneStudent);
router.post("/student", insertStudent);
router.patch("/student", updateReviewerStudent);
router.patch("/student/status", updateStatusStudent);
router.patch("/student/:id", updateStudent);
router.delete("/student/:id", removeStudent);
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
