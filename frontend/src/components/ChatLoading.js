import { SkeletonText, Stack, SkeletonCircle, Box } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
  return (
    // <Stack>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    //   <Skeleton height='45px'/>
    // </Stack>
    <Stack display={'flex'} flexDirection={'column'}>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
      <Box padding='4' boxShadow='lg' bg='white' display='flex' borderRadius='md' flexDirection='row' alignItems={'center'} gap={5}>
        <SkeletonCircle size='7' />
        <SkeletonText w={'50%'} noOfLines={2} spacing='2' skeletonHeight='2' />
      </Box>
    </Stack>
  )
}

export default ChatLoading
