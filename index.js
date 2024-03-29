const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Connect to MongoDB
const connectDB = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/form.html");
});

app.post('/', async (req, res) => {
    const mongoURI = req.body.myuri;

    // Connect to MongoDB
    await connectDB(mongoURI);

    // Define schema
    const studentSchema = new mongoose.Schema({
        name: String,
        studentID: String
    });

   
    const Student = mongoose.model('w24students', studentSchema);

   
    const student = new Student({
        name: 'Kenneth Cheuk',  
        studentID: '300180074'  
    });

   
    try {
        await student.save();
        res.send('<h1>Document Added</h1>');
    } catch (error) {
        res.status(500).send('Error adding document to MongoDB');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
