import { faker } from '@faker-js/faker';
import mongoose from "mongoose";
import Spot from "./models/Spot.js";

function seeder()  {
    for (let i = 0; i < 11; i++) {
        let randomReview = faker.music.genre();
        let randomTitle = faker.music.genre();
        let randomDescription = faker.music.genre();

        Spot.create({
            review: randomReview,
            title: randomReview,
            description: randomReview,
            }

        )
        res.status(200).json();
    }

}

export default seeder;