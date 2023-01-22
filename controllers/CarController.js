import Car from '../models/Car.js';
import { Router } from 'express';
import _ from 'lodash';
import auth from '../middlewares/Auth.js';


const router = Router();

const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.json({ message: 'Cars not found', error: err });
    }
};

const getCarById = async (req, res) => {
    const { id } = req.params;

    try {
        const car = await Car.find({ _id: id });
        res.json(car);
    } catch (err) {
        res.json({ message: 'Cars not found', error: err });
    }
};

const getAllCarsByMake = async (req, res) => {
    const { make } = req.params;
    try {
        const car = await Car.find({ make: { $regex: make, $options: 'i' } });
        res.json(car);
    } catch (err) {
        res.json({ message: 'Cars not found', error: err });
    }
};

const createCar = async (req, res) => {
    const { make, model, year, description, img } = req.body;

    const car = new Car({ make, model, year, description, img });

    try {
        await car.save();
        res.json({ message: 'Car created successfully!' });
    } catch (err) {
        res.json({ message: 'Car creation failed!', error: err });
    }
};

const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const update = _.pick(req.body, ['make', 'model', 'year', 'description', 'img']);
        const car = await Car.findByIdAndUpdate(id, update, { new: true });
        res.json({ message: 'Car updated successfully', car });

    } catch (error) {
        res.json({ message: 'Car update failed', error });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findByIdAndDelete(id);
        res.json({ message: 'Car deleted successfully', car });
    } catch (error) {
        res.json({ message: 'Car deletion failed', error });
    }
};

const filterCarsByYearGreater = async (req, res) => {
    const { year } = req.params;
    try {
        const car = await Car.find({ year: { $gte: year } });
        res.json(car);
    } catch (err) {
        res.json({ message: 'Cars not found', error: err });
    }
};

const filterCarsByYearLess = async (req, res) => {
    const { year } = req.params;
    try {
        const car = await Car.find({ year: { $lte: year } });
        res.json(car);
    } catch (err) {
        res.json({ message: 'Cars not found', error: err });
    }
};

const filterCarsByYearBetween = async (req, res) => {
    const { year1, year2 } = req.params;
    try {
        const car = await Car.find({ year: { $gte: year1, $lte: year2 } });
        res.json(car);
    } catch (err) {
        res.json({ message: 'Cars not found', error: err });
    }
};

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.get('/make/:make', getAllCarsByMake);
router.post('/create', createCar);
router.put('/update/:id', updateCar);
router.delete('/delete/:id', deleteCar);

router.get('/filter/greater/:year', filterCarsByYearGreater);
router.get('/filter/less/:year', filterCarsByYearLess);
router.get('/filter/between/:year1/:year2', filterCarsByYearBetween);

export default router;
