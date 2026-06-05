const express = require("express");
const { exec } = require("child_process");

const app = express();

// hardcoded secret
const PASSWORD = "admin123";

// command injection
app.get("/ping", (req, res) => {
    const host = req.query.host;

    exec(`ping -c 1 ${host}`, (err, stdout) => {
        res.send(stdout);
    });
});

// unsafe eval
app.get("/calc", (req, res) => {
    const expression = req.query.exp;

    const result = eval(expression);

    res.send(result.toString());
});

app.listen(3000);
