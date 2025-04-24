const {
    createCourseHelper,
    createChapterHelper,
    createLectureHelper,
    getAllChaptersHelperForStudent,
    getAllCoursesHelperForStudent,
    getAllLecturesHelperForStudent
} = require("../helpers/course.helper");




async function createCourse(req, res) {
  try {
    const { name, description, image, code } = req.body;
    if (!name || !description || !image || !code)
      return res.status(400).json({ message: "Fill all the details" });
    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof image !== "string" ||
      typeof code !== "string"
    )
      return res.status(400).json({ message: "Invalid details" });
    await createCourseHelper({ name, description, image, code });
    res.status(200).json({ message: "course created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "course creation failed", error: error.message });
    console.log(error);
  }
}




async function createChapter(req, res) {
  try {
    const { name, description, courseId } = req.body;
    if (!name || !description || !courseId)
      return res.status(400).json({ message: "Fill all the details" });
    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof courseId !== "string"
    )
      return res.status(400).json({ message: "Invalid details" });
    await createChapterHelper({ name, description, courseId });
    res.status(200).json({ message: "chapter created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "chapter creation failed", error: error.message });
    console.log(error);
  }
}




async function createLecture(req, res) {
  try {
    const { name, description, chapterId, videoLink, pdfLink } = req.body;
    if (!name || !description || !chapterId || !videoLink || !pdfLink)
      return res.status(400).json({ message: "Fill all the details" });
    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof chapterId !== "string" ||
      typeof videoLink !== "string" ||
      typeof pdfLink !== "string"
    )
      return res.status(400).json({ message: "Invalid details" });
    await createLectureHelper({ name, description, chapterId, videoLink, pdfLink });
    res.status(200).json({ message: "lecture created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "lecture creation failed", error: error.message });
    console.log(error);
  }
}



async function getAllCourses(req, res) {
  try {
    const { coursesIdArray = [] } = req.user;
    if (!coursesIdArray.length)
      return res.status(400).json({ message: "Please subscribe to a course" });
    const courses = await getAllCoursesHelperForStudent({ coursesIdArray });
    res.status(200).json({ courses, message: "courses fetched successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "courses fetching failed", error: error.message });
    console.log(error);
  }
}



async function getAllChapters(req, res) {
  try {
    const { courseId } = req.body;
    if (!courseId)
      return res.status(400).json({ message: "CourseId is required" });
    const chapters = await getAllChaptersHelperForStudent({ courseId });
    res.status(200).json({ chapters, message: "Chapters fetched successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Chapters fetching failed", error: error.message });
    console.log(error);
  }
}

async function getAllLectures(req, res) {
  try {
    const { chapterId } = req.body;
    if (!chapterId)
      return res.status(400).json({ message: "ChapterId is required" });
    const lectures = await getAllLecturesHelperForStudent({ chapterId });
    res.status(200).json({ lectures, message: "Lectures fetched successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lectures fetching failed", error: error.message });
    console.log(error);
  }
}



module.exports = {
  createCourse,
  createChapter,
  createLecture,
  getAllCourses,
  getAllChapters,
  getAllLectures,
};

