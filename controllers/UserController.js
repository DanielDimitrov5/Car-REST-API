import User from "../models/User.js";
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = 'secret';

const regester = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Please enter all fields' });

    //check for existing user
    if (await User.findOne({ email: email })) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword });
    await user.save();


    res.json({ message: `User <${user.email}> created successfully` });
    return createSession(user);
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Please enter all fields' });

    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 86400 });

    console.log(token);
    res.header('x-access-token', token).json({ token, user: { id: user._id, email: user.email } });
};

function createSession(user) {
    return {
        email: user.email,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            _id: user._id
        }, JWT_SECRET)
    };
}

router.post('/regester', regester);
router.post('/login', login);

export default router;