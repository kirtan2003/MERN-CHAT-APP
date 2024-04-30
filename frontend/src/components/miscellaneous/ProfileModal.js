import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Image, Text, Flex } from '@chakra-ui/react';
import React from 'react'

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton
                    d={{ base: 'flex' }}
                    icon={<ViewIcon />}
                    onClick={onOpen}
                />
            )}
            <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    {/* <Center><Flex justifyContent='center'> */}
                        <ModalHeader
                            fontSize='30px'
                            fontFamily='Work sans'
                        display='flex'
                        justifyContent='center'
                        >
                            {user.name}
                        </ModalHeader>
                        {/* </Center></Flex> */}
                    <ModalCloseButton />
                    <Flex  flexDirection='column' alignItems='center' justifyContent='space-between' >
                        <ModalBody
                        //  d='flex' 
                        //  flexDir='column'
                        //  justifyContent='center'
                        //  alignItems='center'
                        >
                            <Flex justifyContent='center' flexDirection='column' alignItems='center'>

                                <Image
                                    borderRadius='full'
                                    boxSize='150px'
                                    src={user.pic}
                                    alt={user.name}
                                />

                                <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans" paddingTop='15px'>
                                    Email: {user.email}
                                </Text>
                            </Flex>
                        </ModalBody>
                    </Flex>

                    <ModalFooter>
                        <Button color={'white'} backgroundColor={'#134f5c'} _hover={{backgroundColor:'#45818e'}} mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfileModal



