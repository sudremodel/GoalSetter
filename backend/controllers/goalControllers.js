const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})
const postGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('please add a text field')
    }
    const goals = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goals)
})
const putGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("user not authorized")
    }
    const updatedgoals = await Goal.findByIdAndUpdate(req.params.id,req.body,{new: true})
    res.status(200).json({message: updatedgoals})
})
const deleteGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error("user not authorized")
    }
    await Goal.findOneAndDelete({_id: req.params.id})
    // await goal.remove;
    res.status(200).json({id: req.params.id})
})
module.exports={
    getGoals,postGoals,putGoals,deleteGoals
}