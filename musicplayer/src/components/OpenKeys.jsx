import React from 'react'
import { CgShortcut } from "react-icons/cg";
import { FaEquals } from 'react-icons/fa';
import { HiEquals } from "react-icons/hi2";
import UserConfigs from '../App';

const OpenKeys = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    }
    return (
    <div>
    <div className="fixed top-0 right-10 font-bold m-4 cursor-pointer " style={{ fontSize: '30px' }} onClick={toggleMenu}><CgShortcut/></div>
    <div className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white transition-transform transform ${ menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="p-6">
    <div className="text-xl font-bold">Discovery</div>
    <div className="fixed top-0 right-0 m-4 cursor-pointer" style={{ fontSize: '30px', marginTop: '20px' }} onClick={toggleMenu}><CgShortcut/></div>
    <div className="mt-4 hover:text-gray-300 ">Admin</div>
    <div className="mt-4 font-semibold text-4xl">Shortcuts?</div>
    <div className="mt-2 hover:text-gray-300 hover:underline flex"><strong>M</strong> &nbsp; = Mute Voice</div>
    <div className="mt-2 hover:text-gray-300 hover:underline flex"><strong>Enter</strong>&nbsp; = Stop</div>
    <div className="mt-2 hover:text-gray-300 hover:underline flex"><strong>Space</strong>&nbsp; = Stop</div>
    </div>
    <a href={UserConfigs.mail} className="bn5 mt-12" style={{ marginTop: '25px', marginLeft: '65px' }}>Report?</a>
    </div>
    </div>
  )
}

export default OpenKeys
