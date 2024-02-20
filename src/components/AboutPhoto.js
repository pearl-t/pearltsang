import React from "react";
import styled from 'styled-components'
const PhotoDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  display: block;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);

  }
`;
const AboutPhoto = (props) => {
  const { img_src, text, location } = props; 
  let [isHover,setHover]=React.useState(false);  
  function MouseOver() {
    if(!isHover){setHover(true);}
  }
  function MouseOut() {
    if(isHover){ setHover(false);}
  }
  return (

    <div className="relative">
    <img 
        height="500px"
        src="https://pearltsang.s3.us-east-2.amazonaws.com/bonneville.webp"
    />
    <PhotoDiv 
        onMouseOver={MouseOver}
        onMouseOut={MouseOut} 
    >
      <div style={isHover ? {display: "block"} : {display: "none"}}>
        <div className="flex justify-content-center p-3">
          <img width="25px" src="https://pearltsang.s3.us-east-2.amazonaws.com/location.svg"/>
          <div className="ml-2">
            {location}
          </div>
        </div>
 
     
        {text}
        </div>

    </PhotoDiv>

    </div>
  );
};

export default AboutPhoto;
