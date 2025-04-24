const Course = require("../models/courses.model");
const Chapter = require("../models/chapters.model");
const Lecture = require("../models/lectures.model");
const { savePayloadToRedis, getPayloadFromRedis } = require("../utils/redis.util");

async function createCourseHelper({ name, description, image, code }) {
    const course = new Course({ name, description, image, code }); 
    await course.save();
}


async function createChapterHelper({ name, description, courseId }) {
    const chapter = new Chapter({ name, description, courseId }); 
    await chapter.save();
}


async function createLectureHelper({ name, description, chapterId, videoLink, pdfLink }) {
    // const videoLinkEmbed = convertToEmbedUrl(videoLink);
    const lectureObj = {
        name,
        description, 
        chapterId,
        videoLink,
        pdfLink,
    };
    const lecture = new Lecture(lectureObj); 
    await lecture.save();
}


const convertToEmbedUrl = (url) => {
    const videoId = url.split("/").pop(); // Extract video ID from the URL
    return `https://www.youtube.com/embed/${videoId}`;
};



async function getAllCoursesHelperForStudent({ coursesIdArray }) {
    const courses = await Course.find({ _id: { $in: coursesIdArray }, isActive: true }).lean();
    if (!courses || !courses.length) return [];
    return courses;
}

async function getCoursesListingForAdmin() {
    const courses = await Course.find({ isActive: true }).lean();
    if (!courses || !courses.length) return [];
    return courses;
}

async function getAllChaptersHelperForStudent({ courseId }) {
    let chapters = [];
    if (!courseId) return chapters;
    const cachedChapters = await getPayloadFromRedis({ key: courseId.toString(), keyType: "chapters" });
    if (cachedChapters) {
        chapters = JSON.parse(cachedChapters);
        return chapters;
    };
    chapters = await Chapter.find({ courseId, isActive: true }).sort({ createdAt: 1 }).lean();
    if (!chapters || !chapters.length) return [];
    await savePayloadToRedis({ key: courseId.toString(), keyType: "chapters", value: JSON.stringify(chapters), expireTime: 86400 });
    return chapters;
}

async function getAllLecturesHelperForStudent({ chapterId }) {
    let lectures = [];
    if (!chapterId) return lectures;
    const cachedLectures = await getPayloadFromRedis({ key: chapterId.toString(), keyType: "lectures" });
    if (cachedLectures) {
        lectures = JSON.parse(cachedLectures);
        return lectures;
    };
    lectures = await Lecture.find({ chapterId, isActive: true }).sort({ createdAt: 1 }).lean();
    if (!lectures || !lectures.length) return [];
    await savePayloadToRedis({ key: chapterId.toString(), keyType: "lectures", value: JSON.stringify(lectures), expireTime: 86400 });
    return lectures;
}



module.exports = {
    createLectureHelper,
    createChapterHelper,
    createCourseHelper,
    getAllChaptersHelperForStudent,
    getAllCoursesHelperForStudent,
    getAllLecturesHelperForStudent,
    getCoursesListingForAdmin,
}