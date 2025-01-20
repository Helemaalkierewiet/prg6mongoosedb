
import mongoose from "mongoose";
import spotsRouter from './routes/spots.js';
import express from 'express';





const app = express();



mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
//
// Middleware voor JSON-gegevens
app.use(express.json());

// Middleware voor www-urlencoded-gegevens
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-type, Authorization, Accept');
    next();
})

// Middleware om te controleren of een request accept is application/json
app.use((req, res, next) => {
    if (req.header('Accept') !== 'application/json' && req.method !== "OPTIONS") {
        res.status(406).json({error: 'Json needed as Accept header'});
    }else{
        next();
    }
})


app.get('/', (req, res) => {
    res.json({message: 'Gangshit'});
});

app.use('/spots', spotsRouter);

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});