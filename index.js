//node framework
const express = require("express");
const app = express();
const route = require('./app/route/userroutes')
const routesCategory = require('./app/route/categoryRoute')
const routesContactUs = require('./app/route/contactUsRoutes')
const routesPortfolio = require('./app/route/portfolioRout')
const routesTestimonial = require('./app/route/testimonialRoute');


//authorization: cookie - application data storage
const cookieParser = require('cookie-parser');

//post api - req.body   
const bodyParser = require('body-parser');
// Json parsing
app.use(bodyParser.json());
// Urlencoded Data parsing


app.use(bodyParser.urlencoded({ extended: true }));
const dotenv = require('dotenv');
dotenv.config();

app.use(cookieParser());
app.use('/', routesCategory);
app.use('/', routesContactUs);
app.use('/', routesPortfolio);
app.use('/', routesTestimonial);

app.use('/', route);

app.use(express.static('app/upload'));




//port listen - project works on port
const port = process.env.PORT || 4020;
app.listen(port, () => console.log(`Listening on port ${port}...`));
