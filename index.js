import express from 'express';
import mongoose from 'mongoose';
import carController from './controllers/CarController.js';

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/cars', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database ready');
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }

    const app = express();

    app.use(express.json());

    app.use('/cars', carController);

    app.use('/', (req, res) => {
        res.json({ 
            Rest: 'Car REST service',
            Endpoints: [
                { GET: '/cars' },
                { GET: '/cars/:id' },
                { GET: '/cars/make/:make' },
                { GET: '/cars/filter/greater/:year'},
                { GET: '/cars/filter/less/:year'},
                { GET: '/filter/between/:year1/:year2'},
                { POST: '/cars' },
                { PUT: '/cars/:id' },
                { DELETE: '/cars/:id' },

            ] 
        });
    });

    app.listen(3000, () => console.log('REST service started on port 3000'));
}

start();