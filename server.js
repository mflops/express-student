import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

// middleware (read raw json from req body)
app.use(express.json());

// students CRUD
const students = []; // ARRAY of OBJECTS
let id = 1;

// ADD student (CREATE)
app.post('/students', (req, res) => {
  const { name, age } = req.body;
  const student = { id: id++, name: name, age: age };
  students.push(student);
  res.status(200).send({ message: 'Student added.' });
});

// GET ALL students (READ)
app.get('/students', (req, res) => {
  res.status(200).send(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((student) => student.id === studentId);
  if (student) {
    res.status(200).send(student);
  } else {
    res.status(404).send({ error: 'Student Not Found.' });
  }
});

// UPDATE student (UPDATE)
app.put('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, age } = req.body;
  const student = students.find((student) => student.id === studentId);
  if (student) {
    student.name = name;
    student.age = age;
    res.status(200).send({ message: 'Student Updated.' });
  } else {
    res.status(404).send({ error: 'Student Not Found.' });
  }
});

// DELETE student (DELETE)
app.delete('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  const idxToDel = students.findIndex((student) => student.id === studentId);
  if (idxToDel !== -1) {
    students.splice(idxToDel, 1);
    res.status(200).send({ message: 'Student Deleted.' });
  } else {
    res.status(404).send({ error: 'Student Not Found.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port: ${3000}`);
});
