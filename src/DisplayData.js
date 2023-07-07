import {useEffect, useState} from 'react';
import axios from 'axios';
import Cards from './Cards';
import { browserHistory } from 'react-router';
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
            // window.location.reload();
            window.history.pushState(null,null,"spaceX");
            setApidata(result.data);
            console.log("***************** printing initial api data state");
            console.log(result.data);
        }).catch((err)=>{
            console.error(err);
        })
    },[]);

    const renderYear=()=>time.map((yr)=><button value={yr} onClick={(e)=>{updateFilter("launch_year",yr)}}>{yr}</button>)

    useEffect(()=>{
        var queryParams = new URLSearchParams();
        const searchParams = new URLSearchParams(filters);
        Object.entries(filters).forEach((property)=>{
            if(property[1]!=null){
                queryParams.append(property[0],property[1]);
            }
        });
        UPDATED_URL=BASE_URL+queryParams;
        // console.log("Updated params : " + queryParams.toString().length);
        window.history.pushState(null,null,queryParams.toString().length!==0 ? queryParams.toString() : "spaceX");
        axios.get(UPDATED_URL)
        .then(result=>{
            // console.log("queryparams is : " + queryParams===null);
            console.log(window.history);
            setApidata(result.data);
            // console.log("***************** printing updated api data state");
            // console.log(result.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[filters]);

    const updateFilter=(filter, value)=>{
        UPDATED_URL = BASE_URL; 
        if(filters[filter]===value){
            setFilters({...filters,[filter]:null});
            return;
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
        <div>
            {apiData.map(flight => 
                <Cards flight={flight}></Cards>    
            )}
        </div>
    </div>
    );
}