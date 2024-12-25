const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb+srv://sultankhan:sj1XtNfoMKK1If1T@sultan.luvya.mongodb.net/?retryWrites=true&w=majority&appName=sultan';

const client = new MongoClient(url);

const connect = async () => {
    await client.connect();
    const db = client.db('wsb_130_tmp');
    const User = db.collection('users');

    return {
        User
    }
};

const insertData = async () => {

    const { User } = await connect();

    const data = {
        name: 'janny wick',
        age: '24',
        email: 'jonnywick@gmail.com',
    };

    const response = await User.insertOne(data);

    console.log(response);
};

// insertData();

const readData = async () => {
    const { User } = await connect();
    const response = await User.find().toArray();
    console.log(response);
};
readData();

const deleteData = async () => {
    const { User } = await connect();
    const response = await User.deleteOne({ _id: new ObjectId('676bf7575b8c478112578689') });
    console.log(response);
};

// deleteData();

const updateData = async () => {
    const { User } = await connect();
    const response = await User.updateOne(
        { _id: new ObjectId('676bf733b20f7cf9267604e2') },
        {
            $set: {
                name: 'jayant wick',
                status: 'inactive'
            }
        });

    console.log(response);
};

// updateData();