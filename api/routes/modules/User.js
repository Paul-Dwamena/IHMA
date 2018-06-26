const route = require('express').Router()
const User = require('../../database/User')
const auth = require('../JwtAuth')
const userDetails = require('../../config/db').user_info

 
route.get('/',auth,(req,res)=>{
    User.findById(req.user._id, userDetails).then(doc=>{
        if(doc){
            const jwt = require('jsonwebtoken')
            const secret = require('../../config/secrets')
            res.json({
                username: doc.username,
                email: doc.email,
                name: doc.name,
                bio: doc.bio,
                image: doc.image,
                permissions: doc.permissions,
                token: jwt.sign({
                    _id: doc._id,
                    role: doc.role,
                    client: req.ip,
                    permissions: doc.permissions
                },secret.jwt)
            })
        }
    })
    //TODO decypher token, find user and cypher new token
})


route.get('/:type/:value',(req,res)=>{

    let type = req.params.type
    let val = req.params.value
    let result


    //TODO create a function that handles when there is no user
    switch(type){
        case 'email': 
            User.find({email: val}, userDetails).then((doc)=>{
                res.send(doc)
            })
            break
        case 'username':
            User.find({username: val}, userDetails).then((doc)=>{
                res.send(doc)
            })
            break
        case 'id':
            User.find({_id: val}, userDetails).then((doc)=>{
                res.send(doc)
            })
            break
    }

    
})


module.exports = route