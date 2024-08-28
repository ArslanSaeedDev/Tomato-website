import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDispaly from './../../components/FoodDisplay/FoodDispaly';



function Home() {
  const [category,setCategory]=useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategry={setCategory} />
      <FoodDispaly category={category}/>
     
    </div>
  )
}

export default Home
