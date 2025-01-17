// addRelativePath.js.js
const fs = require("fs");
const path = require("path");

const filePath = process.argv[2]; // Get the file path from the command-line argument
const workspaceFolder = process.cwd(); // Get the workspace folder
const relativePath = path.relative(workspaceFolder, filePath); // Calculate the relative path

const commentLine = `// ${relativePath}\n`;

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err.message}`);
    return;
  }

  // Check if the file already starts with the relative path comment
  if (data.startsWith(commentLine)) {
    return; // Don't add the comment again
  }

  const updatedContent = commentLine + data; // Prepend the comment
  fs.writeFile(filePath, updatedContent, "utf8", (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`);
    }
  });
});
