const express = require("express");

const server = express();
server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo Teste",
    tasks: ["Nova Tarefa", "Nova Tarefa 2"]
  }
];

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id: id,
    title: title
  });

  res.send();
});

server.post("/projects/:id/tasks", (req, res) => {
  const { title } = req.body;
  const project = projects[req.params.id];

  project.tasks.push(title);

  res.json(project);
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);

  return res.send();
});

server.listen(3000);

//  MUDAR FORMA COMO BUSCA POR ID
