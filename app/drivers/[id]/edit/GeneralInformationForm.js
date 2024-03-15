import React, { useEffect, useState } from "react";
// import { useFormik } from 'formik'
import axios from "axios";
import InputCustom from "@/components/InputCustom";
import { Alert, Col, FormGroup, Row } from "react-bootstrap";
import Image from "next/image";
import Label from "@/components/Label";
import SubmitButton from "@/components/submitbutton";
import * as Yup from "yup";
import { useFormik } from "formik";

const GeneralInformationForm = ({ userId, data }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const imageUrl = "/assets/images/default-profile.png";
  const [profileImg, setProfileImg] = useState(imageUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const id = userId;

  const formik = useFormik({
    initialValues: {
      user_id: id, // Replace with the actual user ID
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      dob: data.profileData ? data.profileData.dob : "",
      status: data.driverData ? data.driverData.status : "not_available",
      phone: data.profileData ? data.profileData.phone : "",
      hired_by: data.hired_by ? data.hired_by.first_name + " " + data.hired_by.last_name : "",
      profile_picture: data.profileData ? profileImg : "/assets/images/default-profile.png",
      note: data.driverData ? data.driverData.note : "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      profile_picture: Yup.mixed().required("File is required"),
      phone: Yup.string().nullable(),
      dob: Yup.string().nullable(),
      status: Yup.string().nullable(),
      hired_by: Yup.string().nullable(),
      note: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      console.log("I am values: ", values);
      try {
        setIsSubmitting(true);
        setAlertMessage(null); // Clear any previous alert
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          // if (key === 'profile_picture' && values[key]) {
          //     formData.append(key, values[key], values[key].name)
          // } else {
          formData.append(key, values[key]);
          // }
        });
        console.log(formData);

        await axios.post(`/api/drivers/${id}/updateGeneralInformation`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // Handle success (you may redirect or show a success message)
        // Handle Success
        setAlertMessage({
          variant: "success",
          message: "Data updated successfully",
        });
      } catch (error) {
        console.error(error.response.data);
        // Handle error (show an error message)
        // Handle error
        setAlertMessage({
          variant: "danger",
          message: "Error updating data",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  console.log("I am running 58");

  return (
    <form onSubmit={formik.handleSubmit}>
      {alertMessage && (
        <Alert variant={alertMessage.variant} onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage.message}
        </Alert>
      )}
      <div className="flex flex-row space-x-5">
        <Image src={profileImg} height={80} width={80} alt="Profile" className="px-2 py-1 rounded-full" />
        <FormGroup>
          <Label>Profile Picture</Label>
          <InputCustom
            type="file"
            className="form-text"
            name="profile_picture"
            id="profile_picture"
            // onChange={handleFileChange}
            onChange={(event) => {
              // Set the file in Formik state
              formik.setFieldValue("profile_picture", event.currentTarget.files[0]);
              setProfileImg(URL.createObjectURL(event.currentTarget.files[0]));
            }}
          />
          {formik.touched.profile_picture && formik.errors.profile_picture ? (
            <div>{formik.errors.profile_picture}</div>
          ) : null}
        </FormGroup>
      </div>
      <Row>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="first_name">First Name</Label>
            <InputCustom
              type="text"
              name="first_name"
              id="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div>{formik.errors.first_name}</div>
            ) : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="last_name">Last Name</Label>
            <InputCustom
              type="text"
              name="last_name"
              id="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div>{formik.errors.last_name}</div>
            ) : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <InputCustom
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              disabled
            />
            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="dob">Date of Birth</Label>
            <InputCustom
              type="date"
              name="dob"
              id="dob"
              onChange={formik.handleChange}
              value={formik.values.dob}
            />
            {formik.touched.dob && formik.errors.dob ? <div>{formik.errors.dob}</div> : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="hired_by">Hired By</Label>
            <InputCustom
              type="text"
              name="hired_by"
              id="hired_by"
              disabled
              onChange={formik.handleChange}
              value={formik.values.hired_by}
            />
            {formik.touched.hired_by && formik.errors.hired_by ? <div>{formik.errors.hired_by}</div> : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <InputCustom
              as="select"
              name="status"
              id="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            >
              <option value="available">Available</option>
              <option value="not available">Not Available</option>
              <option value="will be available">Will be available</option>
              <option value="under our load">Under Our Load</option>
              <option value="under our bid">Under Our Bid</option>
              <option value="suspended">Suspended</option>
            </InputCustom>
            {formik.touched.status && formik.errors.status ? <div>{formik.errors.status}</div> : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <InputCustom
              type="text"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="note">Note</Label>
            <InputCustom
              type="text"
              name="note"
              id="note"
              onChange={formik.handleChange}
              value={formik.values.note}
            />
            {formik.touched.note && formik.errors.note ? <div>{formik.errors.note}</div> : null}
          </FormGroup>
        </Col>
        <SubmitButton className="bg-gradients w-1/4 m-auto" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default GeneralInformationForm;
