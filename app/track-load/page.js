'use client'
import Breadcrumb from '@/components/Breadcrumb'
import Head from 'next/head'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Map from '@/public/assets/images/thumbnail (1).jpeg'
import Card from '@/components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faMap } from '@fortawesome/free-solid-svg-icons'
import avatar from '@/public/assets/images/drivers.png'
import Button from '@/components/Button'
import Link from 'next/link'
import AppLayout from '@/layouts/AppLayout'

const TrackLoad = () => {
    // React state to manage selected options
    const [selectedOptions, setSelectedOptions] = useState()

    // Array of all options
    const cards = [
        {
            id: 1,
            driver_id: 'NJ 08046',
            name: 'Jeff B Louisius Willingboro',
            email: 'jlouisius1@gmail.com',
            phone: '+1 8625715342',
            avatar: avatar,
            units: '1416',
            trips: '224967711',
            pickup: 'Carson City, NV, USA',
            dropoff: 'Newport Beach, CA, USA',
        },
        {
            id: 2,
            driver_id: 'NJ 08046',
            name: 'Jeff B Louisius Willingboro',
            email: 'jlouisius1@gmail.com',
            phone: '+1 8625715342',
            avatar: avatar,
            units: '1416',
            trips: '224967711',
            pickup: 'Carson City, NV, USA',
            dropoff: 'Newport Beach, CA, USA',
        },
        {
            id: 3,
            driver_id: 'NJ 08046',
            name: 'Jeff B Louisius Willingboro',
            email: 'jlouisius1@gmail.com',
            phone: '+1 8625715342',
            avatar: avatar,
            units: '1416',
            trips: '224967711',
            pickup: 'Carson City, NV, USA',
            dropoff: 'Newport Beach, CA, USA',
        },
    ]

    // Function triggered on selection
    function handleSelect(data) {
        setSelectedOptions(data)
    }

    const breadcrumbItems = [
        { text: 'Dashboard', link: '/dashboard' },
        { text: 'Track' },
    ]

    return (
        <AppLayout>
            <Head>
                <title>Track Load - IWS</title>
            </Head>
            <div className="find-truck max-w-screen-xl mx-auto mt-3 mb-10">
                {/* <Header
                    username="Shehzad Khan"
                    avatarUrl="/path-to-avatar.jpg"
                /> */}

                <Breadcrumb items={breadcrumbItems} />
                <Container className="">
                    <Row className="content space-x-5">
                        <Col className="col-md-7 flex flex-col bg-grays px-12 pb-40 space-y-5 mt-4 p-4 bg-white border-gradient border-gradient-color">
                            <h2 className="text-xl font-bold">Ongoing Trip</h2>
                            {cards.map((data, key) => [
                                <Card
                                    className="flex flex-column w-100  p-4"
                                    key={key}>
                                    <div className="">
                                        <div className="flex flex-row">
                                            <div className="bg-primary rounded-full p-2 m-2 h-16 w-16">
                                                <Image
                                                    src={data.avatar}
                                                    width={50}
                                                    height={50}
                                                    alt="User Avatar"
                                                    roundedCircle
                                                    className="me-2"
                                                    style={{
                                                        maxWidth: '50px',
                                                        maxHeight: '50px',
                                                    }}
                                                />
                                            </div>

                                            <div className="p-2">
                                                <h2 className="font-bold text-lg">
                                                    {data.units} Unit
                                                </h2>
                                                <p className="primary-color font-semibold">
                                                    {data.name},{' '}
                                                    {data.driver_id}
                                                </p>
                                                <p className=" text-slate-400">
                                                    {data.email}, {data.phone}
                                                </p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="p-2">
                                            <FontAwesomeIcon
                                                icon={faBookmark}
                                                className="primary-color"
                                            />{' '}
                                            {data.trips}{' '}
                                        </div>
                                        <div className="flex flex-row p-2">
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faMap}
                                                    className="primary-color"
                                                />{' '}
                                                {data.pickup}{' '}
                                            </div>
                                            <div>
                                                <FontAwesomeIcon
                                                    icon={faMap}
                                                    className="primary-color"
                                                />{' '}
                                                {data.dropoff}{' '}
                                            </div>
                                        </div>
                                        <div className="space-x-1 lg:space-x-10 mx-auto text-center">
                                            <Button className="bg-gradients border-gradient border-gradient-color text-white">
                                                <Link
                                                    href={`/track-load/${data.id}`}>
                                                    Track Load
                                                </Link>
                                            </Button>
                                            <Button className="bg-light hover:bg-gray-100 text-black border-gradient border-gradient-color">
                                                <Link
                                                    href={`/track-load/view-load`}>
                                                    View Load
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </Card>,
                            ])}
                        </Col>

                        <Col className="flex flex-col pb-40 space-x-1 space-y-5 mt-4 p-4 bg-white border-gradient border-gradient-color">
                            <Image
                                src={Map}
                                width={600}
                                height={100}
                                alt="Driver Location"
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppLayout>
    )
}

export default TrackLoad
