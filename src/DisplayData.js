import {useEffect, useState} from 'react';
import axios from 'axios';


const BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100&";

export default function DisplayData(){
    const [apiData, setApidata] = useState([]);
    const [filters, setFilters] =  useState({
        launch_success: null,
        land_success: null,
        launch_year: null,
      });
      const time = [
        2006,2007,2008,2009, 2010,2011, 2012,2013,2014,2015,2016,2017,2018,2019,
        2020,2021,2022,2023,2024
      ];
   

    useEffect(()=>{
        axios.get(BASE_URL)
        .then((result)=>{
            setApidata(result.data);
        }).catch((err)=>{
            console.error(err);
        })
    },[]);

    const renderYear=()=>time.map((yr)=><button value={yr}>{yr}</button>)

    const updateFilter=(filter, value)=>{
        console.log("updating filters ******** + ", filter + " " + value + " " + filters[filter]);
        if(filters[filter]===value){
            setFilters({...filters,[filter]:null})
        }
        else{
            setFilters({...filters,[filter]:value})
        }
        

    }
    return (
    <div>
        Hello Display
        <div>
            {renderYear()}
            <button value="true" id="launch_success" 
            onClick={(e)=>updateFilter("launch_success" , e.target.value)}>TRUE</button>
            <button value="false" id="launch_success" 
            onClick={(e)=>updateFilter("launch_success" , e.target.value)}>FALSE</button>
        </div>
    </div>
    );
}