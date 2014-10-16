var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();
var favorites = [];
var counter= 1;


app.use(bodyParser.urlencoded({extended: true}));
// app.use(methodOverride('_method'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function(req, res){

  var searchTerm = req.query.movieTitle;
  var url = "http://www.omdbapi.com/?s=" + searchTerm;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      res.render("results.ejs", {movieList: obj.Search});
    }
  });
});

app.get('/movie/:id', function(req, res){

  var movieID = req.params.id;
  var obj;

  var url = "http://www.omdbapi.com/?i=" + movieID;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      res.render("movie.ejs", {aMovie: obj});
    }
  });
});

app.get('/myMovies', function(req, res) {
  res.render("favorites.ejs", {movieList:favorites});
});

app.post('/myMovies', function(req,res) {
  console.log("This is my req.body object");
  var favorite = {};
  favorite.id = counter;
  favorite.title = req.body.aMovie.title;
  favorites.push(favorite);
  counter++;
  res.redirect('/myMovies');
});

app.listen(3000);
