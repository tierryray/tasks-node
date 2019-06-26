const express = require("express");

const server = express();
server.use(express.json());

const projects = [];

let requests = 0;

server.use((req, res, next) => {
  requests++;
  next();
  console.log(`Number of Requests So Far: ${requests}`);
});

function checkIfProjectExists(req, res, next) {
  const project = projects.find(item => item.id === req.params.id);

  if (!project) {
    res.status(400).json({ error: "Project does not exist" });
  }

  return next();
}

//  Lista todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//  Adiciona projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  res.json(project);
});

//  Adiciona tarefa ao projeto
server.post("/projects/:id/tasks", checkIfProjectExists, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(item => item.id === id);

  project.tasks.push(title);

  res.json(project);
});

//  Altera título do projeto
server.put("/projects/:id", checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(item => item.id === id);

  project.title = title;

  return res.json(project);
});

//  Deleta projeto
server.delete("/projects/:id", checkIfProjectExists, (req, res) => {
  const { id } = req.params;

  projects.map((value, index) =>
    value.id === id ? projects.splice(index, 1) : false
  );

  return res.send();
});

server.listen(3000);
