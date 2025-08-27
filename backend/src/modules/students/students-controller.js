const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent, deleteStudent } = require("./students-service");
const { ApiError } = require("../../utils");

// get all students
const handleGetAllStudents = asyncHandler(async (req, res) => {
    const {page, limit, name, class: className, section, roll} = req.query;
    const students = await getAllStudents({ 
        page: page ? parseInt(page, 10) : 1, 
        limit: limit ? parseInt(limit, 10) : 10, 
        name, 
        className, 
        section, 
        roll: roll ? parseInt(roll) : undefined
    });
    res.json(students);
});

// post student
const handleAddStudent = asyncHandler(async (req, res) => {
    const payload = req.body;
    const message = await addNewStudent(payload);
    res.json(message);
});

// put student :id
const handleUpdateStudent = asyncHandler(async (req, res) => {
   const {id} = {...req.params};
   const payload = {...req.body, userId: id};
   try {
   await updateStudent(payload);
    res.status(200).json({ message: "Student updated successfully." });
   } catch (error) {
    throw new ApiError(500, "Unable to update student");
   } 
});

// get student :id
const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const student = await getStudentDetail(req.params.id);
    res.json(student);
});

// post student :id/status
const handleStudentStatus = asyncHandler(async (req, res) => {
    const payload = {...req.body, userId: req.params.id};
    const result = await setStudentStatus(payload);
    res.status(200).json(result);
});

const handleDeleteStudent = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const result = await deleteStudent(id);
    res.status(200).json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
    handleDeleteStudent
};
