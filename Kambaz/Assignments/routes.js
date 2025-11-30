import AssignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  const dao = AssignmentsDao();

  const findAllAssignments = async (req, res) => {
    try {
      const assignments = await dao.findAllAssignments();
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const findAssignmentsForCourse = async (req, res) => {
    try {
      const { courseId } = req.params;
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const createAssignment = async (req, res) => {
    try {
      const newAssignment = await dao.createAssignment(req.body);
      res.json(newAssignment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const status = await dao.deleteAssignment(assignmentId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateAssignment = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const assignmentUpdates = req.body;
      const status = await dao.updateAssignment(
        assignmentId,
        assignmentUpdates
      );
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.get("/api/assignments", findAllAssignments);
}
