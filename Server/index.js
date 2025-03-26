import dotenv from "dotenv";
import express from "express";
import connectDb from "./db/index.js";

const app= express();

dotenv.config()

connectDb();

const professors = [
    {
        id: 1,
        name: "Abha Gupta",
        teaching: 4,
        evaluation: 4,
        behaviour: 4,
        internals: 4,
        average: "Medium",
        overall: "Good",
        color: "#00ff00"
    },
    {
        id: 2,
        name: "Akshara Makrarya",
        teaching: 4,
        evaluation: 4.5,
        behaviour: 4,
        internals: 4,
        average: "Medium",
        overall: "Good",
        color: "#00ff00"
    },
    {
        id: 3,
        name: "Amit Kumar Singh",
        teaching: 4,
        evaluation: 4,
        behaviour: 4,
        internals: 4,
        average: "Medium",
        overall: "Good",
        color: "#00ff00"
    },
    {
        id: 4,
        name: "Priyank Nema",
        teaching: "4.5/5",
        evaluation: "4/5",
        behaviour: "4.5/5",
        internals: "5/5",
        average: "Medium",
        overall: "Good",
        color: "#00ff00"
    },
    {
        id: 5,
        name: "Manoj Acharya",
        teaching: "4/5",
        evaluation: "3/5",
        behaviour: "3/5",
        internals: "3/5",
        average: "Medium",
        overall: "Average",
        color: "orange"
    },
    {
        id: 6,
        name: "Ujjwal Kumar Mishra",
        teaching: "2/5",
        evaluation: "1/5",
        behaviour: "4/5",
        internals: "4/5",
        average: "Low",
        overall: "Bad",
        color: "red"
    },
    {
        id: 7,
        name: "Aanjan Kumar",
        teaching: "3/5",
        evaluation: "4/5",
        behaviour: "5/5",
        internals: "5/5",
        average: "Medium",
        overall: "Good",
        color: "#00ff00"
    },
    {
        id: 8,
        name: "Chandrama Swain",
        teaching: "4.5/5",
        evaluation: "3.5/5",
        behaviour: "4/5",
        internals: "4/5",
        average: "Medium",
        overall: "Good",
        color: "#00ff00"
    },
    {
        id: 9,
        name: "Satyam Ravi",
        teaching: "4.3/5",
        evaluation: "4.6/5",
        behaviour: "5/5",
        internals: "4.3/5",
        average: "Medium",
        overall: "Good",
        color: "#00ff00"
    },
    {
        id: 10,
        name: "Govind Prasad Pandya",
        teaching: "4/5",
        evaluation: "4/5",
        behaviour: "5/5",
        internals: "3/3",
        average: "High",
        overall: "Good",
        color: "#00ff00"
    }
];

app.get("/api",(req,res)=>{
    res.send("Hello world");
})
app.get("/api/professor",(req,res)=>{
    res.send(professors);
})

const port=process.env.port || 5000;

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}/api`);
})