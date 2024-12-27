const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');

const app = express();
app.use(express.json());
const url = 'mongodb+srv://sultankhan:sj1XtNfoMKK1If1T@sultan.luvya.mongodb.net/?retryWrites=true&w=majority&appName=sultan';

const client = new MongoClient(url);

const connect = async()=>{
    try{
        await client.connect();
        const db = await client.db('wsb_130_tmp');
        const User = await db.collection('users');
        return User;

    }
    catch(error){
        console.log(error);
    }
};

app.post('/insert-data', async (req, res) => {
    try{
        const User = await connect();

        const response = await User.insertOne(req.body);
        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
});

app.get('/read-data', async (req, res) => {
    try{
        const User = await connect();
        const response = await User.find().toArray();
        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
});

app.put('/update-data/:_id', async(req, res)=>{
    try{
        const User = await connect();
        const response = await User.updateOne(
            { _id: new ObjectId(req.params._id)},
            {
                $set:req.body
            }
        );
        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
});

app.delete('/delete-data/:_id', async (req, res)=>{
    try{
        const User = await connect();
        const response = await User.deleteOne({ _id: new ObjectId(req.params._id)});
        res.status(200).json({message:'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
})

app.listen(4400, ()=>{
    console.log('Server is running on port 4400');
});