const express = require('express');
const dateFormat = require('date-format');
const app = express();


//! swagger docs related
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 4000 ;

/**
 * @openapi
 * 
 */
app.get("/", (req, res) => {
    res.status(200).send("<h1> Hello World </h1>")
})

app.get("/api/v1/instagram", (req, res) => {
    const instaSocial = {
        username: "dummy",
        followers: "none",
        follows: "none",
        data: dateFormat.asString("dd[MM] - hh:mm:ss", new Date())
    };

    res.status(200).json({instaSocial});
});

app.get("/api/v1/:token", (req, res) => {
    console.log(req.params.token);
    res.status(200).json({param: req.params.token});
})

app.listen(PORT, () => {
    console.log(`Server is active...`);
})

