const {
    createUserHelper,
    getAllUsersHelper,
    changeUserStausHelper,
    changeUserCoursesHelper,
} = require("../helpers/user.helper");

const createUser = async (req, res) => {
    try {
        const { name, email, phone, password, gateYear, role, courses } = req.body;

        if (!phone || !password || !name || !email || !gateYear) {
            return res.status(400).json({ message: "Fill all the details" });
        }
        if (typeof phone !== "number" || phone.toString().length !== 10) {
            return res.status(400).json({ message: "Invalid phone number" });
        }
        if (typeof gateYear !== "number" || gateYear.toString().length !== 4) {
            return res.status(400).json({ message: "Invalid gate year" });
        }
        if (role && role !== "admin") {
            return res.status(400).json({ message: "Invalid role" });
        }
        if (typeof password !== "string" || password.length < 6) {
            return res.status(400).json({ message: "Invalid password" });
        }
        if (typeof name !== "string") {
            return res.status(400).json({ message: "Invalid name" });
        }
        if (typeof email !== "string") {
            return res.status(400).json({ message: "Invalid email" });
        }
        if (courses && !Array.isArray(courses)) return res.status(400).json({ message: "Invalid courses" });
        await createUserHelper({ name, email, phone, password, gateYear, role, courses });
        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "User creation failed", error: error.message });
        console.log(error);
    }
};


async function getAllUsers(req, res) {
    try {
        const { gateYear, isActive, courseId } = req.body;
        if (gateYear && (typeof gateYear !== "number" || gateYear.toString().length !== 4)) return res.status(400).json({ message: "Invalid gate year" });
        if (isActive && typeof isActive !== "boolean") return res.status(400).json({ message: "Invalid isActive" });
        if (courseId && typeof courseId !== "string") return res.status(400).json({ message: "Invalid courseId" });
        const users = await getAllUsersHelper({ gateYear, isActive, courseId });
        res.status(200).json({ message: "Users fetched successfully", data: users });
    } catch (error) {
        res.status(500).json({ message: "User creation failed", error: error.message });
        console.log(error);
    }
}


async function changeUserStatus(req, res) {
    try {
        const { userId, isActive } = req.body;
        if (typeof isActive !== "boolean") return res.status(400).json({ message: "Invalid isActive" });
        if (!userId || typeof userId !== "string") return res.status(400).json({ message: "Invalid userId" });
        await changeUserStausHelper({ userId, isActive });
        res.status(200).json({ message: "Users status changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "User status change failed", error: error.message });
        console.log(error);
    }
}



async function changeUserCourse(req, res) {
    try {
        const { userId, newCoursesArray } = req.body;
        if (!newCoursesArray) return res.status(400).json({ message: "Invalid newCoursesArray" });
        if (!userId || typeof userId !== "string") return res.status(400).json({ message: "Invalid userId" });
        await changeUserCoursesHelper({ userId, newCoursesArray });
        res.status(200).json({ message: "Users status changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "User status change failed", error: error.message });
        console.log(error);
    }
}


module.exports = { createUser, getAllUsers, changeUserStatus, changeUserCourse };

