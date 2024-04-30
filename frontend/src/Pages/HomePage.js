import React, { useEffect, useState } from 'react';
import { Container, chakra, Box, Image, Text, Tabs, TabList, TabPanels, TabPanel, Tab, Flex, Stack, Avatar, Heading, FormControl, InputGroup, InputLeftElement, Input, InputRightElement, Button, FormHelperText, Link } from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import PreLoader from './PreLoader';
import { Fade } from 'react-reveal';
import { useHistory } from 'react-router-dom';
import { FaUserAlt, FaLock } from "react-icons/fa";
// import home from './../home.jpg';
import './homepage.css'


// import './homepage.css'
// import logo from './../logoWhite.png'
// import { white } from 'colors';

const HomePage = () => {

  let history = useHistory();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("userInfo"));

    try {
      setShowLoader(true);
      const loaderTimeout = setTimeout(() => {
        setShowLoader(false);
      }, 3300);

      if (user) {
        history.push("/chats");
      }

      // Cleanup function to clear the timeout if the component is unmounted
      return () => clearTimeout(loaderTimeout);
    } catch (error) {
      console.log(error)
    }
  }, [history]);

  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);
  const handleShowClick = () => {

  }

  const showPassword = () => {

  }

  return (

    <>
      <Container maxW='100%' p={0} centerContent background={showLoader ? 'white' : '#d0e0e3'}>
        <Container w='100%'>
          {showLoader ? (
            <PreLoader />
          ) : (
            <Fade top>
              <>
                {/* <Box
                  d='flex'
                  justifyContent='center'
                  textAlign='center'
                  flexDirection='row'
                  p={2}
                  bg={'whiteAlpha.900'}
                  w='100%'
                  m='40px 0 15px 0'
                  borderRadius='lg'
                  borderWidth='1px'
                  boxShadow='md'
                >
                  <Text
                    fontSize='3xl' fontFamily='work sans' color='black' d='flex'
                    justifyContent='center'
                    textAlign='center'
                    fontWeight={500}
                  >
                    WhatsChat
                  </Text>
                </Box>
                <Box
                  bg={'whiteAlpha.900'}
                  w='100%'
                  p={4}
                  borderRadius='lg'
                  borderWidth='1px'
                  boxShadow='md'
                >
                  <Tabs variant='soft-rounded' colorScheme='teal'>
                    <TabList>
                      <Tab width='50%'>Login</Tab>
                      <Tab width='50%'>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <Login />
                      </TabPanel>
                      <TabPanel>
                        <Signup />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </Box> */}
                <Flex
                  flexDirection="column"
                  width="100wh"
                  height="100vh"
                  backgroundColor="#d0e0e3"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Stack
                    flexDir="row"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* <Box display='flex' boxShadow="md" p={20} backgroundImage={home} backgroundRepeat={'no-repeat'} backgroundColor="whiteAlpha.900" w='100%' h='100%' flexDir='column' alignItems='center' justifyContent='center' backgroundSize={'cover'}> */}

                    <Box backgroundColor={'#a2c4c9'} display='flex' boxShadow="md" p={20} w='100%' h='100%' flexDir='column' alignItems='center' justifyContent='center'>
                      <Avatar bg="#45818e" />
                      <Heading color="#45818e" w='100%' zIndex={10}>Welcome</Heading>
                      <Box className='mytext flex items-center justify-center text-align-center' color='#45818e'>
                        Every new friend is a new Adventure
                      </Box>
                    </Box>
                    <Box minW={{ base: "90%", md: "100%" }}>
                      <form>
                        <Stack
                          spacing={4}
                          p="1rem"
                          backgroundColor="whiteAlpha.900"
                          boxShadow="md"
                        >
                          <Tabs variant='soft-rounded' colorScheme='gray'>
                            <TabList>
                              <Tab width='50%'>Login</Tab>
                              <Tab width='50%'>Sign Up</Tab>
                            </TabList>
                            <TabPanels>
                              <TabPanel>
                                <Login />
                              </TabPanel>
                              <TabPanel>
                                <Signup />
                              </TabPanel>
                            </TabPanels>
                          </Tabs>
                          {/* <FormControl>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color="gray.300" />}
                              />
                              <Input type="email" placeholder="email address" />
                            </InputGroup>
                          </FormControl>
                          <FormControl>
                            <InputGroup>
                              <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                                children={<CFaLock color="gray.300" />}
                              />
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                              />
                              <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                  {showPassword ? "Hide" : "Show"}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            <FormHelperText textAlign="right">
                              <Link>forgot password?</Link>
                            </FormHelperText>
                          </FormControl>
                          <Button
                            borderRadius={0}
                            type="submit"
                            variant="solid"
                            colorScheme="teal"
                            width="full"
                          >
                            Login
                          </Button> */}
                        </Stack>
                      </form>
                    </Box>
                  </Stack>
                  {/* <Box>
                    New to us?{" "}
                    <Link color="teal.500" href="#">
                      Sign Up
                    </Link>
                  </Box> */}
                </Flex>
              </>
            </Fade>
          )}
        </Container>
      </Container >


    </>
  );
}

export default HomePage;
