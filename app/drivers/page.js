'use client'
import Breadcrumb from '@/components/Breadcrumb'
import AppLayout from '@/layouts/AppLayout'
import Head from 'next/head'
import {
    Button,
    Col,
    Container,
    Dropdown,
    Form,
    FormGroup,
    Pagination,
    Row,
    Table,
} from 'react-bootstrap'
import SubmitButton from '@/components/submitbutton'
import Label from '@/components/Label'
import InputCustom from '@/components/InputCustom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import UpdateDriverStatusModal from '@/components/Modal/UpdateDriverStatusModal'
import NewLoadModal from '@/components/Modal/NewLoadModal'
import apis from '@/constants/apis'

const Drivers = () => {
    const [drivers, setDrivers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [selectedDriverId, setSelectedDriverId] = useState(null)
    const [driverStatus, setDriverStatus] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showLoadModal, setShowLoadModal] = useState(false)
    const [filters, setFilters] = useState({
        namePhoneEmail: '',
        status: '',
        unitNumber: '',
        // Add more filter fields as needed
    })
    // const [searchResults, setSearchResults] = useState([]);

   

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const breadcrumbItems = [
        { text: 'Dashboard', link: '/dashboard' },
        { text: 'Drivers' },
    ]

    const handleSearch = async event => {
        event.preventDefault()
        try {
            const response = await axios.post(
                '/api/drivers/searchDrivers',
                filters,
            )

            setDrivers(response.data.drivers)
        } catch (error) {
            console.error('Error searching drivers:', error)
        }
    }

    useEffect(() => {
        // Define a function to fetch filtered drivers
        const fetchFilteredDrivers = async () => {
            try {
                // Make a POST request to your Laravel API endpoint
                const response = await axios.post(
                    '/api/drivers/searchDrivers',
                    filters,
                )

                // Set the retrieved drivers in the state
                setDrivers(response.data.drivers)
            } catch (error) {
                console.error('Error fetching filtered drivers:', error)
            }
        }

        // Call the function to fetch filtered drivers when the component mounts or when filters change
        fetchFilteredDrivers()
    }, [filters]) // The dependency array ensures the effect runs when filters change

    // Function to handle filter changes
    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value,
        }))
    }

    const handleShowLoadModal = () => setShowLoadModal(true)
    const handleCloseLoadModal = () => setShowLoadModal(false)

    const handleShowModal = (driverId, status) => {
        setSelectedDriverId(driverId)
        setDriverStatus(status)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setSelectedDriverId(null)
        setDriverStatus(null)
        setShowModal(false)
    }

    const handleUpdateStatus = (driverId, status) => {
        // Make an API call to your Laravel backend to update the driver's status
        // You can use Axios or any other library for making HTTP requests

        // Example using Axios
        axios
            .post(`/api/drivers/updateDriverStatus/${driverId}`, { status })
            .then(response => {
                setDriverStatus(status)
                console.log(
                    'Driver status updated successfully:',
                    response.data,
                )
                // Implement additional logic if needed
                fetchDrivers()
            })
            .catch(error => {
                fetchDrivers()
                console.error('Error updating driver status:', error)
                // Handle errors if needed
            })
    }

    const handleView = id => {
        // Add logic to view the item with the given id
        console.log(`View item with id ${id}`)
        router.push(`/drivers/${id}`)
    }

    const handleEdit = id => {
        // Add logic to view the item with the given id
        console.log(`View item with id ${id}`)
        router.push(`/drivers/${id}/edit`)
    }

    const handleDelete = id => {
        // Add logic to delete the item with the given id
        console.log(`Delete item with id ${id}`)
    }

    const fetchDrivers = async () => {
        try {
            const response = await axios.get(apis.drivers)
            console.log(response)

            // Set the retrieved drivers in the state
            setDrivers(response.data.drivers)
            setCurrentPage(response.data.current_page)
            setTotalPages(response.data.last_page)
            setDriverStatus(
                drivers.driver && drivers.driver.status
                    ? drivers.driver.status
                    : 'Not Available',
            )
        } catch (error) {
            console.error('Error fetching drivers:', error)
        }
    }

    useEffect(() => {
        // Call the function to fetch drivers when the component mounts
        fetchDrivers(currentPage)
    }, [currentPage]) // The empty dependency array ensures the effect runs only once on mount

    const handlePageChange = page => {
        // Set the new currentPage when a pagination item is clicked
        setCurrentPage(page)
    }

    const getStatusColor = status => {
        switch (status) {
            case 'available':
                return 'bg-green-500'
            case 'not available':
                return 'bg-red-500'
            case 'will be available':
                return 'bg-yellow-500'
            case 'under our load':
                return 'bg-blue-500'
            case 'under our bid':
                return 'bg-purple-500'
            case 'suspended':
                return 'bg-gray-500'
            default:
                return 'bg-red-500' // Default color
        }
    }
    const router = useRouter()

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
                    <Row className="content space-x-5 px-3 bg-white pb-10 pt-3 mt-4">
                        <Col className="flex flex-col space-y-5 justify-content-between">
                            <h2 className="text-xl font-bold">Search</h2>
                            <Form className="space-y-5" onSubmit={handleSearch}>
                                <Row>
                                    {/* First Line */}
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label htmlFor="namePhoneEmail">
                                                Driver:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="namePhoneEmail"
                                                id="namePhoneEmail"
                                                // value={namePhoneEmail}
                                                // onChange={(e) => setNamePhoneEmail(e.target.value)}
                                                value={filters.namePhoneEmail}
                                                onChange={e =>
                                                    handleFilterChange(
                                                        'namePhoneEmail',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Name / Phone Num / Email"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label htmlFor="status">
                                                Status:
                                            </Label>
                                            <Form.Select
                                                name="status"
                                                // value={status}
                                                // onChange={(e) => setStatus(e.target.value)}
                                                value={filters.status}
                                                onChange={e =>
                                                    handleFilterChange(
                                                        'status',
                                                        e.target.value,
                                                    )
                                                }>
                                                <option value="">
                                                    Select Status
                                                </option>
                                                <option value="available">
                                                    Available
                                                </option>
                                                <option value="not available">
                                                    Not Available
                                                </option>
                                                <option value="will be available">
                                                    Will be available
                                                </option>
                                                <option value="under our load">
                                                    Under Our Load
                                                </option>
                                                <option value="under our bid">
                                                    Under Our Bid
                                                </option>
                                                <option value="suspended">
                                                    Suspended
                                                </option>
                                            </Form.Select>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4} className="mb-6">
                                        <FormGroup>
                                            <Label htmlFor="unitNumber">
                                                Unit Number:
                                            </Label>
                                            <InputCustom
                                                type="text"
                                                name="unitNumber"
                                                id="unitNumber"
                                                // value={unitNumber}
                                                // onChange={(e) => setUnitNumber(e.target.value)}
                                                value={filters.unitNumber}
                                                onChange={e =>
                                                    handleFilterChange(
                                                        'unitNumber',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="">
                                    <Col className="space-x-5">
                                        <SubmitButton className="bg-gradients w-40">
                                            Reset
                                        </SubmitButton>
                                        <SubmitButton className="bg-white text-black w-40 border-gradient border-gradient-color">
                                            <FontAwesomeIcon
                                                icon={faFilter}
                                                className="primary-color"
                                            />{' '}
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
                                <h2 className="text-xl font-bold">
                                    Driver List
                                </h2>
                                <div className="space-x-3">
                                    <Link href={'/drivers/create'}>
                                        <SubmitButton className="bg-gradients w-40">
                                            Add Driver
                                        </SubmitButton>
                                    </Link>
                                    <SubmitButton
                                        className="bg-white text-black w-40 border-gradient border-gradient-color"
                                        onClick={handleShowLoadModal}>
                                        New Load
                                    </SubmitButton>
                                </div>
                            </div>
                            <NewLoadModal
                                show={showLoadModal}
                                handleClose={handleCloseLoadModal}
                            />
                            <Table striped responsive>
                                <tbody className="space-y-10">
                                    <tr>
                                        <th>UNIT NUMBER.</th>
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>PHONE</th>
                                        <th>STATUS</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                    {drivers && drivers.length > 0 ? (
                                        drivers.map((driver, key) => (
                                            <tr
                                                className="align-middle"
                                                key={key}>
                                                <td>{driver.id}</td>
                                                <td>
                                                    <Image
                                                        src={
                                                            driver.profile &&
                                                            driver.profile
                                                                .profile_photo
                                                                ? `${backendUrl}/${driver.profile.profile_photo}`
                                                                : '/assets/images/default-profile.png'
                                                        }
                                                        width={30}
                                                        height={30}
                                                        alt={driver.first_name}
                                                        className="avatar w-10 h-10 rounded-full"
                                                    />
                                                </td>
                                                <td>
                                                    {driver.first_name}{' '}
                                                    {driver.last_name}
                                                </td>
                                                <td>{driver.email}</td>
                                                <td>
                                                    {driver.profile
                                                        ? driver.profile.phone
                                                        : 'Not Available'}
                                                </td>
                                                <td>
                                                    <Button
                                                        className={`p-1 text-xs w-24 border-none rounded-pill text-capitalize ${
                                                            driver.driver
                                                                ? getStatusColor(
                                                                      driver
                                                                          .driver
                                                                          .status,
                                                                  )
                                                                : 'bg-red-500'
                                                        }`}
                                                        onClick={() =>
                                                            handleShowModal(
                                                                driver.driver
                                                                    .id,
                                                                driver.driver
                                                                    .status,
                                                            )
                                                        }>
                                                        {driver.driver &&
                                                        driver.driver.status
                                                            ? driver.driver
                                                                  .status
                                                            : 'Not Available'}
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            variant="none"
                                                            style={{
                                                                color: 'black',
                                                                letterSpacing:
                                                                    '3px',
                                                            }}
                                                            id="dropdown-basic">
                                                            {/* Three dots for the actions menu */}
                                                            ...
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            {/* View option */}
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleView(
                                                                        driver.id,
                                                                    )
                                                                }>
                                                                View
                                                            </Dropdown.Item>

                                                            {/* Edit option */}
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        driver.id,
                                                                    )
                                                                }>
                                                                Edit
                                                            </Dropdown.Item>

                                                            {/* Delete option */}
                                                            <Dropdown.Item
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        driver.id,
                                                                    )
                                                                }>
                                                                Delete
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="text-center">
                                                No Data Available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            {/* Modal component */}
                            <UpdateDriverStatusModal
                                show={showModal}
                                handleClose={handleCloseModal}
                                handleUpdateStatus={handleUpdateStatus}
                                driverId={selectedDriverId}
                                status={driverStatus}
                            />
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
                </Container>
            </div>
        </AppLayout>
    )
}

export default Drivers
