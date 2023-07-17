import { useState } from "react";
import "./App.css";

export default function Cards({ flight }) {
  const [readMore, setReadmore] = useState(false);
  const { flight_number, mission_name, launch_success, launch_year, details } =
    flight;
  const site_name = flight.launch_site.site_name;
  const land_success = flight.rocket.first_stage.cores[0].land_success;
  const video_link = flight.links.video_link;
  // debugger;
  return (
    <div>
       <div id="image">
            <img src={flight.links.mission_patch_small} alt="Image cannot be displayed" />
            </div>
      <div id="each-flight-detail">
        Mission : {mission_name} #{flight_number}
      </div>
      <div id="each-flight-detail">
        Launch Success : {launch_success ? "True" : "False"}
      </div>
      <div id="each-flight-detail">Launch Year : {launch_year}</div>
      <div id="each-flight-detail">Launch Site : {site_name}</div>
      <div id="each-flight-detail">
        Land Success : {land_success ? "True" : "False"}
      </div>
      <div id="each-flight-detail">
        Details :{readMore === false ? `${details}`.substring(0, 20) : details}
        <button onClick={(e) => setReadmore(!readMore)}>
          {readMore ? "readless" : "readmore"}
        </button>
      </div>
    </div>
  );
}
