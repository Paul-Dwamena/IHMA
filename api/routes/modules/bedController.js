const Bed = require("../../database/Bed");
const route = require('express').Router()
const Patient=require('../../database/Patient')



//adding a bed
route.post('/', (req,res)=>{
  let body=req.body
  if( "bedNo" in body && 'location' in body){
    let bed=Bed(body)
    bed.save((err,doc)=>{
      if(err)res.status(500).send(err)
      else res.send(doc)
    })
  }
  else res.send("At least provide the number and location of the bed")
})





//listing all beds
route.get('/',(req,res)=>{
  Bed.find().populate([{path:'patient'},{path:'hospital'}]).sort({createdAt: -1}).limit(10).exec(function(error, doc){
		if(error){
			console.error(error)
		}
		res.json({
			beds:doc
		})
	})
})


//listing all beds that are assigned to patients
route.get('/assignedbeds',(req,res)=>{
  Bed.find({patient:{$exists:true}}).populate([{path:'patient'},{path:'hospital'}]).sort({createdAt: -1}).limit(10).exec(function(error, doc){
		if(error){
			console.error(error)
		}
		res.json({
			occupiedbeds:doc
		})
	})
})


//list of all available beds
route.get('/availablebeds',(req,res)=>{
  Bed.find({patient:{$exists:false}}).populate([{path:'patient'},{path:'hospital'}]).sort({createdAt: -1}).limit(10).exec(function(error, doc){
		if(error){
			console.error(error)
		}
		res.json({
			availablebeds:doc
		})
	})
})


//fetching a single bed
route.get('/:id',(req,res)=>{
  Bed.findById({_id: req.params.id}).populate([{path:'patient'},{path:'hospital'}]).sort({createdAt: -1}).limit(10).exec(function(error, doc){
		if(error){
			console.error(error)
		}
		res.json({
			bed:doc
		})
	})
})


//updating a bed
route.put('/:id/edit', (req, res) => {
  let update = req.body
  let id = req.params.id

  Bed.findByIdAndUpdate(id, update, (err, doc) => {
    if (err) res.send({ error: 'error updating' })
    else if (doc) {
      res.send({ message: `successfully updated bed number ${doc.bedNo}` })
    } else {
      res.send({ message: 'coudn\'t find the bed you wanted to update' })
    }
  })
})



//deleting a bed
route.delete('/:id', (req, res) => {
  Bed.remove({
    _id: req.params.id
  }, function (err, doc) {
    if (err)
      res.send(err)
    res.send({
      message: 'Bed deleted successfully'
    })
  })
})



//Assign bed to Patient
route.post('/:id/assignbed',(req,res)=>{
  Bed.update({_id: req.params.id}, {patient: req.body.patient,status:'isoccupied'}, (err,doc)=>{
    if(err){console.log(err)}
    if(doc === 0) { return res.send(404).end(); }
    else{
      res.send({msg:'You assigned a bed to a patient successfully'})
    }

})
})





//releasing bed from Patient
route.post('/:id/releaseBed',(req,res)=>{
  Bed.update({_id: req.params.id}, {$unset: {patient:1,status:'available'}}, (err,doc)=>{
    if(err){console.log(err)}
    if(doc === 0) { return res.send(404).end(); }
    else{
      res.send({msg:'You released a bed from a patient successfully'})
    }

})
})













module.exports = route

