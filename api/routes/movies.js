const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE
// (POST: localhost:8800/api/movies/)
router.post("/", verify, async(req, res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);
        try{
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie); 
        }
        catch(err){
            res.status(500).json(err);    
        }
    }
    else{
        res.status(403).json("You are not allowed to add movie!");
    }
});

//UPDATE
router.put("/:id", verify, async(req, res)=>{
    if(req.user.isAdmin){
        try{
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, 
            { 
                $set: req.body,
            },
            {new:true}
        );
            res.status(200).json(updatedMovie); 
        }
        catch(err){
            res.status(500).json(err);    
        }
    }
    else{
        res.status(403).json("You are not allowed to update movie!");
    }
});

//DELETE
router.delete("/:id", verify, async(req, res)=>{
    if(req.user.isAdmin){
        try{
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("The movie has been deleted..."); 
        }
        catch(err){
            res.status(500).json(err);    
        }
    }
    else{
        res.status(403).json("You are not allowed to delete movie!");
    }
});


//GET
// (GET: localhost:8800/api/movies/find/63df3541135c6e29a057be57)
router.get("/find/:id", verify, async(req, res)=>{
    try{
         const movie = await Movie.findById(req.params.id);
          res.status(200).json(movie); 
      }
    catch(err){
        res.status(500).json(err);    
   }   
});

//GET RANDOM 
// (GET: localhost:8800/api/movies/random?type=series) or
// (GET: localhost:8800/api/movies/random)
router.get("/random", verify, async(req, res)=>{
    const type = req.query.type;
    let movie;
    try{
        if(type==="series") {
            movie = await Movie.aggregate([
                {$match: {isSeries:true}},
                {$sample: {size:1 }},
            ]);
        }
        else {
            movie = await Movie.aggregate([
                {$match: {isSeries:false}},
                {$sample: {size:1 }},
            ]);
        }
        res.status(200).json(movie);
      }
    catch(err){
        res.status(500).json(err);    
   }   
});

//GET ALL
// (GET: localhost:8800/api/movies/)
router.get("/", verify, async(req, res)=>{
    if(req.user.isAdmin){
        try{
            const movies = await Movie.find();
            // this will reverse the movie list and show us the most resent movies/series
            res.status(200).json(movies.reverse()); 
        }
        catch(err){
            res.status(500).json(err);    
        }
    }
    else{
        res.status(403).json("You are not allowed to delete movie!");
    }
});

module.exports=router;