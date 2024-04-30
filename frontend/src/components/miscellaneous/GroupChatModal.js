import { Box, Button, Center, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react'
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';


const GroupChatModal = ({ children }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState();

  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get(`/api/user?search=${search}`, config);

      // const response = await fetch(`/api/user?search=${search}`, config);

      // if (!response.ok) {
      //   throw new Error('Failed to load search results');
      // }
      // const data = await response.json();

      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: "Failed to load the search Results",
        status: "error",
        duration: 5000,
        isclosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/chat/group", {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },
        config
      );

      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'buttom',
      });
    } catch (error) {
      toast({
        title: "Failed to create the chat!",
        description: error.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'buttom',
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter(sel => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers && selectedUsers.includes) {
      if (selectedUsers.includes(userToAdd)) {
        toast({
          title: "User already added",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        return;
      }
    }


    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='35px'
            fontFamily='Work sans'
            display='flex'
            justifyContent='center'
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <FormControl>
              <Input placeholder='Chat Name' mb={3} onChange={(e) => setGroupChatName(e.target.value)} />
            </FormControl>
            <FormControl>
              <Input placeholder='Add Users eg: Kirtan, Aagam' mb={1} onChange={(e) => handleSearch(e.target.value)} />

              <Box w='100%' display='flex' flexWrap='wrap'>
                {selectedUsers && selectedUsers.map(u => (
                  <UserBadgeItem key={user._id} user={u} handleFunction={() => handleDelete(u)} />
                ))}
              </Box>
              {loading ? (<Center><div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}><Spinner color='red.500' />loading</div></Center>) : (
                searchResult?.slice(0, 4).map(user => (
                  <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                ))
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal