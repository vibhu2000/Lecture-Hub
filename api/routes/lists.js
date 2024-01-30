const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//create (Post: localhost:8800/api/lists/ )
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
    // if (req.user.id) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The List has been deleted....");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});

//GET 
// url for thunder client:-
// (GET: localhost:8800/api/lists/) or
// (GET: localhost:8800/api/lists?type=movies&genre=horror)
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;

    //we create a empty so that according to our query we push all data in the list
    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                // gives 10 random list
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    
                    // match query
                    { $match: { type: typeQuery, genre: genreQuery } }
                ]);
            }
            else{
                // gives 10 random list
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    
                    // match query
                    { $match: { type: typeQuery } }
                ]);
            }
        }
        else {
            // gives 10 random list
            list = await List.aggregate([{ $sample: { size: 10 } }])
        }
        res.status(200).json(list);

    } catch (err) {
        res.status(500).json(err);
    }

})


module.exports = router;