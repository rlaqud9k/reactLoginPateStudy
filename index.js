const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000
const config = require("./config/key");
const {User} = require("./models/User")

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI ,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log(`MongoConnect`)).catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hdello World!'))

app.post("/register", (req,res)=> {

    const user = new User(req.body);
    user.save((err, userInfo)=>{
        if(err){
            return res.json({success: false, err})
        }
        return res.status(200).json({
            success:true
        })
    });    
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))