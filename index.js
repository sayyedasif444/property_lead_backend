const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

var corsOptions = {
  origin: '*',
};

const app = express();

app.get('/', function (req, res) {
  res.send('Testing');
});

const PORT = process.env.PORT || 5000;

//middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('images'));

app.use((req, res, next) => {
  console.log('HTTP URL - ' + req.url);
  next();
});

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//apis
const routeLogin = require('./routes/userRoutes.js');
app.use('/api/user', routeLogin);
const routerProperty = require('./routes/propertyRoutes.js');
app.use('/api/property', routerProperty);
const routeSource = require('./routes/sourceRoutes.js');
app.use('/api/source', routeSource);
const routeInteraction = require('./routes/interactionRoutes.js');
app.use('/api/interaction', routeInteraction);
const routeAction = require('./routes/actionRoutes.js');
app.use('/api/action', routeAction);
const routeLead = require('./routes/leadRoutes.js');
app.use('/api/lead', routeLead);
const routeTask = require('./routes/taskRoutes.js');
app.use('/api/task', routeTask);
const routeMeeting = require('./routes/meetingRoutes.js');
app.use('/api/meeting', routeMeeting);
const accountManagement = require('./routes/accountRoutes.js');
app.use('/api/account', accountManagement);
const salaryManagement = require('./routes/salaryRoutes.js');
app.use('/api/salary', salaryManagement);

app.listen(PORT, () => console.log('server started'));
