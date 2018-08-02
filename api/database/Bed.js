const mongoose = require('mongoose')



const Bed = new mongoose.Schema({
    bedNo:{
        type:String,
        required:true
    },
    location:{
        wardName:{
            type:String,
            
        },
        roomNo:{
            type:Number
        },
        
    },
    status:{
        type:String,
        enum:['isoccupied','available','maintenance'],
        default:'available'
    },
    cost:{
        type:Number,
        required:true
    },
    admissionDate:{
        type:Date,
        default:Date.now
    },
    releaseDate:{
        type:Date
    },
    patient:{type:mongoose.Schema.ObjectId, ref: 'patient'},
    hospital:{type:mongoose.Schema.ObjectId,ref:'hospitals'}
    
})

module.exports = mongoose.model('bed', Bed)