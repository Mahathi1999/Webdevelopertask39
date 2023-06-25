const express = require("express");
const fs = require("fs");
const { postman } = require("postman");
const { postmanDocs } = require("postman-docs");

const app = express();
const port = 3000;

// Create a file
app.post("/file", (req, res) => {
  const content = req.body.content || "";
  const fileName = req.body.fileName || "example.txt";

  fs.writeFile(fileName, content, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error creating file" });
    } else {
      console.log(`File ${fileName} created successfully`);
      res.status(201).json({ message: "File created" });
    }
  });
});

// Read a file
app.get("/file/:fileName", (req, res) => {
  const fileName = req.params.fileName;

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(404).json({ error: "File not found" });
    } else {
      console.log(`File ${fileName} read successfully`);
      res.status(200).json({ content: data });
    }
  });
});

// Delete a file
app.delete("/file/:fileName", (req, res) => {
  const fileName = req.params.fileName;

  fs.unlink(fileName, (err) => {
    if (err) {
      console.error(err);
      res.status(404).json({ error: "File not found" });
    } else {
      console.log(`File ${fileName} deleted successfully`);
      res.status(200).json({ message: "File deleted" });
    }
  });
});

// Generate and publish API documentation using Postman Docs
postmanDocs(app, {
  title: "File System API Documentation",
  version: "1.0.0",
  output: "./docs/index.html", // Change the output path as per your preference
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
