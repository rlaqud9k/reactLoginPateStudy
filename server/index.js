const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000
const config = require("./config/key");
const {User} = require("./models/User")
const cookiePaser = require("cookie-parser");
const {auth} = require("./middleware/auth");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookiePaser());
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI ,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log(`MongoConnect`)).catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hdello World!'))

app.post("/api/users/register", (req,res)=> {
    
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
app.post('/api/users/login', (req,res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
        User.findOne({email: req.body.email},(err, user)=>{
            if(!user){
                return res.json({
                    loginSuccess: false,
                    message: "제공된 이메일에 해당하는 유저가 없습니다."
                })
            }
    
            //비밀번호 확인
            user.comparePassword(req.body.password, (err, isMatch)=>{
                if(!isMatch){
                    return res.json({loginSuccess: false, message:"잘못된 비밀번호입니다."})
                }
                //위의 조건 만족시 토큰생성
                user.generateToken((err, user)=> {
                    if(err){return res.status(400).send(err)};
                    res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true , userId: user._id});
                })

            })
        })
})


app.get('/api/users/auth', auth, function(req,res){
    res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image    
    })
})

app.get('/api/users/logout', auth, function(req,res){
    User.findOneAndUpdate({_id: req.user._id},
        {token : ""},
        (err, user)=>{
            if(err) return res.json({success : false, err});
            return res.status(200).send({
                success : true
            })
        })
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))