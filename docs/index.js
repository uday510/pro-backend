const express = require('express');

const app = express();

//! swagger docs related
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require('express-fileupload');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());
let courses = [{
    id: "11",
    name: "Learn Reactjs",
    price: 299,
},
{
    id: "22",
    name: "Learn Angular",
    price: 399,
},
{
    id: "33",
    name: "Learn Django",
    price: 499,
},
]

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/api/v1/course", (req, res) => {
    res.send("hello from course");
});

app.get("/api/v1/courseobject", (req, res) => {
    res.send({id: "10", name: "Learn Backend", price: 999});
});

app.get("/api/v1/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/v1/mycourse/:courseId", (req, res) => {
    const myCourse = courses.find(course => course.id === req.params.courseId);
    res.send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
});

app.get("/api/v1/coursequery", (req, res) => {
    let location = req.query.location;
    let device = req.query.device;

    res.send({location, device});
});

app.post("/api/v1/imageupload", (req, res) => {
    let file = req.files.file;
    console.log(req.headers);
    // console.log("file", file);
    let path = __dirname + "/images/" + Date.now() +  ".jpg";
    console.log("path", path);

    file.mv(path, function(err) {
    if (err)
      return res.status(500).send({msg:"Something went wrong", err});

    res.send('File uploaded!');
  });
});


app.listen(4000, () => {
    console.log("server is active...");
});