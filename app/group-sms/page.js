'use client'
import Breadcrumb from '@/components/Breadcrumb'
import AppLayout from '@/layouts/AppLayout'
import Head from 'next/head'
import {
    ButtonGroup,
    Col,
    Container,
    Dropdown,
    Form,
    FormGroup,
    Nav,
    Pagination,
    Row,
    Tab,
    Table,
    Tabs,
} from 'react-bootstrap'
import Button from '@/components/Button'
import SubmitButton from '@/components/submitbutton'
import Label from '@/components/Label'
import InputCustom from '@/components/InputCustom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaFilter, FaTruck } from 'react-icons/fa'
import { faFileEdit, faFilter } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import DataTable from 'react-data-table-component'
import { useEffect, useState } from 'react'
// import Table from '@/components/Table'

const GroupSMS = () => {
    const breadcrumbItems = [
        { text: 'Dashboard', link: '/dashboard' },
        { text: 'SMS' },
    ]

    const handleView = id => {
        // Add logic to view the item with the given id
        console.log(`View item with id ${id}`)
    }

    const handleDelete = id => {
        // Add logic to delete the item with the given id
        console.log(`Delete item with id ${id}`)
    }

    const columns = [
        {
            name: '#',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Drivers',
            selector: row => row.totalDrivers,
        },
        {
            name: 'SMS Send',
            selector: row => row.sentSMS,
        },
        {
            name: 'Updated At',
            selector: row => row.updatedAt,
        },
        {
            name: 'Created At',
            selector: row => row.createdAt,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex justify-content-between flex-wrap">
                    <button className="btn btn-success btn-sm my-1 lg:my-0 lg:mx-1">
                        Edit
                    </button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                </div>
            ),
        },
    ]

    const myData = [
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 1,
            name: 'Beetlejuice',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
        {
            id: 2,
            name: 'Ghostbusters',
            totalDrivers: '1988',
            sentSMS: '1988',
            updatedAt: '1988',
            createdAt: '1988',
        },
    ]

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])

    const getProduct = async () => {
        try {
            const req = await fetch('URL')
            const res = await req.json()
            setData(res)
            setFilter(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() => {
        const result = myData.filter(item => {
            return item.name.toLowerCase().match(search.toLocaleLowerCase())
        })
        setFilter(result)
    }, [search])

    const subHeaderComponent = (
        <>
            <div className="flex flex-row justify-content-between space-x-5 w-100">
                <div>
                    <span>Show</span> &nbsp;
                    <select>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    &nbsp;
                    <span>entries</span>
                </div>
                <div>
                    <span>Search:</span>
                    <input type="text" placeholder="Type to search..." />
                </div>
            </div>
        </>
    )

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
                    <Row className="content space-x-5 px-3 bg-white pb-10 pt-3 mt-4 border-gradient border-gradient-color">
                        <Col className="flex flex-col space-y-5 justify-content-between">
                            {/* <div className="flex flex-row justify-content-between">
                                <h2 className="text-xl font-bold">
                                    SMS Group List
                                </h2>
                                <div>
                                    <SubmitButton className="small bg-danger">
                                        Add Group
                                    </SubmitButton>
                                </div>
                            </div> */}

                            <DataTable
                                columns={columns}
                                data={filter}
                                pagination
                                highlightOnHover
                                striped
                                fixedHeader
                                paginationComponentOptions={{
                                    rowsPerPageText: 'Show entries',
                                    rangeSeparatorText: 'of',
                                    selectAllRowsItem: true,
                                    selectAllRowsItemText: 'All',
                                }}
                                // paginationIconPrevious="Previous"
                                // paginationIconNext="Next"
                                // paginationIconFirstPage="First"
                                // paginationIconLastPage="Last"
                                subHeader
                                subHeaderComponent={
                                    subHeaderComponent
                                    // <>
                                    //     <label>Search:</label>
                                    //     <input
                                    //         type="text"
                                    //         className="w-25 ms-2 form-control"
                                    //         value={search}
                                    //         onChange={e =>
                                    //             setSearch(e.target.value)
                                    //         }
                                    //     />
                                    // </>
                                }
                                title={
                                    <h2 className="text-xl font-bold">
                                        SMS Group List
                                    </h2>
                                }
                                actions={
                                    <button className="btn btn-danger">
                                        Add Group
                                    </button>
                                }
                                responsive
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppLayout>
    )
}

export default GroupSMS
