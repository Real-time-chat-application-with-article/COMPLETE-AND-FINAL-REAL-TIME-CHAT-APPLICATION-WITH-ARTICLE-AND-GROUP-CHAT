
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../fbconfig/fbase';
import logo from '../images/logo1.png'
//import { db } from '../fbconfig/fbase';
import "./article.css"

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
    const getProducts=async()=>{
        try{
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

const Handle_Article = (id) =>{
    // navigate(`/articles/${id}`)
}

  return (
    <div className='Article-section'>
<div style={{ 
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    borderBottom:"4px solid rgb(255,255,255, 0.5)"
 }}>
    
    <img className='logo' width={'250px'} 
            src={logo}
            alt='logo'
          />
 
 
  <div className='heading' style={{
    display:'flex',
    gap:"20px",
  }}>

<div className="icons" onClick={()=>{  navigate("/")}}>
          <abbr title="My Chats">   <ion-icon  name="arrow-back" ></ion-icon> </abbr>
  </div>

<h3 style={{ 
    fontFamily:'monserif',
    textAlign:'center',
    padding:'30px',
    fontSize:'2rem',
    color:"white",
    textTransform:"uppercase",
    fontWeight:'bold'

 }}>User Articles</h3>

</div>


 <button className="add-button" 
 onClick={()=>{
    navigate('/add-article')
}}
 
  
 > <ion-icon  name="add" ></ion-icon>Create an article</button>
 </div>

<article className='article'>
{art.map((ar)=>(
            
        <div key={ar.id}          
          className="card" onClick={Handle_Article(ar.id)}>
          
          <div className="icons" onClick={()=>deleteProduct(ar.id)}>
          <abbr title="delete article">   <ion-icon  name="close" ></ion-icon> </abbr>
        </div>
        
          <h2 className="text-xl font-semibold">{ar.Post_title}</h2>

         
     <div className='Article-Body'>
        <img
            src={ar.Post_image}
            alt={ar.Post_image}
            className="mt-4 rounded"
          />
          <div>
               <p>{ar.Post_description}...</p>
               <a href="#">see More...</a>
          </div>
         
     </div>

            <div className='bottom-side'>

              <div className='side'>
                  <img src={ar.profile_pic} alt="" />
                  <div style={{display:"flex", flexDirection:"column"}}>
                  <p className="text-gray-500 mt-2">
                  {ar.postBy}
                     </p>
                     <p style={{color:"#ccc", fontWeight:"450"}} className="text-gray-500 mt-2">
                  {ar.createdate}
                   </p>
                  </div>
                  
              </div>
             
            <div className="mt-4 flex space-x-2">
            
            <button
              onClick={() => handleDeleteArticle(
                
                navigate(`/edit-article/${ar.id}`)
                )}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              change
            </button>
            
          </div>
              </div>   
          
        </div>
      
    
    ))}
</article>
   
  </div>
  );
};

export default Articles;
