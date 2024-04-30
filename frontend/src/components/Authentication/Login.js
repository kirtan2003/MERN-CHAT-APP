import React, { useState } from 'react';
import { FormControl, Box, chakra, FormLabel, Input, InputGroup, InputRightElement, VStack, Button, useToast, InputLeftElement } from '@chakra-ui/react';
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Login = () => {
    //   const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);

    const handleClick = () => setShow(!show);

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Fields",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }

        // console.log(email, password);
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            toast({
                title: "Login Successfull",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');

        } catch (error) {
            toast({
                title: 'Error Occured!',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing='5px'>
            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input focusBorderColor='</Box>' placeholder='Enter Your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                    />
                    <Input focusBorderColor='teal.400' type={show ? 'text' : "password"} placeholder='Enter Your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Box w='100%' pb={3} borderBottom='1px' borderBottomWidth={'thin'} borderBottomColor={'gray.400'}>
                <Button
                    colorScheme='teal'
                    width='100%'
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Login
                </Button>
            </Box>
            <Box w='100%' pt={2}>
                <Button

                    variant='solid'
                    backgroundColor={'#45818e'}
                    _hover={{backgroundColor:'#366873'}}
                    color={'white'}
                    width='100%'
                    onClick={() => {
                        setEmail('guest@example.com');
                        setPassword('123456');
                    }}
                >
                    Get Guest User Credentials
                </Button>
            </Box>
        </VStack>
    )
}

export default Login;
