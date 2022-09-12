import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    useParams
  } from "react-router-dom";
import {message, Upload} from "antd"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function Detail() {
    let {id} = useParams();
    console.log(id)
    const [detailValue, setDetailValue] = useState([]);
    const [editInput, setEditInput] = useState();
    const [changeName, setChangeName] = useState('');
    const [changePhone, setChangePhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [imgOject, setImageOject] = useState()

    useEffect(() =>{
        axios.get(`https://class.nodemy.vn/api/mock/users/${id}`, {headers: { Authorization:`Bearer ${localStorage.getItem('token')}` } })
        .then((response) => {
          setImageUrl(response.data.data.avatar)
            setDetailValue(response.data.data)
            setChangeName(response.data.data.name)
            setChangePhone(response.data.data.phone)
        })
        .catch((error) => {
            console.log(error)
        });
    },[])
    const handleChangeName = (e) => {
      setChangeName(e.target.value)
    }
    const handleChangePhone = (e) => {
      setChangePhone(e.target.value)
    }
    const handleChange = () => {
      setEditInput(true)
    };
    const handleOke = async() => {
      let form = {
        name:changeName,
        phone:changePhone
      }
      console.log(38, form)
      try{
        const response = await axios.put(`https://class.nodemy.vn/api/mock/users/${id}`, form,
            { 
              headers: { Authorization:`Bearer ${localStorage.getItem('token')}` } 
          })

        const newData = await axios.get(`https://class.nodemy.vn/api/mock/users/${id}`,
        { 
          headers: { Authorization:`Bearer ${localStorage.getItem('token')}` } 
      })
        setChangeName(newData.data.data.name)
        setChangePhone(newData.data.data.phone)
        setDetailValue(newData.data.data)
        setEditInput(false)
       }catch(err){
         console.log(err)
       }
    }

    const handleChangeUpload = (info) => {
      const url = URL.createObjectURL(info.file.originFileObj)
      setImageOject(info.file.originFileObj)
      setImageUrl(url);
    };

    const beforeUpload = (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
    
      const isLt2M = file.size / 1024 / 1024 < 2;
    
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
    
      return isJpgOrPng && isLt2M;
    };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
   {detailValue&& 
    <div className='detail'>

    <Upload
          defaultFileList={[detailValue.avatar]}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChangeUpload}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <div style={{fontSize:20 ,padding:10}}> {editInput?<input value={changeName} onChange={handleChangeName} id="name"></input>:<p>{detailValue.name}</p>} </div>
        <div style={{fontSize:20 ,padding:10}}>{editInput?<input value={changePhone} onChange={handleChangePhone} ></input>:<p>{detailValue.phone}</p>}</div>
        <button onClick={handleChange}>Change</button> 
        <button onClick={handleOke}>ok</button>
    </div>}
    </>
  )
}

export default Detail