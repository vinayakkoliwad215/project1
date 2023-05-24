const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");


mongoose.connect('mongodb://127.0.0.1:27017/project1').then(()=>{
    console.log("connection succesfull");
}).catch((e)=>{
    console.log(e);
})


const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})

schema.methods.generateToken = async function(){
    try {
        const tokenuser = jwt.sign({_id:this._id.toString()},"werwqrwerewrqwrqwrwqerwerwerqwerwerwedfsdffsgrtfgdseyJfaWQiOiI2NDZhMzE0ZDkwMmM1ZGFjOTY0YzU1MDkiLCJpYXQiOjE2ODQ2ODEwMzd9.Lkiz4zunBS2H2lEZjLLx9CcXOTirQR80q3zLHo7JerA");
          this.tokens =this.tokens.concat({token:tokenuser})
          await this.save();
        return tokenuser
    } catch (error) {
        
    }
}

schema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        // this.confpassword =await bcrypt.hash(this.confpassword,10);
        // console.log(`${this.password}`);
    }
    next();
})

const usermodel = mongoose.model("userdetail",schema);

module.exports = usermodel;