import React, { useEffect} from 'react'
import { ChatState } from '../Context/ChatProvider.js';
import { useState } from 'react';
import { Box, Button, Stack, useToast, Text, Input } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics.js';
import GroupChatModal from './miscellaneous/GroupChatModal.js';
import { BiSearchAlt2 } from 'react-icons/bi';
import { BsFilter } from 'react-icons/bs';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      // const {data} = await axios.get('/api/chat', config);
      const { data } = await axios.get("/api/chat", config);

      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Ocurred!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();

  }, [fetchAgain]);

  return (
    <Box
      display={{ base: ChatState.selectedChat ? "none" : "flex", md: "flex" }}
      flexDir='column'
      alignItems='center'
      p={3}
      bg='white'
      w={{ base: "100%", md: '31%' }}
      borderRadius='lg'
      borderWidth='1px'
    >
      <Box w={'100%'} backgroundColor='white' border={'1px'} borderColor={'ButtonShadow'} borderRadius={'md'} display='flex' py={2} px={4} ml={'2.5'} alignItems='center' justifyContent={'center'} gap={3}>
        <Box w={'100%'} borderRadius={'lg'} backgroundColor='#f0f2f5' display='flex' alignItems='center' justifyContent={'center'} gap={5} px={'2.5'} >
          <Box>
            <BiSearchAlt2 className='cursor-pointer' />
          </Box>
          <Box w='100%'>
            <Input w={'100%'} focusBorderColor='#f0f2f5' type="text" variant={'filled'} placeholder='search or start a new chat' fontSize='sm' color='bleck' />
          </Box>
          
        </Box>
        <Box>
            <BsFilter className='cursor-pointer' />
        </Box>
      </Box>
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: "30px" }}
        fontFamily='Work sans'
        display='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
      >
        My Chats
        <GroupChatModal>
          <Button
            display='flex'
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        p={3}
        bg='#F8F8F8'
        w='100%'
        h='100%'
        borderRadius='lg'
        overflowY='hidden'      
      >
        {chats ? (
          <Stack overflowY='scroll'>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor='pointer'
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius='lg'
                key={chat._id}
              >
                <Text >
                  {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <>
            <ChatLoading />
          </>
        )}
      </Box>
    </Box>
  )
};

export default MyChats;



// import React, { useEffect, useRef } from 'react';
// import { ChatState } from '../Context/ChatProvider.js';
// import { useState } from 'react';
// import { Box, Button, Stack, useToast, Text, Input } from '@chakra-ui/react';
// import axios from 'axios';
// import { AddIcon } from '@chakra-ui/icons';
// import ChatLoading from './ChatLoading';
// import { getSender } from '../config/ChatLogics.js';
// import GroupChatModal from './miscellaneous/GroupChatModal.js';
// import { BiSearchAlt2 } from 'react-icons/bi';
// import { BsFilter } from 'react-icons/bs';

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();
//   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
//   const toast = useToast();
//   const chatBoxRef = useRef(null);

//   const fetchChats = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get("/api/chat", config);
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Ocurred!",
//         description: "Failed to load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: 'bottom-left',
//       });
//     }
//   };

//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
//     fetchChats();
//     document.addEventListener('click', handleOutsideClick);

//     return () => {
//       // Remove event listener when component unmounts
//       document.removeEventListener('click', handleOutsideClick);
//     };
//   }, [fetchAgain]);

//   const handleOutsideClick = (event) => {
//     if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
//       // Clicked outside chat boxes, clear selectedChat array
//       setSelectedChat(null);
//     }
//   };

//   return (
//     <Box
//       display={{ base: ChatState.selectedChat ? "none" : "flex", md: "flex" }}
//       flexDir='column'
//       alignItems='center'
//       p={3}
//       bg='white'
//       w={{ base: "100%", md: '31%' }}
//       borderRadius='lg'
//       borderWidth='1px'
//       ref={chatBoxRef}
//     >
//       <Box w={'100%'} backgroundColor='white' border={'1px'} borderColor={'ButtonShadow'} borderRadius={'md'} display='flex' py={2} px={4} ml={'2.5'} alignItems='center' justifyContent={'center'} gap={3}>
//         <Box w={'100%'} borderRadius={'lg'} backgroundColor='#f0f2f5' display='flex' alignItems='center' justifyContent={'center'} gap={5} px={'2.5'} >
//           <Box>
//             <BiSearchAlt2 className='cursor-pointer' />
//           </Box>
//           <Box w='100%'>
//             <Input w={'100%'} focusBorderColor='#f0f2f5' type="text" variant={'filled'} placeholder='Search or start a new chat' fontSize='sm' color='bleck' />
//           </Box>
          
//         </Box>
//         <Box>
//             <BsFilter className='cursor-pointer' />
//         </Box>
//       </Box>
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: '28px', md: "30px" }}
//         fontFamily='Work sans'
//         display='flex'
//         w='100%'
//         justifyContent='space-between'
//         alignItems='center'
        
//       >
//         My Chats
//         <GroupChatModal>
//           <Button
//             display='flex'
//             fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//             rightIcon={<AddIcon />}
//           >
//             New Group Chat
//           </Button>
//         </GroupChatModal>
//       </Box>

//       <Box
//         display='flex'
//         flexDirection='column'
//         p={3}
//         bg='#F8F8F8'
//         w='100%'
//         h='100%'
//         borderRadius='lg'
//         overflowY='hidden'
//         ref={chatBoxRef}
        
//       >
//         {chats ? (
//           <Stack overflowY='scroll' ref={chatBoxRef}>
//             {chats.map((chat) => (
//               <Box
//                 onClick={() => setSelectedChat(chat)}
//                 cursor='pointer'
//                 borderBottom="1px solid #ccc"
//                 px={3}
//                 py={2}
//                 key={chat._id}
                
//               >
//                 <Text fontWeight={selectedChat === chat ? 'bold' : 'normal'}>
//                   {!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}
//                 </Text>
//                 <Text color="#777" fontSize="sm">
//                   Last message time and preview
//                 </Text>
//               </Box>
//             ))}
//           </Stack>
//         ) : (
//           <>
//             <ChatLoading />
//           </>
//         )}
//       </Box>
//     </Box>
//   )
// };

// export default MyChats;
