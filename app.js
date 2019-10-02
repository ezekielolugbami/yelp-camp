var express     = require("express"),
    app     = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground = require("./models/campground");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Campground.create({
//     name: "Granite Hill", 
//     image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg",
//     description: "This is a huge granite hill. No bathroom no water. Beautiful granite!"
// }, function(err, campground){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });



app.get("/", function(req, res){
    res.render("landing");
});


//index - route
app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {data: allCampgrounds});
        }
    });
}); 


//create - route
app.post("/campgrounds", function(req, res){
    //get data from form and add to data array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description
    var newCampground = {name: name, image: image, description: description};
    //create a new campground and save to db
    Campground.create(newCampground, function(err, newcampground){
        if(err){
            console.log(err);
        } else {
            //redirect back to the campgrounds page
            res.redirect("/campgrounds");
        }
    });
});


//new - route
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


//show - route: more info about the campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            //render show template with the campround
            res.render("show", {campground: foundCampground});
        }
    });
});







app.listen("3000", function(){
    console.log("yelp-camp server has started, listening on port 3000!");
});