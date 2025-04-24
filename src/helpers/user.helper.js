const User = require("../models/users.model");
const Course = require("../models/courses.model");

async function createUserHelper({ name, email, phone, password, gateYear, role, courses }) {
    const courseData = await Course.find({ code: { $in: courses } }).lean();
    const newCourses = courseData.map((course) => {
        return { id: course._id, name: course.name };
    });
    const userObj = {
        name,
        email,
        phone,
        password,
        gateYear,
        courses: newCourses,
    }
    if(role){
        userObj.role = role
    }
    const user = new User(userObj); 
    await user.save();
}


async function getAllUsersHelper({ gateYear, isActive, courseId }) {
    const findQuery = { role: "student" };
    if(gateYear) findQuery.gateYear = gateYear;
    if(isActive) findQuery.isActive = isActive;
    if(courseId) findQuery["courses.id"] = courseId;
    const users = await User.find(findQuery).lean();
    return users;
}

async function changeUserStausHelper({ userId, isActive }) {
    const findQuery = { _id: userId };
    await User.updateOne(findQuery, { $set: { isActive } });
}

async function changeUserCoursesHelper({ userId, newCoursesArray }) {
    validateNewCoursesArray(newCoursesArray);
    const courseData = await Course.find({ code: { $in: newCoursesArray } }).lean();
    const newCourses = courseData.map((course) => {
        return { id: course._id, name: course.name };
    });
    await User.updateOne(
        { _id: userId }, // Find the user by ID
        {
            $set: {
                courses: newCourses // Replace the entire courses array
            }
        }
    );
}

function validateNewCoursesArray(newCoursesArray) {
    if (!Array.isArray(newCoursesArray)) {
      throw new Error('newCoursesArray must be an array');
    }
}


module.exports = {
    createUserHelper,
    getAllUsersHelper,
    changeUserStausHelper,
    changeUserCoursesHelper,
}