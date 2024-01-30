import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {

  const MONTHS = useMemo(()=>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[]);

  const [userStats, setUserStats] = useState([]);

  useEffect(()=>{
    const getStats = async()=>{
      try {
        const res = await axios.get("/users/stats", {
          //to check wheather user is authenticated or not
          headers: {
            token: ""+JSON.parse(localStorage.getItem("user")).accessToken
          }
        });

        //
        const statsList = res.data.sort(function (a,b) {
          return a._id - b._id;
        });

        // setUserStats(res.data); 
        //for each data(item we are going to set stats again and again)
        statsList.map(item=> setUserStats((prev) =>[
          ...prev,
          //according to our data for eg it lies on 6th position ie. june in MONTHS array june lie in 5th position created above 
          {name:MONTHS[item._id-1], "New User": item.total},
        ]))
      } catch (error) {
        console.log(error);
      }
    }
    getStats();
  },[MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
