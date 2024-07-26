import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import axios from 'axios'

const AddProduct = () => {

  const[image,setImage] = useState(false);
  const [productDetails,setProductDetails] = useState({
      name:"",
      image:"",
      category:"women",
      new_price:"",
      old_price:""
  });

  const AddProduct = async () => {
      
    const formData = new FormData();
    formData.append('name',productDetails.name);
    formData.append('category',productDetails.category);
    formData.append('new_price',productDetails.new_price);
    formData.append('old_price',productDetails.old_price);

    if(productDetails.image && typeof productDetails.image !=='string')
    {
      formData.append('image',productDetails.image)
    }
    try {
          const response = await axios.post('http://localhost:4000/addproduct',formData,{
            headers :{
              'Content-Type':'multipart/form-data'
            }
          })
    } catch (error) {
      console.error("Error Upload a products ",error);
    }
  }

  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

  // const imageHandler = (e) => {
  //   setImage(e.target.files[0]);
  //   }
    const handleImageUpload = (e) =>{
      setProductDetails({
        ...productDetails,
        image : e.target.files[0]
      })
    }

    console.log("Prodcuts :",productDetails);

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" value={productDetails.old_price} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" value={productDetails.new_price} onChange={(e)=>{changeHandler(e)}} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select> 
      </div>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <label for="file-input">
          <img className="addproduct-thumbnail-img" src={!productDetails.image?upload_area:URL.createObjectURL(productDetails.image)} alt="" />
        </label>
        <input onChange={handleImageUpload} type="file" name="image" id="file-input" hidden />
      </div>
      <button className="addproduct-btn" onClick={()=>{AddProduct()}}>ADD</button>
    </div>
  );
};

export default AddProduct;
