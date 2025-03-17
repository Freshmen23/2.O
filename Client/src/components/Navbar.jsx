import React from "react";
import LogoSmall from "../assets/Logo_small.png"
import ThemeToggle from "./ThemeToggle";
function Navbar(){

    return(
        <>
            <div className="dark:bg-[#4400C62B] bg-blue-400 dark:text-white mt-4 mx-6 p-4 flex justify-between items-center rounded-[20px]">
                <img className="w-[60px] mx-5 " src={LogoSmall} alt="logo" />
                <ul className="flex gap-5 items-center">
                   <ThemeToggle/>
                  <li className=""><a href="#">About</a></li>  
                  <li><a href="#">Report Bug</a></li>  
                  <li><a href="#">Contact</a></li>  
                  <button className="bg-[#FFFF00] text-[#5400FF] rounded-[20px] w-[100px] h-[60px]"><a href="#">Login</a></button> 
                </ul>
            </div>
        </>
    )

}

export default Navbar;