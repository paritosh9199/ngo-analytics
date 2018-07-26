var exp = require("express");
var app = exp();
var path    = require("path");

app.use(exp.static(path.join(__dirname, 'res')));

app.get('/',function(req,res){
  res.render("index.ejs");
});

app.listen(3000,process.env.IP,function(){
    console.log("server started");
});
