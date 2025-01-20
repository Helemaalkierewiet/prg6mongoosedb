import express from "express";
import Spot from "../models/Spot.js";
import {faker} from "@faker-js/faker";


const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.options('/', (req, res) =>{
    res.header('Allow', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.status(204).send();
})

// a middleware function with no mount path. This code is executed for every request to the router
// router.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
// })

router.get('/', async (req, res) => {


    // getting TOTAL objecttt Amount like a PRRRR driveby
    const amountGetter = await Spot.find();
    let keyCount  = Object.keys(amountGetter).length;
    // log in console.
    console.log(keyCount);




    const limit = req.query.limit || 0;
    const page = req.query.page || 1;

    const skip = (page - 1) * limit;



    let pages = Math.round(keyCount / limit);
    let previousPage = req.query.page - 1;


    console.log(pages);

    const spots = await Spot.find().limit(
        limit
    ).skip(
        skip
    );

    console.log(skip);

    //skip methode

    //skip = limit * eerste page?


    res.json({
        items: spots,
        _links:
            {
                self: {
                    href: `${process.env.APP_BASE_URL}/spots`
                },
                collection: {
                    href: `${process.env.APP_BASE_URL}/spots`
                }
            },
        pagination:
            {
                "currentPage": `${req.query.page}`,
                "currentItems": `${req.query.limit}`,
                "totalPages": `${keyCount}`,
                "totalItems": `${pages}`,
                "_links": {
                    "first": {
                        "page": 1,
                        "href": `http://example.com/?page=1&limit=${req.query.limit}`
                    },
                    "last": {
                        "page": `${pages}`,
                        "href": `http://example.com/?page=${pages}&limit=${req.query.limit}`
                    },
                    "previous": null,
                    "next": {
                        "page": `${previousPage}`,
                        "href": `http://example.com/?page=${previousPage}&limit=${req.query.limit}`
                    }
                }
            }

    });
})

router.post('/', async(req, res) => {
    try{
        const spot = await Spot.create({
                title: req.body.title,
                description: req.body.description,
                review: req.body.review


            }

        )
        res.status(201).json({message: 'is gelukt'});
    }catch (error) {
        res.status(400).json({error: error.message});
    }


});


router.get('/:id', async(req, res) => {
   try {
       const spots = await Spot.findOne({_id: req.params.id});

       // const collectionID = ''
       // const selfUrl = await process.env.REACT_APP_BASE_URL;
       //  const {id} = req.params;
       // const spots = await Spot.findById(id);
        if (spots !== null) {
            res.json(
                spots
            )
        }else{
            res.status(404).json({message: 'Spot not found'});
        }
   }catch (e) {
       console.log(e);
       res.json({error: e.message});
   }



});

router.options('/:id',(req, res) =>{
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.send();
});

router.put('/:id', async (req, res) => {
    try {
        console.log('gang PUT');
        // if (req.body === ){
        //     res.json({message: 'empty body value'});
        // } else {
            const {id} = req.params;
            const editSpot = req.body;

        // for (const key of Object.keys(editSpot)) {
        //     if (editSpot[key] === "") {
        //         delete editSpot[key];
        //     }
        // }
            // if (editSpot.title == null) {
            //
            // }

            const updatedSpot = await Spot.findByIdAndUpdate(id, editSpot, {runValidators: true});

            res.status(201).json({ message: req.body, succes: updatedSpot});
        // }


    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await Spot.findByIdAndDelete(id)
        res.status(204).json({succes: true})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
});


router.post('/seed' , async (req, res) => {

    console.log(req.body , ' prrr2');

    await Spot.deleteMany({}); // delete ALLLLLL HIHI

    for (let i = 0; i < req.body.amount; i++) {
        let randomReview = faker.music.genre();
        let randomTitle = faker.music.genre();
        let randomDescription = faker.music.genre();



        await Spot.create({
                // review: randomReview,
                // title: randomReview,
                // description: randomReview,
                review:  randomReview + 'yapok',
                title: randomTitle + 'gangskrt',
                description: randomDescription + 'skrt',
            }

        )

        console.log('t is gelukt! (:');
    }
    res.json({
        message: 't is gelukt',

    })


})


// router.delete('/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         await Spot.findByIdAndDelete(id)
//         res.status(200).json({succes: true})
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// });

export default router;