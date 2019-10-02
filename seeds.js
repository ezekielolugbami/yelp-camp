var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://cdn.pixabay.com/photo/2016/05/25/14/28/camping-1414994__340.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        image: "https://cdn.pixabay.com/photo/2016/06/06/08/32/tent-1439061__340.jpg",
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        image: "https://cdn.pixabay.com/photo/2018/04/20/14/52/campground-3336155__340.jpg",
        description: "blah blah blah"
    }
]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few capgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create({
                        text: "This place is great, but i wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err)
                        } else {
                            campground.comments.push(comment); 
                            campground.save();
                            console.log("created new comment")
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
