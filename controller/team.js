const teamodel = require('../model/team');
const mongoose = require('mongoose');
const bcyrpt  = require('bcrypt')
const jwt     = require('jsonwebtoken');

module.exports = {


register : (req,res)=>{


        teamodel.find({email:req.body.email})
       .exec()
       .then( result=>{
        if(result.length >= 1){
            res.json({
                case:'0',
                message:'mail exists' // لو الميل موجود ماضفش 
            })
        } else { // لو مش موجود ضيف
          bcyrpt.hash(req.body.password,10, (err, hash)=>{
              if(err){
                  return res.status(500).json({
                      error:err
                  })
              } else {

                  const result =  new teamodel({
                      _id : mongoose.Types.ObjectId(),
                      firstname: req.body.firstname,
                      lastname:req.body.lastname,
                      email:req.body.email,
                      password: hash,
                      status:'pending',
                      role:req.body.role
              
                  }).save() .then(result=>{
                      res.json({
                          case:'1',
                          message:'member created',
                          data:result
                      });
                  })
                  
                  .catch(err=>{
                      console.log(err);
                      res.json({
                          case:'0',
                          message:err.message
                      })
                  })
              }
          });
      
        }
       })    
  },


  login : (req,res,next)=>{




   teamodel.find({email:req.body.email}) 
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.json({
                case:'0',
                message:'mail doesn\'t found'
            })
        }

        bcyrpt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
               return res.json({
                    case:'0',
                    message:'Auth failed'
                })
            }

            if(result){
                return teamodel.find({email:req.body.email})
                .exec()
                .then(come=>{
                    return res.json({
                        case: '1',
                        message: 'Auth successful',
                        data:come
                      });
                    
                })
                
                
                
            }

            res.json({
                case:'0',
                message:'Auth failed'
            })
        })
    })
    .catch(err=>{
        res.json({
            case:'0',
            message:err.message
        })
    })
  },

  getMembers: async (req,res)=>{

    try {
        const Members = await teamodel.find()
        const response = {
            case:"1",
            message:"successful process",
            data:Members
        }

        res.json(response)
    } catch (error) {
        const response = {
            case:"0",
            message:error.message,
        }

        res.json(response)
    }

  },

  updateMember: async (req,res) =>{
        const body = {};
        for (var key in req.body) {
            if (req.body.hasOwnProperty(key)) {
                body[key] = req.body[key]
            }
        }
      try {
           await teamodel.update({
            _id :  req.params.member_id
            
        },{
            $set: body
        })

        req.body['_id'] = req.params.member_id;
            const response = {
                case: 1,
                message: 'member updated successfully',
                data: req.body
            }
            res.json(response)
          
      } catch (error) {
        const response = {
            case: 0,
            message: error.message,
        }
        res.json(response)
      }
  }

}