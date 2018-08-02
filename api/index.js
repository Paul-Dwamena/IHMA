const express = require('express')
const app = express()

const mongoose = require('mongoose')
const db = require('./config/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(cors())
app.use(morgan("short"))

app.use(express.static(__dirname + '/public'));

mongoose.connect(db.name,(err)=>{
    if(err){
        console.log("can't connect to database")
        return
    }

    console.log('connected')

    const Login = require('./routes/Login')
    const Signup = require('./routes/Signup')
    const Activate = require('./routes/activate')
    const PermissionAdder = require('./routes/Features/PermissionAdder')
    const Diagnosis = require('./routes/Features/Diagnosis')
    const Prescription = require('./routes/Features/Prescriptions')
    const Hospital = require('./routes/modules/Hospital')
    const User = require('./routes/modules/User')
    const Drug = require('./routes/modules/DrugController')
    const Pharmacy = require('./routes/modules/PharmarcyController')
    const Bed=require('./routes/modules/bedController')

    //For Devs only
    const FeatureController = require('./routes/Features/FeaturesController')
    app.use('/feature', FeatureController)
    
    
    app.use('/login', Login)
    app.use('/signup', Signup)
    app.use('/activate', Activate)
    app.use('/permission-adder', PermissionAdder)
    app.use('/diagnosis', Diagnosis)
    app.use('/prescription', Prescription)
    app.use('/hospital', Hospital)
    app.use('/user', User)
    app.use('/drug',Drug)
    app.use('/pharmacy',Pharmacy)
    app.use('/bed',Bed)
      
    var server = app.listen(80);
    //var socket = require('socket.io')

    // var io = socket(server)
    // let user = {}

    // io.on('connection',(socket)=>{

        
        
    //     socket.emit('who')

        

    //     socket.on('user', data=>{
    //         user[data] = socket.id
    //         console.log('user ' + data + ' connected with ' + user[data]);
    //         io.to(user['ernestt45hd']).emit('message', 'hello ernest')
    //     })

    // })
        
});

