'use client'
import Breadcrumb from '@/components/Breadcrumb'
import AppLayout from '@/layouts/AppLayout'
import Head from 'next/head'
import {
    Col,
    Container,
    Form,
    FormGroup,
    Pagination,
    Row,
    // Table,
} from 'react-bootstrap'
import Button from '@/components/Button'
import SubmitButton from '@/components/submitbutton'
import Label from '@/components/Label'
import InputCustom from '@/components/InputCustom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaEdit, FaEye, FaFilter, FaTrash, FaTruck } from 'react-icons/fa'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import NewLoadModal from '@/components/Modal/NewLoadModal'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '@/components/Table'
import apis from '@/constants/apis'
import { useAppSelector } from '@/lib/hooks'
// import Table from '@/components/Table'

const Load = () => {
    const { access_token } = useAppSelector(state => state.auth)

    const breadcrumbItems = [
        { text: 'Dashboard', link: '/dashboard' },
        { text: 'Load' },
    ]
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const [showModal, setShowModal] = useState(false)
    const [loads, setLoads] = useState([])
    // State to store the form data
    const [formData, setFormData] = useState({
        loadId_filter: '',
        billId_filter: '',
        driver_filter: '',
        pickupDate_filter: '',
        dropOff_filter: '',
        createdDate_filter: '',
        totalFare_filter: '',
        driverFare_filter: '',
        loadStatus_filter: '',
    })

    // Function to handle form field changes
    const deleteLoad = id => {
        console.log('Deleting Item: ', id)
    }
    // Function to handle form field changes
    const editLoad = id => {
        console.log('Editing Item: ', id)
    }
    // Function to handle form field changes
    const viewLoad = id => {
        console.log('Viewing Item: ', id)
    }
    // Function to handle form field changes
    const handleInputChange = e => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    useEffect(() => {
        // Fetch data from your Laravel API
        const fetchData = async () => {
            try {
                // Fetch total and driver earnings
                const loadResponse = await axios.get(apis.loads, {headers:{Authorization:`Bearer ${access_token}`}})
                setLoads(loadResponse.data)
                setCurrentPage(loadResponse.data.current_page)
                setTotalPages(loadResponse.data.last_page)
            } catch (error) {
                console.error('Error fetching drivers:', error)
            }
        }

        fetchData(currentPage)
    }, [currentPage,access_token])

    const handlePageChange = page => {
        // Set the new currentPage when a pagination item is clicked
        setCurrentPage(page)
    }

    // Function to handle form submission
    const handleFilterSubmit = async e => {
        e.preventDefault()

        try {
            const response = await axios.post(
                '/api/loads/filter-loads',
                formData,
            )

            // Handle the API response
            console.log('Fitered Data: ', response.data)
            setLoads(response.data)

            // You can update your state or perform any other actions based on the response
        } catch (error) {
            // Handle errors
            console.error('Error filtering data:', error)
        }
    }

    // Initialize ongoingLoadsData as an empty array
    let ongoingLoadsData = []
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
    if (loads && loads.loads && Array.isArray(loads.loads)) {
        // Map over each load in the 'loads' array and create an object for ongoingLoadsData
        ongoingLoadsData = loads.loads.map(load => ({
            unitNo: load.id,
            billId: load.bill_id,
            driver:
                load.driver.user.first_name + ' ' + load.driver.user.last_name,
            number: load.driver.profile.phone,
            pickupDate: load.pickup_date,
            dropoff: load.dropoff_location,
            totalFare: load.total_fare,
            driverFare: load.driver_fare,
            status: load.status,
            // Add action buttons
            actions: (
                <>
                    <button
                        className="primary-color mx-1"
                        onClick={() => viewLoad(load.id)}>
                        <FaEye />
                    </button>
                    <button
                        className="primary-color mx-1"
                        onClick={() => editLoad(load.id)}>
                        <FaEdit />
                    </button>
                    <button
                        className="primary-color mx-1"
                        onClick={() => deleteLoad(load.id)}>
                        <FaTrash />
                    </button>
                </>
            ),
        }))
    }
    console.log(loads)
    return (
        <AppLayout>
            <Head>
                <title>Load - IWS</title>
            </Head>
            <div className="load max-w-screen-xl mx-10 mt-3 mb-10">
                {/* <Header
                    username="Shehzad Khan"
                    avatarUrl="/path-to-avatar.jpg"
                /> */}

                <Breadcrumb items={breadcrumbItems} />
                <Container className="space-y-5">
                    <Row className="content space-x-5 border-gradient border-gradient-color px-3 bg-white pb-10 pt-3 mt-4">
                        <Col className="flex flex-col space-y-5 justify-content-between">
                            <h2 className="text-xl font-bold">Search</h2>
                            <Form onSubmit={handleFilterSubmit}>
                                <Row>
                                    {/* First Line */}
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label for="loadId_filter">
                                                Load ID:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="loadId_filter"
                                                id="loadId_filter"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label for="billId_filter">
                                                Bill ID:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="billId_filter"
                                                id="billId_filter"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label for="driver_filter">
                                                Driver
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="driver_filter"
                                                id="driver_filter"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>

                                    {/* Second Line */}
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label for="pickupDate_filter">
                                                Filter by pickup date:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="pickupDate_filter"
                                                id="pickupDate_filter"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label for="dropOff_filter">
                                                Filter by drop off date:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="dropOff_filter"
                                                id="dropOff_filter"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label for="createdDate_filter">
                                                Filter by created date:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="createdDate_filter"
                                                id="createdDate_filter"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>

                                    {/* Third Line */}
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label for="totalFare_filter">
                                                Total Fare Price Range:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="totalFare_filter"
                                                id="totalFare_filter"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label for="driverFare_filter">
                                                Driver Fare Price Range:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="driverFare_filter"
                                                id="driverFare_filter"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label for="loadStatus_filter">
                                                Load Status:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="loadStatus_filter"
                                                id="loadStatus_filter"
                                                onChange={handleInputChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row className="">
                                    <Col className="space-x-5">
                                        <SubmitButton
                                            type="button"
                                            className="bg-gradients w-40">
                                            Reset
                                        </SubmitButton>
                                        <SubmitButton className="bg-white text-black w-40 border-gradient border-gradient-color">
                                            <FontAwesomeIcon
                                                icon={faFilter}
                                                className="primary-color"
                                            />
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
                                    <SubmitButton
                                        type="button"
                                        className="bg-gradients w-40"
                                        onClick={handleShowModal}>
                                        New Load
                                    </SubmitButton>
                                    <SubmitButton
                                        type="button"
                                        className="bg-white text-black w-40 border-gradient border-gradient-color">
                                        All Load
                                    </SubmitButton>
                                </div>
                            </div>
                            <NewLoadModal
                                show={showModal}
                                handleClose={handleCloseModal}
                            />
                            <Table
                                className="table-responsive overflow-x-auto"
                                headers={[
                                    'UNIT NO.',
                                    'BILL ID',
                                    'DRIVER',
                                    'NUMBER',
                                    'PICKUP DATE',
                                    'DROP OFF',
                                    'TOTAL FARE',
                                    'DRIVER FARE',
                                    'STATUS',
                                    'ACTIONS',
                                ]}
                                data={ongoingLoadsData.map(load =>
                                    Object.values(load),
                                )}
                            />

                            {/* Pagination component */}
                            <Pagination className="w-100 flex justify-content-center">
                                <Pagination.First
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                />
                                <Pagination.Prev
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                />

                                {[...Array(totalPages).keys()].map(page => (
                                    <Pagination.Item
                                        key={page + 1}
                                        active={page + 1 === currentPage}
                                        onClick={() =>
                                            handlePageChange(page + 1)
                                        }>
                                        {page + 1}
                                    </Pagination.Item>
                                ))}

                                <Pagination.Next
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
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
    )
}

export default Load
