const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const Routes = require("./routes/route.js");
const assignmentRoutes = require('./routes/assignmentRoutes');

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({ limit: '10mb' }));
app.use(cors());

const mongoURI = process.env.MONGO_URL;

if (!mongoURI) {
    console.error("MONGO_URL environment variable is not defined.");
    process.exit(1);
}

mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use('/', Routes);
app.use('/api', assignmentRoutes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
