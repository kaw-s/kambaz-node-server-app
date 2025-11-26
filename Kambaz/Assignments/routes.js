import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAllAssignments = (req, res) => {
    const assignments = dao.findAllAssignments();
    res.send(assignments);
  };

  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const createAssignment = (req, res) => {
    const newAssignment = dao.createAssignment(req.body);
    res.json(newAssignment);
  };

  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.send(status);
  };

  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = dao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  };

  app.put("/api/assignments/:assignmentId", updateAssignment);

  app.delete("/api/assignments/:assignmentId", deleteAssignment);

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);

  app.get("/api/assignments", findAllAssignments);
}
