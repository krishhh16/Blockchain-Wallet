import React from 'react'
import VimptIcon from './Icon'
function Navbar() {
    return (
        <div className="border-b mx-auto flex justify-between ">
            <div className="w-1/2 flex flex-col justify-center items-start">
                <VimptIcon/>
                <h1 className="mt-[-4vh] font-bold font-serif ml-4 mb-2 " >
                    Your wallet's home
                </h1>
            </div>
        </div>
    )
}

export default Navbar
