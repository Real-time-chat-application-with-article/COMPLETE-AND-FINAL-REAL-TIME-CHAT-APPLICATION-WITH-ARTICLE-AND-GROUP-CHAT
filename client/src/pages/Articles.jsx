/* src/components/Articles.jsx
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { db } from '../fbconfig/fbase';

const Articles = () => {
  // Placeholder article data (replace with your actual data)

  const [articles, setArticles] = useState([]);
  const [art, setArt] = useState([]);
  const user = useSelector(state => state?.user)
  console.log(user)
  // Function to delete an article
  const handleDeleteArticle = (articleId) => {
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== articleId)
    );
  };
const navigate=useNavigate()
const articleCollectionRef=collection(db,'articles')
useEffect(()=>{
  console.log('good night')
    const getProducts=async()=>{
        try{
          console.log('working ....')
         
            const data=await getDocs(articleCollectionRef);
            const filteredData=data.docs.map((doc)=>({
                ...doc.data(),
                id:doc.id,
            }))

         
            console.log(data)
            console.log(filteredData)
         
            setArt(filteredData)
           console.log(articles)
            console.log('FETCH successful')
           
            }    
        catch(err){
            console.log(err.message)
           

        }
        console.log('use')

    };
    getProducts()
    
    
},[])

const deleteProduct=async(id)=>{
    
  const proDoc=doc(db,'articles',id);
  
  await deleteDoc(proDoc)
  window.location.reload()

}
  return (
    <>
<div style={{ 
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around'
 }}>
 <FaArrowAltCircleLeft style={{ 
    fontSize:'30px',
    marginTop:'35px'

}}
onClick={()=>{
    navigate(-1)
}}
  />
<h3 style={{ 
    fontFamily:'monserif',
    textAlign:'center',
    padding:'30px',
    fontSize:'26px',
    fontWeight:'bold'

 }}>My Articles</h3>
 <button className="bg-green-500 p-2 text-white rounded" 
 onClick={()=>{
    navigate('/add-articles')
}}
 style={{ 
    height:'fit-content',
    marginTop:'30px'
  }}
  
 >Add new article</button>
 </div>

    {art.map((ar)=>(<div key={ar.id} className="bg-gray-100" style={{ 
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        flexWrap:'wrap',
        gap:'20px',
        padding:'20px'
     }}>
    
      
        <div
          
          className="bg-white p-4 rounded  shadow w-full md:w-1/2 lg:w-1/3 xl:w-1/4"

          style={{ 
            height:"fit-content",
            width:"35rem"
           }}
        >
          <h2 className="text-xl font-semibold">{JSON.stringify(ar.title)}</h2>
          <p className="text-gray-600"></p>
          <p className="text-gray-500 mt-2">
            Added by {JSON.stringify(ar.addedby)}
          </p>
     
            <p>{JSON.stringify(ar.description)}</p>
               <img
            src={ar.image}
            alt='nnnnnn'
            className="mt-4 rounded"
          />
          <div className="mt-4 flex space-x-2">
            <button
              // onClick={() => handleDeleteArticle(art.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={()=>deleteProduct(ar.id)}
            >
              Delete
            </button>
            <button
              onClick={() => handleDeleteArticle(
                
                navigate(`/edit-article/${ar.id}`)
                )}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              // onClick={() => handleDeleteArticle(art.id)}
              className="bg-purple-500 text-white px-2 py-1 rounded"
            >
              Read more
            </button>
          
          </div>
        </div>
      
    
    </div>))}
  </>
  );
};

export default Articles;*/
