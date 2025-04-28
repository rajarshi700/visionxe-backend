const express = require('express');
const router = express.Router();

const { authenticate, isAdmin, deviceAuthCheck } = require('../middlewares/auth.middleware');
const {
    createUser,
    getAllUsers,
    changeUserStatus,
    changeUserCourse,
} = require("../controllers/user.controller");
const {
    sendOtp,
    ValidateOtpAndLogin,
} = require("../controllers/login.controller");
const {
    createCourse,
    createChapter,
    createLecture,
    getAllCourses,
    getAllChapters,
    getAllLectures,
    createTestimonial,
    getTestimonials,
    getAllAvailableCoursesForSale,
} = require("../controllers/course.controller");

const { flushRedisController } = require("../controllers/miscellaneous.controller");


// ---------------------- Health Check --------------------------------------------------------------------
router.get('/health-check', (req, res) => {
    res.json({ message: 'Server is up and running' });
});




// ---------------------- Admin-only Routes ---------------------------------------------------------------------

// User management
router.post('/create', authenticate, isAdmin, createUser);
router.post('/users', authenticate, isAdmin, getAllUsers);
router.post('/change-user-status', authenticate, isAdmin, changeUserStatus);
router.post('/change-user-course', authenticate, isAdmin, changeUserCourse);
router.post('/flush-redis', authenticate, isAdmin, flushRedisController);

// Course management
router.post('/create-course', authenticate, isAdmin, createCourse);
router.post('/create-chapter', authenticate, isAdmin, createChapter);
router.post('/create-lecture', authenticate, isAdmin, createLecture);

// Testimonial management
router.post('/create-testimonial', authenticate, isAdmin, createTestimonial);



// ---------------------- Public/User Routes ------------------------------------------------------------------------
// testimonials
router.get('/testimonials', getTestimonials);
router.get('/courses', getAllAvailableCoursesForSale);
// 2 factor Auth
router.post('/login', sendOtp);
router.post('/validate-otp', ValidateOtpAndLogin);

// Course content (protected)
router.post('/courses', authenticate, deviceAuthCheck, getAllCourses);
router.post('/chapters', authenticate, deviceAuthCheck, getAllChapters);
router.post('/lectures', authenticate, deviceAuthCheck, getAllLectures);

module.exports = router;
