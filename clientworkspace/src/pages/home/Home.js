// rfc or rafce
import './home.scss';
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar';
import List from '../../components/List/List';
import Featured from '../../components/featured/Featured';
// import { AcUnit } from "@material-ui/icons"
import axios from "axios";


const Home = ({ type }) => {

  //created usestate and set initial state as empty when we refresh page or enter any page then list are fetched
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          // using query
          // lists->list url, if we have type defined then "?type="->this will add in query or in API
          `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          //to check wheather user is authenticated or not
          headers: {
            token: ""+JSON.parse(localStorage.getItem("user")).accessToken
          }
        }
        );
        setLists(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    //calling funtion
    getRandomLists();

    // [type, genre] -> when we change type or genre then this useEffect with function getRandomList function will call automatically.
  }, [type, genre]);

  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      {/* fetching our data from database */}
      {lists.map(list=>(
        // now we send this list={list} -> as props in List.jsx
        <List list={list} key={list.title}/>
      ))}
      
    </div>
  )
}

export default Home
