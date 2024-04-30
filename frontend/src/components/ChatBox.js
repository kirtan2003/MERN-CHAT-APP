import React from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {

  const {selectedChat} = ChatState();

  return (
    <Box display={{base: selectedChat ? 'flex' : 'none', md:'flex'}}
     alignItems='center'
     flexDir='column'
     px={2}
     pb={2}
     pt={1}
     bg='white'
     w={{base: '100%', md: '68%'}}
     borderRadius='lg'
     borderWidth='1px'
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
