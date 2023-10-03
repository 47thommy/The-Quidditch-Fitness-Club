const express = require("express");
const requireAuth = require("../middleWares/requireAuth");
const router = express.Router();
const {
  createWorkout,
  deleteWorkout,
  updateWorkout,
  getWorkout,
  getWorkouts,
} = require("../controllers/workoutControllers");
router.use(requireAuth);
router.get("/", getWorkouts);
router.get("/:id", getWorkout);

router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);
router.patch("/:id", updateWorkout);
module.exports = router;
