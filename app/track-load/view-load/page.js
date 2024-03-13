'use client'
import Breadcrumb from '@/components/Breadcrumb'
import Head from 'next/head'
import Image from 'next/image'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Map from '@/public/assets/images/thumbnail (1).jpeg'
import Card from '@/components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faBookmark,
    faMap,
    faTruckFast,
} from '@fortawesome/free-solid-svg-icons'
import avatar from '@/public/assets/images/drivers.png'
import Button from '@/components/Button'
import Link from 'next/link'
import SubmitButton from '@/components/submitbutton'
import AppLayout from '@/layouts/AppLayout'
// import Table from '@/components/Table'

const ViewLoad = () => {
    // React state to manage selected options
    const [selectedOptions, setSelectedOptions] = useState()

    // Array of all options
    const tableData = [
        {
            'Load ID': '224967711',
            'Pickup Date/Time': 'Oct 07, 2023 07:46',
            'Journey Duration (Est.)': '8hrs, 11 mins',
            'Journey Distance(Est.)': '475.94 mile(s)',
        },
        {
            'Bill ID': '1234',
            'Dropoff Date/Time': 'Journey not completed.',
            Pickup: 'Carson City, NV, USA',
        },
        {
            id: '1',
            driver_id: 'NJ 08046',
            name: 'Jeff B Louisius Willingboro',
            email: 'jlouisius1@gmail.com',
            phone: '+1 8625715342',
            avatarurl: avatar,
            license: '--',
        },
    ]
    const remainingData = [
        [
            id => 1,
            driver_id => 'NJ 08046',
            name => 'Jeff B Louisius Willingboro',
            email => 'jlouisius1@gmail.com',
            phone => '+1 8625715342',
            avatarurl => avatar,
            license => '--',
        ],
        [
            type => 'cargo van',
            load => '1416',
            size => '170 X 52 X 70 inches',
            make => 'Merz',
            model => 'Sprinter',
        ],
        [
            created => 'Super Admin Oct 07, 2023 07:46',
            assigned => 'Super Admin Oct 07, 2023 07:46',
            tripStarted => 'Super Admin Oct 07, 2023 07:46',
        ],
        [booking => 'Ongoing'],
        [
            booked_by => 'Super Admin',
            booked_at => 'Oct 07, 2023 07:46',
            confirmed_at => 'Oct 07, 2023 07:46',
            started_at => 'Oct 07, 2023 07:46',
            end_at => '--',
        ],
        [
            system_estimate => '',
            total_fair => '$700',
            driver_fair => '$550',
            payment_status => 'not_paid',
        ],
    ]

    const breadcrumbItems = [
        { text: 'Dashboard', link: '/dashboard' },
        { text: 'Track' },
    ]

    return (
        <AppLayout>
            <Head>
                <title>View - Track Load - IWS</title>
            </Head>
            <div className="find-truck max-w-screen-xl mx-10 mt-3 mb-10">
                {/* <Header
                    username="Shehzad Khan"
                    avatarUrl="/path-to-avatar.jpg"
                /> */}

                <Breadcrumb items={breadcrumbItems} />
                <Container className="">
                    <Row className="content space-x-5">
                        <Col className="flex flex-col bg-white px-6 lg:px-8 pb-10 space-y-5 mt-4 p-4">
                            <Row className="space-y-5">
                                <Col className="flex justify-content-between">
                                    <h2 className="text-xl font-bold">
                                        Journey Info
                                    </h2>
                                    <SubmitButton
                                        type="button"
                                        className="w-32 bg-primary">
                                        Edit
                                    </SubmitButton>
                                </Col>
                                <div className="w-100 h-40 lg:h-60 border-gradient border-gradient-color position-relative">
                                    <Image
                                        src={Map}
                                        width="200"
                                        height={20}
                                        className="h-100 w-100 object-cover position-relative"
                                        alt="Driver Location"
                                    />
                                    <SubmitButton
                                        type="button"
                                        className="position-absolute bottom-3 right-2 w-32 bg-primary">
                                        Map Track
                                    </SubmitButton>
                                </div>
                                <Col className="flex border-gradient border-gradient-color px-0">
                                    {/* <Table className="table-striped" headers={[]} data={data[0]} /> */}
                                    <Table striped responsive>
                                        <tbody>
                                            {/* {tableData.map((value) => ( */}
                                            {Object.entries(tableData[0]).map(
                                                (
                                                    [innerKey, innerValue],
                                                    key,
                                                ) => (
                                                    // <td key={value}>
                                                    <tr
                                                        className="space-x-16"
                                                        key={key}>
                                                        <td>
                                                            <span>
                                                                <strong>
                                                                    {innerKey}:{' '}
                                                                </strong>
                                                            </span>
                                                            <span>
                                                                {innerValue}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    // </td>
                                                ),
                                            )}
                                            {/* ))} */}
                                        </tbody>
                                    </Table>
                                    <Table striped responsive>
                                        <tbody>
                                            {/* {tableData.map((value) => ( */}
                                            {Object.entries(tableData[1]).map(
                                                (
                                                    [innerKey, innerValue],
                                                    key,
                                                ) => (
                                                    // <td key={value}>
                                                    <tr
                                                        className="space-x-16"
                                                        key={key}>
                                                        <td>
                                                            <span>
                                                                <strong>
                                                                    {innerKey}:{' '}
                                                                </strong>
                                                            </span>
                                                            <span>
                                                                {innerValue}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    // </td>
                                                ),
                                            )}
                                            {/* ))} */}
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col className="flex flex-col justify-content-between">
                                    <div className="flex justify-content-between mb-4 align-top">
                                        <h2 className="text-2xl font-bold">
                                            Driver Details
                                        </h2>
                                        <Image
                                            className="w-10 h-10 bg-black object-cover rounded-full"
                                            src={tableData[2].avatarurl}
                                            width={10}
                                            height={10}
                                        />
                                    </div>
                                    <Table
                                        striped
                                        responsive
                                        className="border">
                                        <tbody className="">
                                            <tr className="space-x-16 h-14 align-middle">
                                                <td colSpan={2}>
                                                    <strong>Full Name:</strong>{' '}
                                                    {tableData[2].name},{' '}
                                                    {tableData[2].driver_id}
                                                </td>
                                            </tr>
                                            <tr className="space-x-16 h-14 align-middle">
                                                <td>
                                                    <strong>
                                                        License Number:
                                                    </strong>
                                                    <br />{' '}
                                                    {tableData[2].license}
                                                </td>
                                                <td>
                                                    <strong>Email:</strong>
                                                    <br /> {tableData[2].email}
                                                </td>
                                            </tr>
                                            <tr className="space-x-16 h-14 align-middle">
                                                <td colSpan={2}>
                                                    <strong>Phone No:</strong>{' '}
                                                    {tableData[2].phone}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="space-x-5 space-y-5">
                        <Col className="bg-white mt-3 p-5 space-y-3">
                            <h2 className="text-2xl font-bold">
                                Vehicle Details
                            </h2>
                            <hr />
                            <div>
                                <FontAwesomeIcon
                                    className="primary-color"
                                    icon={faTruckFast}
                                />{' '}
                                Cargo_van
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    className="primary-color"
                                    icon={faBars}
                                />{' '}
                                1416
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    className="primary-color"
                                    icon={faBars}
                                />{' '}
                                170 X 52 X 70 inches
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    className="primary-color"
                                    icon={faTruckFast}
                                />{' '}
                                <strong>Make: </strong>Merz
                            </div>
                            <div>
                                <FontAwesomeIcon
                                    className="primary-color"
                                    icon={faTruckFast}
                                />{' '}
                                <strong>Model: </strong>Sprinter
                            </div>
                        </Col>
                        <Col className="bg-white mt-3 p-5 space-y-3">
                            <h2 className="text-2xl font-bold">Activity Log</h2>
                            <hr />
                            <Table striped responsive>
                                <tbody>
                                    <tr>
                                        <th>Created:</th>
                                        <td>Super Admin Oct 07, 2023 07:46</td>
                                    </tr>
                                    <tr>
                                        <th>Assigned:</th>
                                        <td>Super Admin Oct 07, 2023 07:46</td>
                                    </tr>
                                    <tr>
                                        <th>Trip Started:</th>
                                        <td>Super Admin Oct 07, 2023 07:46</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="bg-white mt-3 p-5 space-y-3">
                            <h2 className="text-2xl font-bold">Status</h2>
                            <hr />
                            <Table striped responsive>
                                <tbody>
                                    <tr>
                                        <th>Booking</th>
                                        <td>
                                            <Button className="bg-gradients text-white text-xs rounded-pill">
                                                Ongoing
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="space-x-5 space-y-5">
                        <Col className="bg-white mt-3 p-5 space-y-3">
                            <h2 className="text-2xl font-bold">Journey Log</h2>
                            <hr />
                            <Table striped responsive>
                                <tbody>
                                    <tr>
                                        <th>Booked By</th>
                                        <td>Super Admin</td>
                                    </tr>
                                    <tr>
                                        <th>Booked At</th>
                                        <td>Oct 07, 2023 07:46</td>
                                    </tr>
                                    <tr>
                                        <th>Booking Confirmed At</th>
                                        <td>Oct 07, 2023 07:46</td>
                                    </tr>
                                    <tr>
                                        <th>Start At</th>
                                        <td>Oct 07, 2023 07:46</td>
                                    </tr>
                                    <tr>
                                        <th>End Trip At</th>
                                        <td>---</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className="bg-white mt-3 p-5 space-y-3">
                            <h2 className="text-2xl font-bold">
                                Payment Details
                            </h2>
                            <hr />
                            <Table striped responsive>
                                <tbody>
                                    <tr>
                                        <th>SYSTEM ESTIMATED</th>
                                        <td />
                                    </tr>
                                    <tr>
                                        <th style={{ color: 'lightgreen' }}>
                                            Total Fare
                                        </th>
                                        <td style={{ color: 'lightgreen' }}>
                                            $700
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Driver Fare</th>
                                        <td>$550</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>
                                            <Button className="bg-gradients text-white text-xs rounded-pill">
                                                NOT PAID
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppLayout>
    )
}

export default ViewLoad
