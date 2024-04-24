"use client";
import Breadcrumb from "@/components/Breadcrumb";
import AppLayout from "@/layouts/AppLayout";
import Head from "next/head";
import { Col, Container, FormGroup, Row } from "react-bootstrap";
import SubmitButton from "@/components/submitbutton";
import Label from "@/components/Label";
import InputCustom from "@/components/InputCustom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {  useState } from "react";
import BulkUploadModal from "@/components/Modal/BulkUploadModal";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import axios from "axios";
import apis from "@/constants/apis";
import { useAppSelector } from "@/lib/hooks";
import { handleError } from "@/utils/functions";
import "react-country-state-city/dist/react-country-state-city.css";

const AddDriver = () => {
  const { access_token } = useAppSelector((state) => state.auth);

  const [phoneNumber, setPhoneNumber] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const breadcrumbItems = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Drivers", link: "/drivers" },
    { text: "Create" },
  ];

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const handleInputChange = (value) => {
    setPhoneNumber(value);
  };

  const handleInputBlur = () => {
    console.log("Phone number is:", phoneNumber);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBulkUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(apis.bulkDriverCreate, formData, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (response.status === 200) {
        handleCloseModal();
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    values.phoneNumber = phoneNumber;
    try {
      const response = await axios.post(apis.driversCreate, values, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (response.status === 200) {
        resetForm();
        setPhoneNumber("");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <Head>
        <title>Load - IWS</title>
      </Head>
      <div className="load max-w-screen-xl mx-10 mt-3 mb-10">
        <Breadcrumb items={breadcrumbItems} />
        <Container className="space-y-5">
          <Row className="content space-x-5 px-3 bg-white pb-10 pt-3 mt-4">
            <Col className="flex flex-col space-y-5 justify-content-between">
              <Row>
                <Col className="space-y-16">
                  <div className="d-block float-right">
                    <button className="bg-gradients text-white p-3 rounded" onClick={handleOpenModal}>
                      Upload Drivers in Bulk
                    </button>
                    <BulkUploadModal
                      show={isModalOpen}
                      onHide={handleCloseModal}
                      onUpload={handleBulkUpload}
                    />
                  </div>
                  <div className="space-y-5">
                    <h3 className="h3">Upload Single Driver</h3>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log("I am in onsubmit");
                        handleSubmit(values, {
                          setSubmitting,
                          resetForm,
                        });
                      }}
                      className="space-y-5"
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <Row className="space-y-5">
                            <Col md={12} className="flex flex-row space-x-5">
                              <FormGroup>
                                <Label>Profile Picture</Label>
                                <InputCustom
                                  type="file"
                                  inputClass="form-input border-none shadow-lg focus:ring-0"
                                  accept="image/*"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label htmlFor="first_name">First Name</Label>
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
                                    color: "red",
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label htmlFor="last_name">Last Name</Label>
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
                                    color: "red",
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={12}>
                              <FormGroup>
                                <Label htmlFor="email">Email</Label>
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
                                    color: "red",
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col md={12}>
                              <FormGroup>
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <PhoneInput
                                  inputProps={{
                                    name: "phoneNumber",
                                    id: "phoneNumber",
                                    required: true,
                                  }}
                                  className="rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                  value={phoneNumber}
                                  inputClass="form-control rounded w-100 h-11 border-black"
                                  buttonClass="border-black rounded"
                                  defaultErrorMessage="Invalid Phone Number"
                                  onChange={handleInputChange}
                                  onBlur={handleInputBlur}
                                  countrySelectProps={{
                                    showFlags: true,
                                  }}
                                  country={"us"}
                                  isValid={(value, country) => {
                                    if (value.match(/12345/)) {
                                      return "Invalid value: " + value + ", " + country.name;
                                    } else if (value.match(/1234/)) {
                                      return false;
                                    } else {
                                      return true;
                                    }
                                  }}
                                />
                                <ErrorMessage
                                  name="phoneNumber"
                                  component="div"
                                  style={{
                                    color: "red",
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <SubmitButton
                              type="submit"
                              className="bg-gradients w-2/4 mx-auto"
                              disabled={isSubmitting}
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
  );
};

export default AddDriver;
