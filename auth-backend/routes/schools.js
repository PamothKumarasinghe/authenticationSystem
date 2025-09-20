import express from 'express';
import { getSchools, assignSchool }  from '../controllers/schoolController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get("/", authMiddleware, getSchools); // when server receives a get request at /api/schools/,
                                            // it will first call the authMiddleware to check if the user is authenticated
                                            // if authenticated, it will call the getSchools function from controller
                                            
router.post("/assign", authMiddleware, assignSchool); // when server receives a post request at /api/schools/assign,
                                                      // it will first call the authMiddleware to check if the user is authenticated
                                                      // if authenticated, it will call the assignSchool function from controller
// only admin can add schools, not teachers (instructors)
// so we don't need a route to add schools here

export default router;