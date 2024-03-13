'use client'
import Breadcrumb from '@/components/Breadcrumb'
import AppLayout from '@/layouts/AppLayout'
import Head from 'next/head'
import { Col, Container, FormGroup, Row } from 'react-bootstrap'
import styles from './style.module.css'
import SubmitButton from '@/components/submitbutton'
import Label from '@/components/Label'
import InputCustom from '@/components/InputCustom'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { useState } from 'react'
import BulkUploadModal from '@/components/Modal/BulkUploadModal'
import * as Yup from 'yup'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import axios from 'axios'

const AddDriver = () => {
    const [phoneNumber, setPhoneNumber] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const breadcrumbItems = [
        { text: 'Dashboard', link: '/dashboard' },
        { text: 'Drivers', link: '/drivers' },
        { text: 'Create' },
    ]

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        phoneNumber: '',
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        // phoneNumber: Yup.string().required('Phone Number is required'),
    })

    const handleInputChange = value => {
        setPhoneNumber(value)
    }

    const handleInputBlur = () => {
        // You can add validation logic here
        console.log('Phone number is:', phoneNumber)
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleBulkUpload = async file => {
        // Perform the upload logic here (e.g., call your API)
        console.log('Uploading file:', file)
        try {
            const formData = new FormData()
            formData.append('file', file)
            // Make a POST request using Axios
            const response = await axios.post(
                `api/drivers/create/bulk`,
                formData,
            )

            console.log('I am here', response)

            if (response.status === 200) {
                Formik.resetForm()
                console.log('Form submitted successfully.')
            } else {
                console.error('Form submission failed.')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            console.log('Error response from server:', error.response)
        }
        // Close the modal after upload
        handleCloseModal()
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('Line 86', values, phoneNumber)
        values.phoneNumber = phoneNumber
        console.log('Line 88', values, phoneNumber)
        try {
            // Make a POST request using Axios
            const response = await axios.post(`/api/drivers/create`, values, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            console.log('I am here')

            if (response.status === 200) {
                resetForm()
                console.log('Form submitted successfully.')
            } else {
                console.error('Form submission failed.')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setSubmitting(false)
        }

    }

    
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
                            <Row>
                                <Col className="space-y-16">
                                    <div className="d-block float-right">
                                        <button
                                            className="bg-gradients text-white p-3 rounded"
                                            onClick={handleOpenModal}>
                                            Upload Drivers in Bulk
                                        </button>
                                        <BulkUploadModal
                                            show={isModalOpen}
                                            onHide={handleCloseModal}
                                            onUpload={handleBulkUpload}
                                        />
                                    </div>
                                    <div className="space-y-5">
                                        <h3 className="h3">
                                            Upload Single Driver
                                        </h3>
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={(
                                                values,
                                                { setSubmitting, resetForm },
                                            ) => {
                                                console.log('I am in onsubmit')
                                                handleSubmit(values, {
                                                    setSubmitting,
                                                    resetForm,
                                                })
                                            }}
                                            // onSubmit={handleSubmit}
                                            // onSubmit={values => {
                                            //     alert(JSON.stringify(values, null, 2));
                                            //   }}
                                            className="space-y-5">
                                            {({ isSubmitting }) => (
                                                <Form>
                                                    <Row className="space-y-5">
                                                        <Col
                                                            md={12}
                                                            className="flex flex-row space-x-5">
                                                            {/* <Image
                                                    src="/assets/images/default-profile.png"
                                                    height={80}
                                                    width={80}
                                                    alt="Profile"
                                                /> */}
                                                            <FormGroup>
                                                                <Label>
                                                                    Profile
                                                                    Picture
                                                                </Label>
                                                                <InputCustom
                                                                    type="file"
                                                                    inputClass="form-input border-none shadow-lg focus:ring-0"
                                                                    accept="image/*"
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label htmlFor="first_name">
                                                                    First Name
                                                                </Label>
                                                                <Field
                                                                    type="text"
                                                                    name="first_name"
                                                                    id="first_name"
                                                                    placeholder="Enter First Name"
                                                                    className="border-black w-full rounded"
                                                                    required
                                                                />
                                                                <ErrorMessage
                                                                    name="first_name"
                                                                    component="div"
                                                                    style={{
                                                                        color:
                                                                            'red',
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={6}>
                                                            <FormGroup>
                                                                <Label htmlFor="last_name">
                                                                    Last Name
                                                                </Label>
                                                                <Field
                                                                    type="text"
                                                                    name="last_name"
                                                                    id="last_name"
                                                                    placeholder="Enter Last Name"
                                                                    className="border-black w-full rounded"
                                                                    required
                                                                />
                                                                <ErrorMessage
                                                                    name="last_name"
                                                                    component="div"
                                                                    style={{
                                                                        color:
                                                                            'red',
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={12}>
                                                            <FormGroup>
                                                                <Label htmlFor="email">
                                                                    Email
                                                                </Label>
                                                                <Field
                                                                    type="email"
                                                                    name="email"
                                                                    id="email"
                                                                    placeholder="Enter Email Address"
                                                                    className="border-black w-full rounded"
                                                                    required
                                                                />
                                                                <ErrorMessage
                                                                    name="email"
                                                                    component="div"
                                                                    style={{
                                                                        color:
                                                                            'red',
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md={12}>
                                                            <FormGroup>
                                                                <Label htmlFor="phoneNumber">
                                                                    Phone Number
                                                                </Label>
                                                                <PhoneInput
                                                                    // id="phoneNumber"
                                                                    // name="phoneNumber"
                                                                    inputProps={{
                                                                        name:
                                                                            'phoneNumber',
                                                                        id:
                                                                            'phoneNumber',
                                                                        required: true,
                                                                    }}
                                                                    className="rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                                                    value={
                                                                        phoneNumber
                                                                    }
                                                                    inputClass="form-control rounded w-100 h-11 border-black"
                                                                    buttonClass="border-black rounded"
                                                                    defaultErrorMessage="Invalid Phone Number"
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                    onBlur={
                                                                        handleInputBlur
                                                                    }
                                                                    countrySelectProps={{
                                                                        showFlags: true,
                                                                    }}
                                                                    country={
                                                                        'us'
                                                                    }
                                                                    // isValid={(
                                                                    //     value,
                                                                    //     country,
                                                                    // ) => {
                                                                    //     if (
                                                                    //         value.match(
                                                                    //             /12345/,
                                                                    //         )
                                                                    //     ) {
                                                                    //         return (
                                                                    //             'Invalid value: ' +
                                                                    //             value +
                                                                    //             ', ' +
                                                                    //             country.name
                                                                    //         )
                                                                    //     } else if (
                                                                    //         value.match(
                                                                    //             /1234/,
                                                                    //         )
                                                                    //     ) {
                                                                    //         return false
                                                                    //     } else {
                                                                    //         return true
                                                                    //     }
                                                                    // }
                                                                    isValid={(
                                                                        value,
                                                                        country,
                                                                    ) => {
                                                                        if (
                                                                            value.match(
                                                                                /12345/,
                                                                            )
                                                                        ) {
                                                                            return (
                                                                                'Invalid value: ' +
                                                                                value +
                                                                                ', ' +
                                                                                country.name
                                                                            )
                                                                        } else if (
                                                                            value.match(
                                                                                /1234/,
                                                                            )
                                                                        ) {
                                                                            return false
                                                                        } else {
                                                                            return true
                                                                        }
                                                                    }}
                                                                    // }
                                                                />
                                                                <ErrorMessage
                                                                    name="phoneNumber"
                                                                    component="div"
                                                                    style={{
                                                                        color:
                                                                            'red',
                                                                    }}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <SubmitButton
                                                            type="submit"
                                                            className="bg-gradients w-2/4 mx-auto"
                                                            // disabled={
                                                            //     isSubmitting
                                                            // }
                                                        >
                                                            Submit
                                                        </SubmitButton>
                                                    </Row>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AppLayout>
    )
}

export default AddDriver
