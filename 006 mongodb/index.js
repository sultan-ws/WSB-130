const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const connection = async () => {
    try {
        await client.connect();
        const db = await client.db('wsb_130_tmp');

        const User = await db.collection('users');

        return User;
    }
    catch (error) {
        console.log(error);
    }
};

const saveData = async () => {
    console.log('object');
    const User = await connection();
    console.log(User);

    // const userData = {
    //     name: 'John Doe',
    //     email: 'johndoe@example.com',
    //     password: 'password123',
    // };

    // const response = await User.insertOne(userData);
    // console.log(response);
};
saveData();

const readData = async () => {
    const { User, Product, Order } = await connect();
    const response = await User.find().toArray();
    console.log(response);
};

// readData();