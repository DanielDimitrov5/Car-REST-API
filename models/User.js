import { model, Schema } from "mongoose";

const schema = new Schema({
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
});

const User = model('User', schema);

export default User;