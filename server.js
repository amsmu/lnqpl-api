const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(logger('development'));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function(req, res){
 res.json({"display_message" : "Welcome back home!"});
});
app.listen(3000, function(){ console.log('Server is listening on port 3000');});
