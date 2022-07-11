const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');



const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const questionRoute = require("./routes/questionRoute")
const replyRoute = require("./routes/replyRoute")

const app = express();

const cors = require('cors')

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute);

app.use("/api/user",userRoute);

app.use("/api/question",questionRoute)

app.use("/api/reply",replyRoute)

mongoose.connect(process.env.MONGO_URI).then(console.log("Connected to mongodb")).catch((err)=>{console.log("invalid",err)})

app.listen(process.env.PORT || 3003,()=>{
      console.log(`Backend runnig on port ${process.env.PORT}`);
})