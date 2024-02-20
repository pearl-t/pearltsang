import React from "react";
import styled from 'styled-components'
import AboutPhoto from "./AboutPhoto";
// Trying out styled components? 
const AboutMeText = styled.p`
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  margin-top: 2rem;
`;
const About = () => {
  return (
    <>
    <div className="container mx-auto App">
      <div className="mb-5">
      <AboutMeText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero volutpat sed cras ornare. Facilisis gravida neque convallis a cras semper auctor. Et netus et malesuada fames ac. Mauris pellentesque pulvinar pellentesque habitant. Leo urna molestie at elementum eu facilisis. Dui vivamus arcu felis bibendum. Massa eget egestas purus viverra. Dictumst vestibulum rhoncus est pellentesque elit. Sed vulputate mi sit amet mauris commodo. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Tempus quam pellentesque nec nam aliquam. Viverra ipsum nunc aliquet bibendum. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Aenean pharetra magna ac placerat vestibulum lectus. Vel orci porta non pulvinar. Nisi quis eleifend quam adipiscing vitae proin sagittis. Blandit turpis cursus in hac habitasse platea dictumst quisque.
    </AboutMeText>
    <AboutMeText>
      Et malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Proin sed libero enim sed faucibus turpis in eu mi. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Mi quis hendrerit dolor magna. Vel fringilla est ullamcorper eget nulla facilisi etiam dignissim. Morbi quis commodo odio aenean sed adipiscing diam donec. Ut sem nulla pharetra diam sit amet nisl suscipit. Tortor at risus viverra adipiscing at in tellus integer. Vulputate ut pharetra sit amet aliquam. Sed tempus urna et pharetra pharetra massa massa ultricies. Amet dictum sit amet justo donec enim diam vulputate. Orci porta non pulvinar neque. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Volutpat commodo sed egestas egestas fringilla phasellus. Tortor at risus viverra adipiscing. Sed id semper risus in. Arcu felis bibendum ut tristique et egestas. Laoreet suspendisse interdum consectetur libero id faucibus nisl.
    </AboutMeText>        
      </div>

    {/* <img height="500px" src="https://pearltsang.s3.us-east-2.amazonaws.com/bonneville.webp"/>    */}
    {/* <img height="500px" src="https://pearltsang.s3.us-east-2.amazonaws.com/death_valley.webp"/>         */}
    <AboutPhoto src="https://pearltsang.s3.us-east-2.amazonaws.com/bonneville.webp" text="Test Text" location="Bonneville Salt Flats"></AboutPhoto>
    </div>
    </> 
  );
};

export default About;