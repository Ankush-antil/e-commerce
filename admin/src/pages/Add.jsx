import { useState, useEffect } from "react"
import { assets } from "../assets/assets"
import { backendUrl } from "../config"
import "../style/Add.css"
import { toast } from "react-toastify"
import axios from "axios"


const Add = ({token}) => {
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")
  const [image4, setImage4] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [price, setPrice] = useState('')
  const [sizes, setSizes] = useState([])
  const [bestSeller, setBestSeller] = useState(false)
  const [availableSizes, setAvailableSizes] = useState(["S", "M", "L", "XL", "XXL"])

  useEffect(() => {
    if (subCategory === "Footwear") {
      if (category === "Kids") {
        setAvailableSizes(["1", "2", "3", "4"])
      } else {
        setAvailableSizes(["5", "6", "7", "8", "9", "10", "11", "12"])
      }
    } else {
      setAvailableSizes(["S", "M", "L", "XL", "XXL"])
    }
    // Reset sizes when category/subCategory changes
    setSizes([])
  }, [category, subCategory])

  function toggleSize(size){
    if(sizes.includes(size)){
      setSizes(sizes.filter(item => item !== size))
    }
    else{
      setSizes([...sizes, size]) 
    }
  }

  async function handleSubmit(e){
    e.preventDefault()

    try{
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('subCategory', subCategory)
    formData.append('bestSeller', bestSeller)
    formData.append('sizes', JSON.stringify(sizes))
    image1 && formData.append('image1', image1)
    image2 && formData.append('image2', image2)
    image3 && formData.append('image3', image3)
    image4 && formData.append('image4', image4)
    
            const response = await axios.post(
          `${backendUrl}/add-product`, formData,
          
          {
            headers: {
              Authorization: `Bearer ${token}`,
             
            }
          }
        );

    const result =  response.data
   
  
    if(response.status === 200){
      toast.success(result.message)
      setName('')
      setDescription('')
      setPrice('')
      setCategory('Men')
      setSubCategory('Topwear')
      setBestSeller(false)
      setImage1("")
      setImage2("")
      setImage3("")
      setImage4("")
      setSizes([])
    }
    else{
      toast.error(result.message)
    }
    }
    catch(error){
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
     <div>
      <p className="label">Upload image</p>
      <div className="image-row">
        <label htmlFor="image1">
          <img className="upload-img" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=""/>
          <input hidden type="file" id="image1" onChange={(e) => setImage1(e.target.files[0])}/>
        </label>

        <label htmlFor="image2">
          <img className="upload-img" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=""/>
          <input hidden type="file" id="image2" onChange={(e) => setImage2(e.target.files[0])}/>
        </label>

        <label htmlFor="image3">
          <img className="upload-img" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=""/>
          <input hidden type="file" id="image3" onChange={(e) => setImage3(e.target.files[0])}/>
        </label>

        <label htmlFor="image4">
          <img className="upload-img" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=""/>
          <input hidden type="file" id="image4" onChange={(e) => setImage4(e.target.files[0])}/>
        </label>
      </div>
     </div>

       <div className="full-width">
        <p className="label">Product name</p>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Type here"
          required
        />
      </div>

       <div className="full-width">
        <p className="label">Product description</p>
        <textarea
          className="textarea"
          value={description}
          rows={6}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write content here"
          required
        />
      </div>

        <div className="row">
        <div>
          <p className="label">Product category</p>
          <select className="select" onChange={(e) => setCategory(e.target.value)}>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div>
          <p className="label">Sub category</p>
          <select
            className="select"
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Footwear</option>
          </select>
        </div>

        <div>
          <p className="label">Product Price</p>
          <input
            className="input small"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </div>
      </div>

      <div>
          <p className="label">Product Sizes</p>
          <div className="sizes">
          {availableSizes.map(size => (
            <p key={size} onClick={() => toggleSize(size)} className={`size-box ${ sizes.includes(size) ? 'size-active' : 'size-inactive'}`}>{size}</p>
          ))}
          </div>
      </div>

      <div className="checkbox-row">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestSeller}
          onChange={() => setBestSeller(!bestSeller)}
        />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className="submit-btn">
        ADD
      </button>
    </form>
  )
}

export default Add
