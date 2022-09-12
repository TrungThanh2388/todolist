import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
function Singup() {
    const nav = useNavigate ()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (e) =>{
        setEmail(e.target.value);
    }
    const handlePass = (e) =>{
        setPassword(e.target.value);
    }
    const handleSignIn = async() =>{
        let form = {
            email:email,
            password:password,
        }
        try{
            const res = await axios.post (`https://class.nodemy.vn/api/login`, form)
            localStorage.setItem('token', res.data.data.token);
            nav('/list')
        }catch(e){
            console.log(e)
        }
    }
  return (
    <div>
        <p>Trang đăng ký</p>
        <div>
        <span>email</span>
        <input onChange={handleEmail} type="text" ></input>
        </div>
        <span>mật khẩu</span>       
           <input onChange={handlePass} placeholder="input password" />      
        <div>
            <button>Đăng ký</button>
            <button onClick={handleSignIn}>Đăng nhập</button>
        </div>
        
    </div>
  )
}

export default Singup
