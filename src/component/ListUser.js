import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Pagination } from 'antd';
import './tes.css'
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
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

function ListUser() {
  // let {id} = useParams();
  //   console.log(12345,id)
    const [listUsera, setListUsera] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [imgOject, setImageOject] = useState()
    const [count, setCount] = useState(1);
    const [Pagination1, setPagination1] = useState({
      total:0,
      current:1,
      pagesize:10,
    });
  const showModal = () => {
    setIsModalVisible(true);
  };
console.log(49, Pagination1);
  const handleOk = async() => {
    const addname = document.querySelector('#name').value;
    const addPhone = document.querySelector('#phone').value;
    const addMail = document.querySelector('#mail').value;
    const addPassword = document.querySelector('#password').value;
    const formData = {
      email:addMail,
      password: addPassword,
      phone: addPhone,
      name: addname,
    }
    try{
      let formInput = document.querySelector('#info');
      const newdata = new FormData(formInput);
      newdata.append('myFile', imgOject);
      const res = await axios.post('https://class.nodemy.vn/api/mock/users', newdata, 
      {headers:{ Authorization:`Bearer ${localStorage.getItem('token')}` }});   
      
    }catch(err){
      console.log(err)
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
 
  const handleChange = (info) => {
    const url = URL.createObjectURL(info.file.originFileObj)
    setImageOject(info.file.originFileObj)
    setImageUrl(url);
  };

  const handleDelete=async(id)=>{
    try{
     await axios.delete(`https://class.nodemy.vn/api/mock/users/${id}`,{headers: { Authorization:`Bearer ${localStorage.getItem('token')}` } })
     setCount(count+1)
    }catch(e){
      console.log(e);
    }
  }
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
    useEffect(() =>{
      console.log(106, Pagination1);
        axios.get(`https://class.nodemy.vn/api/mock/users?page=${Pagination1.current}&size=${Pagination1.pageSize}`, { 
            headers: { Authorization:`Bearer ${localStorage.getItem('token')}` } 
        }).then((data) =>{
            setListUsera(data.data.data)
            setPagination1(oldPaging =>{
              console.log(112, oldPaging);
              return {
                ...oldPaging,
                current:data.data.current,
                total:data.data.total,
              }
            })
          })
        .catch (e=>
        console.log(e))     
},[Pagination1.current, count])

  const pagePagination = (page, pageSize)=>{
    setPagination1(oldPaging=>({
    ...oldPaging,
    current: page,
    pageSize: pageSize,
  }))

  setCount(count+1)
}

  return (
    <div>
      <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
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
        <form id='info'>
          <input placeholder='Name' id='name' name='name'/>
          <input placeholder='Phone' id='phone' name='phone '/>
          <input placeholder='Mail' id='mail' name='email'/>
          <input placeholder='Password' id='password' name='password'/>
        </form>
      </Modal>
    </>
        <div className='listuser'>
        {listUsera.length > 0 && listUsera.map((data)=>{
         return  (
         <div key={data._id} className='listuserdetail'>
              <Link to={`/detail/${data._id}`}> 
                <img style={{width:200, height:200}} src={data.avatar}/>
                <p >{data.name}</p>
                <p>{data.phone}</p>
              </Link>
                <button onClick={()=>handleDelete(data._id)}>Delete</button>
        </div>)
        })}
        </div>
        <Pagination total={Pagination1.total} current={Pagination1.current}
        pageSize={Pagination1.pagesize} onChange={pagePagination}/>;
    </div>
  )
}

export default ListUser