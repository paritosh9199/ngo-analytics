var exp = require("express");
var app = exp();
var path = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(exp.static(path.join(__dirname, 'res')));

app.get('/', function (req, res) {
  res.render("index.ejs");
});
app.get('/analytics/:id', function (req, res) {
  res.render("analytics.ejs");
});

// app.post('/analyticsLoad', function (req, res) {
//   var num = res.body.value;
//   var str = "===================================== \n"
//   console.log(num);
//   // res.redirect("/");
// });

// app.post('/',function(req,res){
//   // console.log(req.param);
// });


app.listen(3000, process.env.IP, function () {
  console.log("server started");
});
