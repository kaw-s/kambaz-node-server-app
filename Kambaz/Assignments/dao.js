import AssignmentModel from "./model.js";

export default function AssignmentsDao() {
  const findAllAssignments = async () => {
    return await AssignmentModel.find();
  };

  const findAssignmentsForCourse = async (courseId) => {
    return await AssignmentModel.find({ course: courseId });
  };

  const createAssignment = async (assignment) => {
    const newAssignment = new AssignmentModel(assignment);
    return await newAssignment.save();
  };

  const deleteAssignment = async (assignmentId) => {
    const result = await AssignmentModel.deleteOne({ _id: assignmentId });
    return { success: result.deletedCount > 0 };
  };

  const updateAssignment = async (assignmentId, updates) => {
    const result = await AssignmentModel.findByIdAndUpdate(
      assignmentId,
      updates,
      { new: true }
    );
    return { success: !!result, assignment: result };
  };

  return {
    findAllAssignments,
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}
