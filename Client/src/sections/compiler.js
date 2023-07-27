const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var compiler = require("compilex");
var options = { stats: true }; //prints stats on console

compiler.init(options);
app.use(bodyParser);

app.post("/run", (req, res) => {
  const { code, input, lang = "cpp" } = req.body;
  try {
    if (lang == "cpp") {
      if (!input) {
        var envData = { OS: "windows", cmd: "g++" }; // (uses g++ command to compile )
        //var envData = { OS: "linux", cmd: "gcc" }; // ( uses gcc command to compile ) FOR LINUX
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      } else {
        var envData = { OS: "windows", cmd: "g++" }; // (uses g++ command to compile )
        // var envData = { OS: "linux", cmd: "gcc" }; // ( uses gcc command to compile ) FOR LINUX
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "error" });
          }
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
});
