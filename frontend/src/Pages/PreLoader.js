import React, {useState, useEffect}from 'react';
import logo from './../logoWhite.png';
import './../App.css';
import Zoom from 'react-reveal/Zoom';
import { Container, Image } from '@chakra-ui/react';

const PreLoader = () => {
    const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const preloaderTimeout = setTimeout(() => {
      setShowPreloader(false);
    }, 3000);

    return () => {
      clearTimeout(preloaderTimeout);
    };
  }, []); 

  return showPreloader?(
    <Zoom>
      <Container height="100vh" width='500px' centerContent backgroundColor="white" display="flex" alignItems="center" justifyContent="center">
        <Image src={logo} alt="logo" width="100%" height="100%" objectFit="contain"/>
      </Container>
    </Zoom>
    // <Box
    //   position='absolute'
    //   width='100vw'
    // >
    //     <Box>
    //         <img src={logo} alt="logo" />
    //     </Box>
    // </Box>
  ) : null;
};

export default PreLoader;
