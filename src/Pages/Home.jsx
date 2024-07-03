import {
  Box,
  Container,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  Flex,
  Button,
  Grid
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import 'animate.css';
import imag1 from '../Assets/vectorImage2.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Form, useNavigate } from 'react-router-dom';
import SliderPro from '../components/SliderPro';
import BookAppointForm from '../components/BookAppointForm';
import { Link } from 'react-router-dom';
import Doctors from './Doctors';
import { SearchContext } from '../Contexts/SearchContextProvider';

const Home = () => {
  const navigate = useNavigate();
  const naviagte1 = useNavigate();

  const { status } = useContext(SearchContext);

  const handleBook = () => {
    return naviagte1('/doctors');
  };

  return (
    <>
      {status ? (
        <Doctors />
      ) : (
        <Box>
          <Box m="50px" p="20px">
            <Heading
              mt="30px"
              fontWeight={'500'}
              color={'#222566'}
              as="h1"
              size="xl"
              textAlign={'center'}
            >
              Categories
            </Heading>
            <Flex
              w="100%"
              m="20px auto"
              overflowX="auto"
              whiteSpace="nowrap"
              gap="10px"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
            >
              <Link to="/doctors">
                <Box w="120px" textAlign="center" mx="10px">
                  <Image
                    borderRadius="50%"
                    src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=626&ext=jpg&ga=GA1.2.205266656.1682997817&semt=sph"
                  />
                  <Heading size="sm" as="h4" mt="3px">
                    All Doctors
                  </Heading>
                </Box>
              </Link>
              <Link to="/cardiology">
                <Box w="120px" textAlign="center" mx="10px">
                  <Image
                    borderRadius="50%"
                    src="https://img.freepik.com/premium-vector/medical-stethoscope-with-human-heart-health-care-medicine_284092-2696.jpg?size=626&ext=jpg&ga=GA1.2.205266656.1682997817&semt=ais"
                  />
                  <Heading size="sm" as="h4" mt="3px">
                    Cardiology
                  </Heading>
                </Box>
              </Link>
              <Link to="/neurology">
                <Box w="120px" textAlign="center" mx="10px">
                  <Image
                    borderRadius="50%"
                    src="https://img.freepik.com/free-vector/human-nervous-system_53876-90443.jpg?size=626&ext=jpg&ga=GA1.1.205266656.1682997817&semt=ais"
                  />
                  <Heading mt="5px" size="sm" as="h4">
                    Neurology
                  </Heading>
                </Box>
              </Link>
              <Link to="/pulmonologist">
                <Box w="120px" textAlign="center" mx="10px">
                  <Image
                    borderRadius="50%"
                    height = "125px"
                    src="https://img.freepik.com/free-vector/stethoscope-lungs-earth-globe_1308-126019.jpg?size=626&ext=jpg&ga=GA1.1.205266656.1682997817&semt=ais"
                  />
                  <Heading size="sm" as="h4" mt="3px">
                    Pulmonology
                  </Heading>
                </Box>
              </Link>
              <Link to="/orthopedics">
                <Box w="120px" textAlign="center" mx="10px">
                  <Image
                    borderRadius="50%"
                    src="https://img.freepik.com/free-photo/3d-male-medical-figure-running-with-knee-bone-highlighted_1048-12528.jpg?size=626&ext=jpg&ga=GA1.1.205266656.1682997817&semt=sph"
                  />
                  <Heading size="sm" as="h4" mt="3px">
                    Orthopedics
                  </Heading>
                </Box>
              </Link>
              <Link to="/gynecologist">
                <Box w="120px" textAlign="center" mx="10px">
                  <Image
                    borderRadius="50%"
                    src="https://img.freepik.com/free-vector/baby-birth-concept-illustration_114360-8159.jpg?t=st=1717934372~exp=1717937972~hmac=28578c86201142d2797bb979594669c216bc3fd90a56c332ffc0034bcb685397&w=360"
                  />
                  <Heading size="sm" as="h4" mt="3px">
                    Gynecology
                  </Heading>
                </Box>
              </Link>
              <Link to="/dermatologist">
                <Box w="120px" textAlign="center" mx="10px">
                  <Image
                    borderRadius="50%"
                    height="120px"
                    width="140px"
                    src="https://img.freepik.com/free-photo/young-woman-lying-cosmetologist-s-table-rejuvenation-procedure-cosmetologist-take-care-about-neck-face-skin-youthfull-wellness-hardware-face-cleaning-procedure_343596-7877.jpg?t=st=1717934720~exp=1717938320~hmac=2cbca96b7c0449adb3a29520beca1de70e39a990f9984acc4ae41c25808893c2&w=360"
                  />
                  <Heading size="sm" as="h4" mt="3px">
                    Dermatology
                  </Heading>
                </Box>
              </Link>
              <Link to="/gastroenterology">
                <Box w="120px" textAlign="center" mx="10px">
                  <Image
                    borderRadius="50%"
                    height="120px"
                    width = "110px"
                    src="https://img.freepik.com/free-vector/anatomical-illustration-intestine_1308-35780.jpg?t=st=1717946561~exp=1717950161~hmac=bfd7aa5f6b189ba8443b86a41367e5ccd93ae9f26d1b4bc4d2a847a6606bc47a&w=360"
                  />
                  <Heading size="sm" as="h4" mt="3px">
                    Gastroenterology
                  </Heading>
                </Box>
              </Link>
            </Flex>
          </Box>

          <SliderPro />
        </Box>
      )}
    </>
  );
};

export default Home;
