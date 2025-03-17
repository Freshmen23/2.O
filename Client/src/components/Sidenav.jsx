import React, { useState } from "react";
import teachLogo from "../assets/Teacher.png"
import { use } from "react";
function Sidenav(){
    const [clicked,setClicked]=useState(true);
    return(
        <>
            <div className="w-[281px] h-[80vh] dark:bg-[#4400C62B] bg-blue-400 rounded-[20px] mt-8 ml-6 dark:text-white">
                <div className="flex flex-col gap-5 pt-4">
                <button className="flex justify-start pl-8 items-center ">
                   <img className="mr-2" src={teachLogo} alt="" /> ProfCheck</button>
                <button className="flex justify-start pl-8 ">PYQs</button>
                <button className="flex justify-start pl-8 ">ODFinder</button>
                <button className="flex justify-start pl-8 ">TeamUp</button> 
                </div>
            </div>
        </>
    )
}

export default Sidenav;