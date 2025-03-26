import mongoose from "mongoose";

const professorSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    teaching:{
        type: Number,
        enum: [1,2,3,4]
    },
    evaluation:{
        type: Number,
        enum: [1,2,3,4]
    },
    behaviour:{
        type: Number,
        enum: [1,2,3,4]
    },
    internals:{
        type: Number,
        enum: [1,2,3,4]
    },
    average: {
        type: String,
        enum:["High","Medium","Low"]
    },
    overall:{
        type: String,
        enum:["Good","Average","bad"]
    },
},{timestamps: true})

export const Professor=mongoose.model("Professor", professorSchema);