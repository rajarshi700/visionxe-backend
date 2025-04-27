const {
    createCourseHelper,
    createChapterHelper,
    createLectureHelper,
    getAllChaptersHelperForStudent,
    getAllCoursesHelperForStudent,
    getAllLecturesHelperForStudent,
    createTestimonialHelper,
    getTestimonialsHelper,
    getAllAvailableCoursesForSaleHelper,
} = require("../helpers/course.helper");




async function createCourse(req, res) {
  try {
    const {
      name,
      description,
      image,
      code,
      oldPrice,
      newPrice,
      discount,
      discountValue,
      discountUnit,
      discountReason,
      features,
      instructor,
      demoVideoLink,
      fullStudyMaterialLink,
      classroomStudyMaterialLink,
      brochureDownloadLink
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !image ||
      !code ||
      !oldPrice ||
      !newPrice ||
      !discount ||
      !discountValue ||
      !discountUnit ||
      !discountReason ||
      !features || !Array.isArray(features) || features.length === 0 ||
      !instructor || typeof instructor !== "object" ||
      !instructor.name ||
      !instructor.profileImages || !Array.isArray(instructor.profileImages) || instructor.profileImages.length === 0 ||
      !instructor.highlights || !Array.isArray(instructor.highlights) || instructor.highlights.length === 0 ||
      !demoVideoLink ||
      !fullStudyMaterialLink ||
      !classroomStudyMaterialLink ||
      !brochureDownloadLink
    ) {
      return res.status(400).json({ message: "Fill all the required fields properly" });
    }

    // Type checking (basic)
    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      typeof image !== "string" ||
      typeof code !== "string" ||
      typeof oldPrice !== "string" ||
      typeof newPrice !== "string" ||
      typeof discount !== "string" ||
      typeof discountValue !== "string" ||
      typeof discountUnit !== "string" ||
      typeof discountReason !== "string" ||
      typeof demoVideoLink !== "string" ||
      typeof fullStudyMaterialLink !== "string" ||
      typeof classroomStudyMaterialLink !== "string" ||
      typeof brochureDownloadLink !== "string" ||
      typeof instructor.name !== "string"
    ) {
      return res.status(400).json({ message: "Invalid input types" });
    }

    // Calling helper
    await createCourseHelper({
      name,
      description,
      image,
      code,
      oldPrice,
      newPrice,
      discount,
      discountValue,
      discountUnit,
      discountReason,
      features,
      instructor,
      demoVideoLink,
      fullStudyMaterialLink,
      classroomStudyMaterialLink,
      brochureDownloadLink
    });

    res.status(200).json({ message: "Course created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Course creation failed", error: error.message });
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

async function getAllAvailableCoursesForSale(req, res) {
  try {
    const courses = await getAllAvailableCoursesForSaleHelper();
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




async function createTestimonial(req, res) {
  try {
    const { name, rank, college, phone, testimonial, profilePhoto, bannerImage } = req.body;
    if (!name || !rank || !college || !phone || !testimonial || !profilePhoto || !bannerImage)
      return res.status(400).json({ message: "Fill all the details" });
    if (
      typeof name !== "string" ||
      typeof rank !== "string" ||
      typeof college !== "string" ||
      typeof phone !== "string" ||
      typeof testimonial !== "string" ||
      typeof profilePhoto !== "string" ||
      typeof bannerImage !== "string"
    )
      return res.status(400).json({ message: "Invalid details" });
    await createTestimonialHelper({ name, rank, college, phone, testimonial, profilePhoto, bannerImage });
    res.status(200).json({ message: "testimonial created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "testimonial creation failed", error: error.message });
    console.log(error);
  }
}


async function getTestimonials(req, res) {
  try {
    const testimonials = await getTestimonialsHelper();
    res.status(200).json({ message: "testimonial fetched successfully",  testimonials });
  } catch (error) {
    res
      .status(500)
      .json({ message: "testimonial fetching failed", error: error.message });
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
  createTestimonial,
  getTestimonials,
  getAllAvailableCoursesForSale,
};

