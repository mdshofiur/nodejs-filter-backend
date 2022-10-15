const movieModel = require("../models/Movie.model");
const movies = require("../movies.json");

async function createMovie(req, res,next) {
     res.status(200).json({
       message: "It is movies route d",
     });
    next();
}


async function getMovie(req, res, next) {
    try {
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        let sort = req.query.sort || "rating";
        let genre = req.query.genre || "All";

        const genreOPtions = [
            "All",
            "Action",
            "Adventure",
            "Comedy",
            "Crime",
            "Drama",
            "Fantasy",
            "Historical",
            "Historical fiction",
            "Horror",
            "Magical realism",
            "Mystery",
        ]
        genre === "All"
          ? (genre = [...genreOPtions])
          : (genre = req.query.genre.split(","));
        req.query.sort ? (sort = req.query.sort.split(',')) : (sort = [sort]);

  
        let sortBy = {};
        if (sort[1]) {
            sortBy[sort[0]] = sort[1];
        } else {
            sortBy[sort[0]] = "asc";
        }
        const movies = await movieModel.find({
            name: { $regex: search, $options: "i" }
        })
        .where("genre")
            .in([...genre])
            .sort(sortBy)
            .skip(page * limit)
            .limit(limit)
        const total = await movieModel.countDocuments({
            genre: { $in: [...genre] },
            name: { $regex: search, $options: "i" }
        });
        const response = {
          error: false,
          total,
          page: page + 1,
          limit,
          genre: genreOPtions,
          movies
        };
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

// const insertMovies = async () => { 
//     try {
//         const docs = await movieModel.insertMany(movies);
//         return Promise.resolve(docs);
//     } catch(error) {
//         return Promise.reject(error);
//     }
// }

// insertMovies()
//     .then((docs) => console.log(docs))
//     .catch((error) => console.log(error));


module.exports = { createMovie, getMovie };



    //  sort.forEach((item) => {
    //    sortBy[item] = -1;
    //  });
    //  const movies = await Movie.find({
    //    $and: [
    //      { title: { $regex: search, $options: "i" } },
    //      { genre: { $in: genre } },
    //    ],
    //  })
    //    .sort(sortBy)
    //    .skip(page * limit)
    //    .limit(limit)
    //    .exec();
    //  res.status(200).json({
    //    message: "Movies fetched successfully",
    //    movies: movies,
    //  });







//           const startIndex = page * limit;
//         const endIndex = page * limit + limit;
//         const results = {};
//         if (endIndex < movies.length) {
//             results.next = {
//                 page: page + 2,
//                 limit: limit,
//             };
//         }
//         if (startIndex > 0) {
//             results.previous = {
//                 page: page,
//                 limit: limit,
//             };
//         }
//         results.results = movies.slice(startIndex, endIndex);
//         res.status(200).json(results);
//     } catch (error) {
//         res.status(500).json({
//             error: error.message,
//         });
//     }
//     next();
// }
