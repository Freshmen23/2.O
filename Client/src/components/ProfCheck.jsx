import React from "react";

function ProfCheck(){
    return(
        <>
            <section className=" dark:bg-[#4400C62B] bg-blue-400 mr-6 rounded-[20px] mt-8 ml-[10rem] w-[70vw] h-[80vh]" >
                <div className="text-[#FFFF00] pt-4 ml-5">Search with teachers name</div>
                <div className="teacher_name flex justify-center">
                    <input type="text" placeholder="Teacher Name"/>
                    <button className="bg-[#FFFF00] text-[#5400FF] rounded-[20px]">Search</button>
                </div>
                <div className="review flex dark:text-[#FFFF00] justify-evenly">
                    <div className="left-rev ">
                        <div className="flex justify-evenly">Teaching:<p className="dark:text-white">5</p></div>
                        <div className="flex justify-evenly">Evaluation:<p className="dark:text-white">5</p></div>
                        <div className="flex justify-evenly">Behaviour:<p className="dark:text-white">5</p></div>
                    </div>
                    <div className="rigth-rev ">
                        <div className="flex justify-evenly">Internal:<p className="dark:text-white">5</p></div>
                        <div className="flex justify-evenly">Average:<p className="dark:text-white">5</p></div>
                        <div className="flex justify-evenly">No. of Reviews:<p className="dark:text-white">5</p></div>
                    </div>
                </div>
                <div className="centere-overall flex text-[#FFFF00] justify-center">
                    <div className="flex  justify-evenly">Overall: <p className="dark:text-white">5</p> </div>
                </div>
            </section>
        </>
    )
}

export default ProfCheck;