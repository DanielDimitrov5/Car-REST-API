import { model, Schema } from "mongoose";

const schema = new Schema({
    make: { type: String, required: [true, 'Make is required'] },
    model: { type: String, required: [true, 'Model is required'] },
    year: {
        type: Number,
        required: true,
        max: [new Date().getFullYear(), 'Year must be under current year'],
    },
    description: { type: String, required: true, minlength: [5, 'Description must be at least 5 characters long'] },
    img: { type: String, required: true },
});

const Car = model('Car', schema);

export default Car;