# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Thanks! Based on the updated requirements, here's what we’ll enhance:

---

## ✅ Updated Features Breakdown

### Teacher Rules:

* Can only have **max 5 subjects**.
* Can **remove students** from their assigned courses.
* If `role = "admin"` → **Superadmin**, has full permissions.

### Course Rules:

* Each course (subject) can have **maximum 30 students**.

### Student Rules:

* Can **enroll** and **withdraw** from courses.

### Admin Rules:

* Can **assign subjects** to teachers.
* Only Admin/Superadmin can assign courses to teachers.

---

## 🛠️ Updated Mongoose Models

### 🔁 `Teacher.js`

```js
const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: String,
  role: { type: String, default: "teacher" }, // "teacher" or "admin"
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model("Teacher", teacherSchema);
```

---

## 📜 Enhanced Course Controller

### ✅ Enroll with Max Limit:

```js
exports.enrollStudent = async (req, res) => {
  const { studentId } = req.body;
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate("students");
  if (course.students.length >= 30) {
    return res.status(400).json({ message: "Course has reached 30 student limit" });
  }

  const student = await Student.findById(studentId);
  if (!student.enrolledCourses.includes(courseId)) {
    course.students.push(student._id);
    student.enrolledCourses.push(course._id);
    await course.save();
    await student.save();
  }

  res.json({ message: "Student enrolled successfully" });
};
```

---

### 🔄 Withdraw Student

```js
exports.withdrawStudent = async (req, res) => {
  const { studentId } = req.body;
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  const student = await Student.findById(studentId);

  course.students = course.students.filter(id => id.toString() !== studentId);
  student.enrolledCourses = student.enrolledCourses.filter(id => id.toString() !== courseId);

  await course.save();
  await student.save();

  res.json({ message: "Student withdrawn from course" });
};
```

---

### 🧑‍🏫 Teacher Assign Course (Max 5 check + Admin Only)

```js
exports.assignTeacherToCourse = async (req, res) => {
  const { courseId, adminId } = req.body;
  const teacher = await Teacher.findById(req.params.teacherId);
  const admin = await Teacher.findById(adminId);

  if (admin.role !== "admin") {
    return res.status(403).json({ message: "Only admin can assign courses" });
  }

  if (teacher.courses.length >= 5) {
    return res.status(400).json({ message: "Teacher already has 5 courses" });
  }

  const course = await Course.findById(courseId);
  teacher.courses.push(course._id);
  course.teacher = teacher._id;

  await teacher.save();
  await course.save();

  res.json({ message: "Course assigned to teacher" });
};
```

---

### 🔥 Remove Student by Teacher

```js
exports.removeStudent = async (req, res) => {
  const { teacherId, studentId, courseId } = req.body;

  const teacher = await Teacher.findById(teacherId);
  const course = await Course.findById(courseId);

  if (course.teacher.toString() !== teacherId && teacher.role !== "admin") {
    return res.status(403).json({ message: "Unauthorized to remove student" });
  }

  course.students = course.students.filter(id => id.toString() !== studentId);
  await course.save();

  const student = await Student.findById(studentId);
  student.enrolledCourses = student.enrolledCourses.filter(id => id.toString() !== courseId);
  await student.save();

  res.json({ message: "Student removed by teacher/admin" });
};
```

---

## 📮 Endpoints Summary for Postman

| Method | URL                           | Description                           |
| ------ | ----------------------------- | ------------------------------------- |
| POST   | `/courses`                    | Create course                         |
| POST   | `/students`                   | Create student                        |
| POST   | `/teachers`                   | Create teacher                        |
| POST   | `/courses/:courseId/enroll`   | Enroll student                        |
| POST   | `/courses/:courseId/withdraw` | Withdraw student                      |
| POST   | `/teachers/:teacherId/assign` | Assign course to teacher (admin only) |
| POST   | `/teachers/remove-student`    | Remove student from course            |

---

## ⚙️ Next Steps

Do you want:

* The **full project zipped**?
* A **GitHub repo setup**?
* Full **Postman collection** to import and test quickly?

Let me know and I’ll send you the final version accordingly.
