const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = 5050;
const authRoute = require('./routes/auth');
const cors = require('cors');

//BodyParser Middleware
app.use(bodyParser.json());

//Cors MiddleWare :
app.use(cors());

//DB Connection
mongoose
	.connect('mongodb://localhost/RESTAPI_LOGIN', {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('DB connection Established'))
	.catch((error) => console.log(error));

//Custom Routes :
app.use('/auth', authRoute);

//PORT is Running at PORT
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
