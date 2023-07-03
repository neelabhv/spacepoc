import {useEffect, useState} from 'react';
import axios from 'axios';
// import { URLSearchParams } from 'url';

const BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100&";
var UPDATED_URL = "";

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
            console.log("***************** printing data state");
            console.log(result.data);
        }).catch((err)=>{
            console.error(err);
        })
    },[]);

    const renderYear=()=>time.map((yr)=><button value={yr} onClick={(e)=>{updateFilter("launch_year",yr)}}>{yr}</button>)

    useEffect(()=>{
        console.log("printing string : " + new URLSearchParams(filters).toString());
        // debugger;
        var queryParams = new URLSearchParams(filters).toString();

        UPDATED_URL=BASE_URL+queryParams;
        axios.get(UPDATED_URL)
        .then(result=>{
            console.log("API called on updated filters");
            console.log(result.data);
            setApidata(result.data);
        })
        .catch(err=>{
            console.log(err);
        })
        console.log(queryParams);
        console.log(UPDATED_URL);
    },[filters]);

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
            onClick={(e)=>updateFilter("launch_success" , e.target.value)}>launch TRUE</button>
            <button value="false" id="launch_success" 
            onClick={(e)=>updateFilter("launch_success" , e.target.value)}>launch FALSE</button>

<button value="true" id="land_success" 
            onClick={(e)=>updateFilter("land_success" , e.target.value)}>landing TRUE</button>
            <button value="false" id="land_success" 
            onClick={(e)=>updateFilter("land_success" , e.target.value)}>landing FALSE</button>
        </div>
    </div>
    );
}