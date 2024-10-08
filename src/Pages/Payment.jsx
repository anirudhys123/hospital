import React, { useContext, useEffect, useState } from 'react';
import { Box, Image, Flex, Input, FormLabel ,Checkbox, CheckboxGroup, Button, HStack,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Heading,
    ModalCloseButton, useDisclosure,Text, useToast } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContextProvider';

const Payment = () => {

    const toast = useToast()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
     const [name,setName] = useState('')
     const [cardNum,setCardNum] = useState(null)
     const [cvv,setCvv] = useState(null)
     const [month,setMonth] = useState(null)
     const [year,setYear] = useState(null)
     const [carddata,setCarddata] = useState([])
     const [status,setStatus] = useState(false)
     const [upi,setUpi] = useState(null)
    //  const [payprice,setPayprice] = useState(0)

     const {price} = useContext(AuthContext)

    //  const handleChange = (e) => {
    //     setCarddata([...carddata,[e.target.name] = e.target.value ])
    //  }

    // const fetchPrice = (id) => {
    //   axios.get(`http://localhost:8080/doctors/${id}`)
    // }

    // useEffect(()=>{
    //   price.map((el)=>{
    //     return setPayprice(el.price)
    //   })
    // },[])
    


     const handleSubmitForm = (e) => {
        e.preventDefault()
        if(!name || !cardNum || !cvv || !month || !year  ){
            toast({
                title: 'Payment Failed',
                description: 'All fields are required',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'top',
              });
              return;
        }
       if(cardNum.toString().length != 12){
        toast({
            title: 'Payment Failed',
            description: 'Please Enter a valid Number',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
          return;
       }
       if(cvv.length != 3){
        toast({
            title: 'Payment Failed',
            description: 'Please Enter a valid CVV',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
          return;
       }
       if(year < 2023 ){
        toast({
            title: 'Payment Failed',
            description: 'Card Expired',
            status: 'warning',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
          return;
       }else{
        setStatus(true)
       }
     }

    //  if(upi){
    //   setStatus(true)
    //  }'

    if(status){
      setTimeout(()=>{
        navigate('/patients')
      },4000)
   }


    const makeScript = (url) => {
      return new Promise((resolve)=>{
        const script = document.createElement("script")
        script.src = url;
        script.onload = () => {
          resolve(true)
        }
        script.onerror = () =>{
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }
 
    const handlePayment = async() => {
      let response = await makeScript('https://checkout.razorpay.com/v1/checkout.js')
      if(!response){
        toast({
          title: 'Something went wrong',
          description: 'Please try again!',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        return;
      }
      const options = {
        key : "rzp_test_U7guy5cpCvpcZA",
        currency : 'INR',
        amount : price * 100,
        name : "Bizwy",
        description: 'Payment successfully Done!',
        handler : (res) => {
          if(res.razorpay_payment_id){
              navigate('/patients')
          }
        }
      } 
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    }
  
  
  

  return (
    <Flex mt="100px" justifyContent={{base:"center" , sm :"center" , md:"space-around" , lg:"space-around" ,xl:"space-around" , "2xl":"space-around"}} direction={{base:"column", sm:"column" , md:"row" , lg:"row" , xl : "row" , "2xl" : "row"}}>
      

      <Box w="50%" m="30px" >
        <Box>
          <Heading as={"h2"} size={"lg"} mb="10px" color={"#222566"}>Appointment Fee : ₹ {price} </Heading>
        </Box>
        {/* <form onSubmit={handleSubmitForm}> */}
        <FormLabel p="10px" color={"white"} bg={'#222566'}>Credit/Debit Card</FormLabel>

        <Box mb="10px">
      
          <Input  w="95%"   type="text" placeholder="CardHolder's Name" name='name' value={name} onChange={(e)=>setName(e.target.value)} />
        </Box>
        <Flex w="95%" mb="10px" justifyContent={"space-around"}>

        <Box w="50%" >
          
          <Input type="number" placeholder="Card Number" name='cardNum' value={cardNum} onChange={(e)=>setCardNum(e.target.value)} />
        </Box>

        <Box w="49%">
          <Input type="string" placeholder="CVV" name='cvv' value={cvv} onChange={(e)=>setCvv(e.target.value)} />
        </Box>
        </Flex>
        <Flex w="95%"  justifyContent={"space-around"}>

        <Box w="50%">
          
          <Input type="number" placeholder="MM/YY" name='month' value={month} onChange={(e)=>setMonth(e.target.value)} />
        </Box>

        <Box w="49%">
         
          <Input type="number" placeholder="Expiry Year" name='year' value={year} onChange={(e)=>setYear(e.target.value)} />
        </Box>
        </Flex>
      <Box p="5px">
      <Checkbox mt="10px" defaultChecked>Save Card Details For Future</Checkbox>
      </Box>
   
   
      <Box mt="10px" p="5px">
      {
        status ? 
       

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={"green"} fontSize={"40px"} textAlign={"center"}>Thank You!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"center"} alignItems={"center"} borderRadius="50%" >
            <FaCheck color='green' fontSize={"150px"}  />
            </Flex>
            <Flex justifyContent={"center"} alignItems={"center"}>

            <Text color={"#222566"} fontSize="18px" as="b" textAlign={"center"} mt="30px">Payment Successful</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      :  <Button color={'white'}
      onClick={handlePayment}
      type='submit'
        bg={'#222566'}
        _hover={{
            bg: '#3879E9',
          }}>Pay Now</Button>
       }
      </Box>
            {/* </form> */}
      <Box mt="30px">
      <FormLabel  p="10px" color={"white"} bg={'#3879E9'}>UPI</FormLabel>
      <Box >
        <HStack>
            <Image src="https://cdn-icons-png.flaticon.com/512/270/270799.png?w=740&t=st=1683531867~exp=1683532467~hmac=c33853ef2dffd7dd06be7379621e7f0e136565092f237d9bca174767fd8fb224" width={"50px"} borderRadius={"50%"} />
            <Input ml="30px" type='number' placeholder='Enter UPI ID' w="30%" value={upi} onChange={(e)=>setUpi(e.target.value)}  />
            <Button  color={'white'}
          bg={'#222566'}
          // onClick={onOpen}
          _hover={{
            bg: '#3879E9',
            
          }}>Pay Now</Button>
        </HStack>
        <HStack mt="20px">
            <Image src="https://cdn-icons-png.flaticon.com/512/825/825454.png?w=740&t=st=1683532131~exp=1683532731~hmac=bb1126fbad4f895b4b4a3b586a6ffba13b903c34ca6c89f30b9117f86354b5ca" width={"50px"} borderRadius={"50%"} />
            <Input ml="30px" type='number' placeholder='Enter UPI ID' w="30%" value={upi} onChange={(e)=>setUpi(e.target.value)}  />
            <Button  color={'white'}
          bg={'#222566'}
          _hover={{
            bg: '#3879E9',
          }}>Pay Now</Button>
        </HStack>
        <HStack mt="20px">
            <Image src="https://cdn-icons-png.flaticon.com/512/196/196566.png?w=740&t=st=1683532246~exp=1683532846~hmac=15e1bff948042d30147dcb7b74079d842179146776d00939059556ed755dfd23" width={"50px"} borderRadius={"50%"} />
            <Input ml="30px" type='number' placeholder='Enter UPI ID' w="30%" value={upi} onChange={(e)=>setUpi(e.target.value)}   />
            <Button  color={'white'}
          bg={'#222566'}
          _hover={{
            bg: '#3879E9',
          }}>Pay Now</Button>
        </HStack>
      </Box>
      </Box>
      </Box>
    </Flex>

  );
};

export default Payment;


