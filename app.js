if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressErrors = require("./utils/ExpressErrors.js");
const Review = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // local mongoDb url
const AtlasDb = process.env.ATLASDB_URL;


main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(AtlasDb);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOption = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// root route
// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;

  next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     });
//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong !" } = err;
  res.render("error.ejs", { message });
  // res.status(statusCode).send(message);
});

app.listen(8080, (res, req) => {
  console.log("Server is running on port 8080");
});

//Create Route used try-catch for error handling
// app.post("/listings", async (req, res, next) => {
//   try {
//   const newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");
//   } catch(err){
//     next(err);
//   }
// });

// create route before schema validation
// app.post("/listings", wrapAsync(async (req, res, next) => {
//   if(!req.body.listing){
//     throw new ExpressErrors(400, "Send valid data for listing");
//   }
//   const newListing = new Listing(req.body.listen);
//   await newListing.save();
//   res.redirect("/listings");
// })
// );

// test listing route
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "by the beach",
//         price: 1200,
//         location: "Calangute Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("Sample saved");
//     res.send("successful testing");
// });

// normal middleware for error handling
// app.use((err, req, res, next) => {
//   res.send("Something went wrong");
// });

// app.all("*", (req, res, next) => {
//   next(new ExpressErrors(404, "Page not found"));
// });
