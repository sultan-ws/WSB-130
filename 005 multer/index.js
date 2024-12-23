const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());

// no file input
// const upload =  multer().none();

// single file with single field
// const upload = multer({ storage : multer.diskStorage({
//     destination:(req, file, cb)=>{
//         cb(null, './files');
//     },
//     filename:(req, file, cb)=>{
//         console.log(file);
//         cb(null, Date.now() + Math.floor(Math.random() * 99999) + req.body.firstname + path.extname(file.originalname));
//     }
// })}).single('thumbnail');

// multiple files with single field
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, './files');
//         },
//         filename: (req, file, cb) => {
//             console.log(file);
//             cb(null, Date.now() + Math.floor(Math.random() * 99999) + req.body.firstname + path.extname(file.originalname));
//         }
//     })
// }).array('images', 10);

// multiple fields
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './files');
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now() + Math.floor(Math.random() * 99999) + req.body.firstname + path.extname(file.originalname));
        }
    })
}).fields([
    {name:'thumbnail', maxCount: 1},
    {name:'images', maxCount: 10}
]);

app.post('/file-uploadation', upload, (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);

        console.log(typeof(req.files.thumbnail));
        res.status(200).json({ message: 'success' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
})

app.listen(4600, () => {
    console.log('Server is running on port 4600');
});