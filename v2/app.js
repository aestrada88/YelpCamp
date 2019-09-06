const express     = require("express");
const app         = express();
const bodyParser  = require("body-parser");
const mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// Schema Setup

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Koa", 
//     image: "https://www.reserveamerica.com/owp-webclient/assets/images/ra/articles_camping_8.jpg"
//   }, (err, camp) => {
//     if(err){
//       console.log(err);
//     } else {
//       console.log("new campgorund");
//       console.log(camp);
//     }
//   });

// const campgrounds = [
//   { name: "Wekiva", image: "https://media.istockphoto.com/photos/camping-tent-in-a-camping-in-a-forest-by-the-river-picture-id911995140?k=6&m=911995140&s=612x612&w=0&h=U-yG-2eR8pOxLX_G8Eg9fDI1SOWYifxbb4BiiOhNNiI=" },
//   { name: "Koa", image: "https://www.reserveamerica.com/owp-webclient/assets/images/ra/articles_camping_8.jpg" },
//   { name: "Salmon Creek", image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*" },
//   { name: "Wekiva", image: "https://media.istockphoto.com/photos/camping-tent-in-a-camping-in-a-forest-by-the-river-picture-id911995140?k=6&m=911995140&s=612x612&w=0&h=U-yG-2eR8pOxLX_G8Eg9fDI1SOWYifxbb4BiiOhNNiI=" },
//   { name: "Koa", image: "https://www.reserveamerica.com/owp-webclient/assets/images/ra/articles_camping_8.jpg" },
//   { name: "Salmon Creek", image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*" },
//   { name: "Wekiva", image: "https://media.istockphoto.com/photos/camping-tent-in-a-camping-in-a-forest-by-the-river-picture-id911995140?k=6&m=911995140&s=612x612&w=0&h=U-yG-2eR8pOxLX_G8Eg9fDI1SOWYifxbb4BiiOhNNiI=" },
//   { name: "Koa", image: "https://www.reserveamerica.com/owp-webclient/assets/images/ra/articles_camping_8.jpg" },
//   { name: "Salmon Creek", image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*" }
// ];

app.get("/", (req, res) => {
  res.render("landing")
});

app.get("/campgrounds", (req, res) => {
  // res.render("campgrounds", {campgrounds: campgrounds});
  Campground.find({}, (err, allCamp) => {
    if(err){
      console.log(err);
    } else{
      res.render("campgrounds", { campgrounds: allCamp });
    }
  })
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});

app.post("/campgrounds", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCampground = {name: name, image: image};
  // campgrounds.push(newCampground);
  Campground.create(newCampground, (err, newlyCreated) => {
    if(err){
      console.log(err)
    } else{
      res.redirect("/campgrounds");
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Yelp Camp Server Has Started!");
});