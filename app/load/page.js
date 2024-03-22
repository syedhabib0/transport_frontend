"use client";
import Breadcrumb from "@/components/Breadcrumb";
import AppLayout from "@/layouts/AppLayout";
import Head from "next/head";
import { Col, Container, Form, FormGroup, Pagination, Row } from "react-bootstrap";
import Button from "@/components/Button";
import SubmitButton from "@/components/submitbutton";
import Label from "@/components/Label";
import InputCustom from "@/components/InputCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEdit, FaEye, FaTrash, FaTruck } from "react-icons/fa";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import NewLoadModal from "@/components/Modal/NewLoadModal";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@/components/Table";
import apis from "@/constants/apis";
import { useAppSelector } from "@/lib/hooks";
import { handleError } from "@/utils/functions";
import { useLoadScript } from "@react-google-maps/api";
// import Table from '@/components/Table'

const initialState = {
  bill_id: "",
  driver_id: "",
  pickup_date: "",
  created_at: "",
  total_fare: "",
  driver_fare: "",
  load_status: "",
  per_page: "10",
};

const Load = () => {
  const { access_token } = useAppSelector((state) => state.auth);

  const breadcrumbItems = [{ text: "Dashboard", link: "/dashboard" }, { text: "Load" }];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });
  const [driverOptions, setDriverOptions] = useState([]);
  const [loadStatus, setLoadStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [loads, setLoads] = useState([]);
  // State to store the form data
  const [formData, setFormData] = useState(initialState);

  // Function to handle form field changes
  const deleteLoad = (id) => {
    console.log("Deleting Item: ", id);
  };
  // Function to handle form field changes
  const editLoad = (id) => {
    console.log("Editing Item: ", id);
  };
  // Function to handle form field changes
  const viewLoad = (id) => {
    console.log("Viewing Item: ", id);
  };
  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    // Fetch data from your Laravel API
    const fetchData = async () => {
      try {
        // Fetch total and driver earnings
        const {data,status} = await axios.get(apis.loads, {
          params: formData,
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (status === 200) {
            setLoads(data.data);
            setCurrentPage(data.current_page);
            setTotalPages(data.last_page);
        }
      } catch (error) {
        handleError(error);
      }
    };

    fetchData(currentPage);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, access_token]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [{ data, status }, { data: statusData, status: loadStatus }] = await Promise.all([
          axios.get(apis.getDriverDropDown, { headers: { Authorization: `Bearer ${access_token}` } }),
          axios.get(apis.getLoadStatus, { headers: { Authorization: `Bearer ${access_token}` } }),
        ]);
        if (status === 200) {
          setDriverOptions(data.data);
        }
        if (loadStatus === 200) {
          setLoadStatus(statusData.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    getData();
  }, [access_token]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle form submission
  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data,status} = await axios.get(apis.loads, {
          params: formData,
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (status === 200) {
            setLoads(data.data);
            setCurrentPage(data.current_page);
            setTotalPages(data.last_page);
        }
      } catch (error) {
        handleError(error);
      }
  };

  // Initialize ongoingLoadsData as an empty array
  let ongoingLoadsData = [];
  // <th>UNIT NO.</th>
  // <th>BILL ID</th>
  // <th>DRIVER</th>
  // <th>NUMBER</th>
  // <th>PICKUP DATE</th>
  // <th>DROP OFF</th>
  // <th>TOTAL FARE</th>
  // <th>DRIVER FARE</th>
  // <th>STATUS</th>
  // <th>ACTIONS</th>

  //  bill_id :  "5415235" created_at :  "2024-01-24T23:02:51.000000Z" delivery_date :  null destination :  null driver :  {id: 2, user_id: 32, profile_id: 25, hired_by: 1, status: 'active', …} driver_fare :  "2100.00" driver_id :  2 dropoff_location :  "Attock" id :  2 load_type :  null pickup_date :  "2024-01-26" pickup_location :  "Karachi" status :  "available" total_fare :  "12000.00" unit_no :  null updated_at :  "2024-01-24T23:02:51.000000Z" user_id :  1 weight :  null
  // Check if the 'loads' array exists in loads
  if (loads  && Array.isArray(loads)) {
    ongoingLoadsData = loads.map((load) => ({
      unitNo: load.id,
      billId: load.bill_id,
      driver: load.driver.user.first_name + " " + load.driver.user.last_name,
      number: load.driver.profile.phone,
      pickupDate: load.pickup_date,
      dropoff: load.dropoff_location,
      totalFare: load.total_fare,
      driverFare: load.driver_fare,
      status: load.status,
      actions: (
        <>
          <button className="primary-color mx-1" onClick={() => viewLoad(load.id)}>
            <FaEye />
          </button>
          <button className="primary-color mx-1" onClick={() => editLoad(load.id)}>
            <FaEdit />
          </button>
          <button className="primary-color mx-1" onClick={() => deleteLoad(load.id)}>
            <FaTrash />
          </button>
        </>
      ),
    }));
  }

  if (!isLoaded) {
    return <div>Is Loading...</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>Load - IWS</title>
      </Head>
      <div className="load max-w-screen-xl mx-10 mt-3 mb-10">
        <Breadcrumb items={breadcrumbItems} />
        <Container className="space-y-5">
          <Row className="content space-x-5 border-gradient border-gradient-color px-3 bg-white pb-10 pt-3 mt-4">
            <Col className="flex flex-col space-y-5 justify-content-between">
              <h2 className="text-xl font-bold">Search</h2>
              <Form onSubmit={handleFilterSubmit}>
                <Row>
                  <Col md={4} className="mb-6">
                    <FormGroup>
                      <Label for="bill_id">Bill ID:</Label>
                      <InputCustom
                        type="text"
                        name="bill_id"
                        id="bill_id"
                        onChange={handleInputChange}
                        value={formData.bill_id}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} className="mb-6">
                    <FormGroup>
                      <Label for="driver_id">Driver</Label>
                      <Form.Select
                        id="driver_id"
                        name="driver_id"
                        onChange={handleInputChange}
                        value={formData.driver_id}
                      >
                        <option value="">Select a driver</option>
                        {driverOptions.map((driverOption) => (
                          <option key={driverOption.id} value={driverOption.id}>
                            {driverOption.full_name}
                          </option>
                        ))}
                      </Form.Select>
                    </FormGroup>
                  </Col>

                  <Col md={4} className="mb-6">
                    <FormGroup>
                      <Label for="pickup_date">Filter by pickup date:</Label>
                      <InputCustom
                        type="text"
                        name="pickup_date"
                        id="pickup_date"
                        onChange={handleInputChange}
                        value={formData.pickup_date}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} className="mb-6">
                    <FormGroup>
                      <Label for="created_at">Filter by created date:</Label>
                      <InputCustom
                        type="text"
                        name="created_at"
                        id="created_at"
                        onChange={handleInputChange}
                        value={formData.created_at}
                      />
                    </FormGroup>
                  </Col>

                  <Col md={4} className="mb-6">
                    <FormGroup>
                      <Label for="total_fare">Total Fare Price Range:</Label>
                      <InputCustom
                        type="text"
                        name="total_fare"
                        id="total_fare"
                        onChange={handleInputChange}
                        value={formData.total_fare}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} className="mb-6">
                    <FormGroup>
                      <Label for="driver_fare">Driver Fare Price Range:</Label>
                      <InputCustom
                        type="text"
                        name="driver_fare"
                        id="driver_fare"
                        onChange={handleInputChange}
                        value={formData.driver_fare}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4} className="mb-6">
                    <FormGroup>
                      <Label for="load_status">Load Status:</Label>
                      <Form.Select
                        name="load_status"
                        id="load_status"
                        onChange={handleInputChange}
                        value={formData.load_status}
                      >
                        <option value="">Select a Load Status</option>
                        {Object.keys(loadStatus).map((key) => (
                          <option key={key} value={key}>
                            {loadStatus[key]}
                          </option>
                        ))}
                      </Form.Select>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="">
                  <Col className="">
                    <SubmitButton type="button" className="bg-gradients w-40">
                      Reset
                    </SubmitButton>
                  </Col>
                  <Col>
                    {" "}
                    <SubmitButton className="bg-white !text-black w-40 border-gradient border-gradient-color">
                      <FontAwesomeIcon icon={faFilter} className="primary-color" />
                      Filter
                    </SubmitButton>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row className="bg-white px-3 pb-10 pt-3 mt-4">
            <Col className="flex justify-content-between flex-col space-y-5">
              <div className="flex justify-content-between px-5">
                <h2 className="text-xl font-bold">Load List</h2>
                <div className="space-x-3">
                  <SubmitButton type="button" className="bg-gradients w-40" onClick={handleShowModal}>
                    New Load
                  </SubmitButton>
                  <SubmitButton
                    type="button"
                    className="bg-white text-black w-40 border-gradient border-gradient-color"
                  >
                    All Load
                  </SubmitButton>
                </div>
              </div>
              <NewLoadModal show={showModal} handleClose={handleCloseModal} driverOptions={driverOptions} />
              <Table
                className="table-responsive overflow-x-auto"
                headers={[
                  "UNIT NO.",
                  "BILL ID",
                  "DRIVER",
                  "NUMBER",
                  "PICKUP DATE",
                  "DROP OFF",
                  "TOTAL FARE",
                  "DRIVER FARE",
                  "STATUS",
                  "ACTIONS",
                ]}
                data={ongoingLoadsData.map((load) => Object.values(load))}
              />

              {/* Pagination component */}
              <Pagination className="w-100 flex justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />

                {[...Array(totalPages).keys()].map((page) => (
                  <Pagination.Item
                    key={page + 1}
                    active={page + 1 === currentPage}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </Col>
          </Row>
          <Row />
        </Container>
      </div>
    </AppLayout>
  );
};

export default Load;
