import mongoose from 'mongoose';

const connectDB = (url) => {
    // useful for search functionality
    mongoose.set('strictQuery', true);

    // connect to mongo, or show error message
    mongoose.connect(url)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
}

export default connectDB;