const express = require("express");
const fs = require("fs");

const app = express();

app.listen(3000);

app.get("/wallet", (req, res) => {
  const file = fs.readFileSync(__dirname + "/pass.pkpass");

  res.header("Content-Type", "application/vnd.apple.pkpass");
  res.writeHead(200, {
    "Content-Disposition": "attachment;filename=" + "pass.pkpass",
  });
  res.write(file, "binary");
  res.end();
});
