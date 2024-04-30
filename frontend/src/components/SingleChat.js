import React, { useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast, Image } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import { useEffect } from 'react';
import '../components/style.css';
import ScrollableChat from './ScrollableChat';
import Lottie from 'react-lottie';
import animationData from '../animations/typing2.json';
import logo from './../whatschat.png';
// import Zoom from 'react-reveal/Zoom';
import './../App.css'

import io from 'socket.io-client';
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    const toast = useToast();

    const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);
            const
                { data } = await axios.get(`/api/message/${selectedChat._id}`, config);

            // console.log(messages);
            setMessages(data);
            setLoading(false);

            socket.emit('join chat', selectedChat._id);
        } catch (error) {
            toast({
                title: "Error Ocurred!",
                description: "Failed to send the message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
        }
    };


    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
        // socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on('connected', () => setSocketConnected(true));
        socket.on('typing', () => setIsTyping(true));
        socket.on('stop typing', () => setIsTyping(false));
    }, [user]); //disable-eslint


    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    // console.log(notification, '........................');

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            }
            else {
                setMessages([...messages, newMessageRecieved]);
            }
        })
    })


    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            socket.emit('stop typing', selectedChat._id);
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                setNewMessage("");
                const { data } = await axios.post("/api/message", {
                    content: newMessage,
                    chatId: selectedChat._id,
                },
                    config
                );
                // console.log(data);

                socket.emit('new message', data);
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Ocurred!",
                    description: "Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
            }
        }
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // typing indicator logic      
        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 5000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timediff = timeNow - lastTypingTime;

            if (timediff >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: '16px', md: "20px" }}
                        fontWeight={'light'}
                        py={2}
                        w='100%'
                        m={0}
                        fontFamily='roboto'
                        display='flex'
                        justifyContent={{ base: 'space-between' }}
                        alignItems='center'
                        borderBottom={'ButtonFace'}
                    >
                        <IconButton
                            display={{ base: 'flex', md: 'none' }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat('')}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                <Box p={2} w={'100%'}  display={'flex'} alignItems={'center'} justifyContent={'space-between'} border={'1px solid #e2e8f0'} borderRadius={'lg'}>
                                    <span>{getSender(user, selectedChat.users).toUpperCase()} <br /> <span className='on_text' color='#c5c9c9'>online/offline</span> </span>
                                    <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                                </Box>
                            </>
                        ) : (
                            <>
                            <Box p={2} w={'100%'}  display={'flex'} alignItems={'center'} justifyContent={'space-between'} border={'1px solid #e2e8f0'} borderRadius={'lg'}>
                                <span>{selectedChat.chatName.toUpperCase()} <br /> <span className='on_text' color='#c5c9c9'>online/offline</span> </span>
                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} />
                            </Box>

                            
                            </>
                        )}
                    </Text>
                    <Box
                        display='flex'
                        flexDirection='column'
                        justifyContent='flex-end'
                        p={3}
                        bg='#E8E8E8'
                        w='100%'
                        h='100%'
                        borderRadius='lg'
                        overflowY='hidden'
                    >
                        {loading ? (
                            <Spinner size='xl' alignSelf='center' margin='auto' w={19} h={19} />
                        ) : (
                            <div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>
                        )}

                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            {isTyping ?
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        width={70}
                                        style={{ marginBottom: 12, marginLeft: 0 }}
                                    />
                                </div> : <> </>}
                            <Input
                                variant='filled'
                                bg='#E0E0E0'
                                placeholder='Enter a message...'
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box display='flex' flexDirection={'column'} gap={4} alignItems='center' justifyContent='center' h='100%'>
                    <Box display='flex' flexDirection={'row'} alignItems='center' justifyContent='center'>
                        <Image
                            borderRadius='full'
                            boxSize='100px'
                            src={logo}
                            alt='watschat'
                            className='rounded-full'
                        />
                        <Text color={'#1b6869'} fontFamily='Source sans pro' fontSize={'3xl'}>WhatsChat</Text>
                    </Box>
                    <Text fontSize='xl' color={'#76a5af'} fontWeight='light' pl={7} pb={3} fontFamily='Source sans pro' >
                        click on a user to start chatting
                    </Text>
                </Box>
            )
            }
        </>
    )
}

export default SingleChat;
