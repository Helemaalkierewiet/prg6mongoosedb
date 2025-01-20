import mongoose from "mongoose";

const spotSchema = new mongoose.Schema({
    id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    review: {type: String, required: true}

    },{
    toJSON: {
        virtuals: true,
            // versionKey: false,
            transform: (doc, ret) => {

            ret._links = {
                self: {
                    href: `${process.env.APP_BASE_URL}/spots/${ret.id}`,
                },
                collection: {
                    href: `${process.env.APP_BASE_URL}/spots`
                }
            }

            delete ret._id
                delete ret.__v

        }
    }
});


const Spot = mongoose.model('Spot', spotSchema);

export default Spot;