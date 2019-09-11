var express     = require("express"),
    app     = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create({
    name: "Granite Hill", 
    image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg"
}, function(err, campground){
    if (err) {
        console.log(err);
    } else {
        console.log(campground);
    }
});



app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {data: campgrounds});
}); 

app.post("/campgrounds", function(req, res){
    //get data from form and add to data array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to the campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});








app.listen("3000", function(){
    console.log("yelp-camp server has started, listening on port 3000!");
});