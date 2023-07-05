

export default function Cards({flight}){
    const {flight_number, mission_name, launch_success, launch_year, details} = flight;
    // debugger;
    return (
        <div>
            
{flight_number} , {mission_name} , {launch_success} , {launch_year} , {details}
<br></br>
        </div>
    )
}