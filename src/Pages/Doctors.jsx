import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  Popover,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
  VStack,
  FormLabel,
  Grid,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../Contexts/SearchContextProvider';
import CardsDoc from '../components/CardsDoc';
import Loader from '../components/Loader';
import Error from '../components/Errormsg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';



const getcurrentPage = pageNumber => {
  pageNumber = Number(pageNumber);
  if (!pageNumber) {
    pageNumber = 1;
  }
  return pageNumber;
};

const Doctors = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Select Location');

  const [totalPages, setTotalPages] = useState(0);
  const [orderBy, setOrderBy] = useState('');
  const [orderByRating, setOrderByRating] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('Select By Hospitals');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(getcurrentPage(searchParams.get('page')));
  const sortBy = 'experience';
  const { data, setData } = useContext(SearchContext);

  const getapis = (url, orderBy, orderByRating, filterBy) => {
    if (orderBy) {
      url = `${url}&_sort=price&_order=${orderBy}`;
    } else if (orderByRating) {
      url = `${url}&_sort=rating&_order=${orderByRating}`;
    } else if (filterBy) {
      url = `${url}&category=${filterBy}`;
    }
    return url;
  };

  const fetchDoctorData = (page, orderBy, orderByRating, filterBy) => {
    let api = getapis(
      `https://doctordata.onrender.com/doctors?_page=${page}&_limit=12`,
      orderBy,
      orderByRating,
      filterBy
    );
    setLoading(true);
    axios
      .get(api)
      .then(res => {
        setData(res.data);
        let pages = res.headers['x-total-count'];
        setTotalPages(Math.ceil(pages / 12));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  const getDoctorValue = (value, page) => {
    axios
      .get(`https://doctordata.onrender.com/${value}?_page=${page}&_limit=12`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => setError(true));
  };

  const handleClick = id => {
    navigate(`/doctors/${id}`);
  };

  useEffect(() => {
    fetchDoctorData(page, orderBy, orderByRating, filterBy);
  }, [page, orderBy, orderByRating, filterBy]);

  useEffect(() => {
    setSearchParams({ page });
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  const handlePageChange = val => {
    const updatePage = page + val;
    setPage(updatePage);
  };

  const handleSelectChange = e => {
    const value = e.target.value;
    setOrderBy(value);

    const hospitalNames = {
      '': 'Select By Hospitals',
      'a': 'Yashoda',
      'b': 'KIMS',
      'c': 'Apollo',
      'd': 'Rainbow',
    };

    setSelectedHospital(hospitalNames[value]);
  };
  const handleLocationSelect = (e) => {
    const value = e.target.value;
    setSelectedLocation(value);
  };
  
  

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
  <Box mt="75px" flex="1" mr="10px" width={100} ml={10}>
    <FormLabel>Sort By Hospitals</FormLabel>
    <Select onChange={handleSelectChange} value={orderBy}>
      <option value="">Select By Hospitals</option>
      <option value="a">Yashoda</option>
      <option value="b">KIMS</option>
      <option value="c">Apollo</option>
      <option value="d">Rainbow</option>
    </Select>
  </Box>
  <Box mt="75px" flex="1" mx="10px">
    <FormLabel>Select Location</FormLabel>
    <Select onChange={handleLocationSelect} value={selectedLocation}>
      <option value="">Select Location</option>
      <option>Secunderabad</option>
      <option>Madhapur</option>
      <option> Kondapur</option>
      <option>Ameerpet</option>
      <option>Gachibowli</option>
      {/* Add more locations as needed */}
    </Select>
  </Box>
  <Box mt="75px" flex="1" mr="10px" width={100}>
    <FormLabel>Filter by Category:</FormLabel>
    <Select className="filter-by-category" value={filterBy} onChange={(e) => getDoctorValue(e.target.value)}>
      <option value="">Select Category</option>
      <option value="doctors">All Categories</option>
      <option value="cardiology">Cardiologist</option>
      <option value="neurology">Neurologist</option>
      <option value="Gynecologist">Gynecologist</option>
      <option value="dermatologist">Dermatologist</option>
      <option value="gastroenterology">Gastroenterologist</option>
      <option value="pulmonologist">Pulmonologist</option>
      <option value="orthopedics">Orthopedics</option>
    </Select>
  </Box>
</Box>

<Box display="flex" flexDirection="row" justifyContent="space-between">
  <Box mt="20px" textAlign="center" flex="1">
    Selected Hospital: <strong>{selectedHospital}</strong>
  </Box>
  <Box mt="20px" textAlign="center" flex="1">
    Selected Location: <strong>{selectedLocation}</strong>
  </Box>
</Box>

      <Box>
        <Box
          w="70%"
          m="auto"
          gap="40px"
          display={'grid'}
          gridTemplateColumns={{
            base: 'repeat(1,1fr)',
            sm: 'repeat(1,1fr)',
            md: 'repeat(2,1fr)',
            lg: 'repeat(2,1fr)',
            xl: 'repeat(3,1fr)',
            '2xl': 'repeat(3,1fr)',
          }}
          textAlign={'center'}
          p="10px"
          mt="30px"
        >
          {data.length === 0 ? (
            <Box m="auto" w="100%">
              <Alert status="error">
                <AlertIcon />
                <AlertTitle> No data Found!</AlertTitle>
              </Alert>
            </Box>
          ) : (
            data.map((doctor, ind) => (
              <Box
                key={ind}
                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                p="10px"
                borderTopRightRadius={'12px'}
                borderTopLeftRadius={'12px'}
              >
                <Image width={'400px'} m="auto" src={doctor.image} />
                <Box mt="10px" lineHeight={'30px'}>
                  <Heading as="h5" size="sm">
                    {doctor.name}
                  </Heading>
                  <Text>Specialist : {doctor.specialist}</Text>
                  <Text>Experience : {doctor.experience}</Text>
                  <Flex
                    justifyContent={'center'}
                    gap="3px"
                    alignItems={'center'}
                  >
                    <Text>Rating: {doctor.rating}</Text>
                    <FaStar color="green" />
                  </Flex>
                </Box>

                <Button
                  onClick={() => handleClick(doctor.id)}
                  mt="10px"
                  color={'white'}
                  bg={'#222566'}
                  _hover={{
                    bg: '#3879E9',
                  }}
                >
                  Book Appointment
                </Button>
              </Box>
            ))
          )}
        </Box>
        <Box
          m="5px 5px"
          alignItems={'center'}
          display={'flex'}
          justifyContent={'center'}
          gap="5px"
        >
          <Button
            color={'white'}
            bg={'#222566'}
            _hover={{
              bg: '#3879E9',
            }}
            isDisabled={page === 1}
            onClick={() => handlePageChange(-1)}
          >
            PREV
          </Button>
          {new Array(totalPages).fill(0).map((el, ind) => (
            <Button
              key={ind}
              m="5px"
              _hover={{
                bg: '#3879E9',
              }}
              onClick={() => setPage(ind + 1)}
            >
              {ind + 1}
            </Button>
          ))}
          <Button
            color={'white'}
            bg={'#222566'}
            _hover={{
              bg: '#3879E9',
            }}
            isDisabled={page === totalPages}
            onClick={() => handlePageChange(1)}
          >
            NEXT
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Doctors;
