var express = require("express");
var bodyParser = require("body-parser");
const orm = require('./config/orm.js')

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//get all burgers from db and render index
app.get("/", function (req, res) {
    orm.selectAll('burgers', function (err, data) {
        if (err) { return res.status(500).end(); }
        res.render("index", { burgers: data });
    });
});

//add a burger to db
app.post("/burger", function (req, res) {
    orm.insertInto('burgers', 'burger_name', req.body.burger, function (err, data) {
        if (err) { return res.status(500).end(); }
        res.json({ id: data.insertId });
    })
});


// Update a burger to devoured = true
app.put("/burger/:id", function (req, res) {
    orm.update('burgers', 'devoured', true, req.params.id, function (err, data) {
        if (err) {
            // If an error occurred, send a generic server faliure
            return res.status(500).end();
        }
        else if (data.changedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    })
});

// Delete a burger from devoured list
app.delete("/burger/:id", function (req, res) {
    orm.delete('burgers', req.params.id, function (err, data) {
        if (err) {
            // If an error occurred, send a generic server faliure
            return res.status(500).end();
        }
        else if (data.affectedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        res.status(200).end();
    })
});

app.listen(port, function () {
    console.log("listening on port", port);
});

