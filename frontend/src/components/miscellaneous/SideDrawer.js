import { Box, Button, Text, Tooltip, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Flex, Center, Spacer, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast, Spinner, WrapItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../Context/ChatProvider.js';
import ProfileModal from './ProfileModal.js';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading.js';
import UserListItem from '../UserAvatar/UserListItem.js';
import { getSender } from '../../config/ChatLogics.js';
import NotificationBadge, { Effect } from 'react-notification-badge';
// import { BiSearchAlt2 } from 'react-icons/bi';

const SideDrawer = () => {

  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();


  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push('/');
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something to search",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Filed to load the search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });

    }
  };

  //   const handleSearch = async () => {
  //   // Check if the search query is empty
  //   if (!search) {
  //     // Display a warning toast if search query is empty
  //     toast({
  //       title: "Please Enter something to search",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top-left",
  //     });
  //     return;
  //   }

  //   try {
  //     // Set loading state to indicate that search is in progress
  //     setLoading(true);

  //     // Configure request headers with authorization token
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };

  //     // Make GET request to search endpoint with search query
  //     const response = await axios.get(`/api/user?search=${search}`, config);

  //     // Update search results with response data
  //     setSearchResult(response.data);
  //   } catch (error) {
  //     // Display an error toast if request fails
  //     toast({
  //       title: "Error Occurred!",
  //       description: "Failed to load the search results",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom-left",
  //     });
  //   } finally {
  //     // Reset loading state regardless of success or failure
  //     setLoading(false);
  //   }
  // };


  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return (
    <>
      <Flex background='white'>
        <Tooltip label="Search Users to Chat" hasArrow placement='bottom'>
          <Button variant='ghost' onClick={onOpen}>
            <i class='fas fa-search'></i>
            <Text d={{ base: 'none', md: 'flex' }} px='4' >
              Search User
            </Text>
          </Button>
          {/* <Box w={{base: "100%", md:'30.5%'}} backgroundColor='white' border={'1px'} borderColor={'ButtonShadow'} borderRadius={'md'} display='flex' py={2} px={4} ml={'2.5'} alignItems='center' justifyContent={'center'} >
            <Box w={'100%'} borderRadius={'lg'} backgroundColor='#f0f2f5' display='flex' alignItems='center' justifyContent={'center'} gap={5} px={'2.5'} >
              <Box>
                <BiSearchAlt2 className='cursor-pointer'/>
              </Box>
              <Box w='100%'>
                <Input w={'100%'} focusBorderColor='#f0f2f5' type="text" variant={'filled'} placeholder='search or start a new chat'  fontSize='sm' color='bleck' />
              </Box>
            </Box>
          </Box> */}
        </Tooltip>

        <Spacer />

        <Center>
          <Text color={'#3d4242'} fontFamily='Source sans pro' fontSize={'2xl'}>WhatsChat</Text>
        </Center>

        <Spacer />

        <Box>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize='2xl' m={1} />
            </MenuButton>
            <MenuList pl={3} >
              {!notification.length && "No new Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}` : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} background='white' rightIcon={<ChevronDownIcon />}>
              <WrapItem>
                <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />{''}
              </WrapItem>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder='Search by name or email'
                mr={2}
                focusBorderColor='teal.400'
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
              />
              <Button onClick={handleSearch}>Go</Button>

            </Box>
            {loading ?
              <ChatLoading />
              : (
                searchResult?.map(user => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
            {loadingChat && <Spinner ml='auto' display='flex'alignItems='center'/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer
