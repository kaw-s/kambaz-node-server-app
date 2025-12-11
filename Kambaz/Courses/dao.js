import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import enrollmentsModel from "../Enrollments/model.js";

export default function CoursesDao(db) {
  function findAllCourses() {
    return model.find({}, { name: 1, description: 1 });
  }
  async function findCoursesForEnrolledUser(userId) {
    const enrollments = await enrollmentsModel.find();
    console.log(enrollments);
    const courses = await model.find({}, { name: 1, description: 1 });
    console.log(courses);
    const enrolledCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  }

  // function findCoursesForEnrolledUser(userId) {
  //   const { courses, enrollments } = db;
  //   const enrolledCourses = courses.filter((course) =>
  //     enrollments.some(
  //       (enrollment) =>
  //         enrollment.user === userId && enrollment.course === course._id
  //     )
  //   );
  //   return enrolledCourses;
  // }
  async function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    console.log("Creating course:", newCourse);
    const result = await model.create(newCourse);
    console.log("Created course result:", result);
    return result;
  }
  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }

  function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
