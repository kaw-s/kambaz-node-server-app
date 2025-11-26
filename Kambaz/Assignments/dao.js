import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  const findAllAssignments = () => {
    return db.assignments;
  };

  const findAssignmentsForCourse = (courseId) => {
    return db.assignments.filter(
      (assignment) => assignment.course === courseId
    );
  };

  const createAssignment = (assignment) => {
    const newAssignment = {
      ...assignment,
      _id: uuidv4(),
    };
    db.assignments.push(newAssignment);
    return newAssignment;
  };

  const deleteAssignment = (assignmentId) => {
    const index = db.assignments.findIndex((a) => a._id === assignmentId);
    if (index !== -1) {
      db.assignments.splice(index, 1);
      return { success: true };
    }
    return { success: false };
  };

  const updateAssignment = (assignmentId, updates) => {
    const assignment = db.assignments.find((a) => a._id === assignmentId);
    if (assignment) {
      Object.assign(assignment, updates);
      return { success: true };
    }
    return { success: false };
  };

  return {
    findAllAssignments,
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
