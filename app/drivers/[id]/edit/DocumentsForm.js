import InputCustom from "@/components/InputCustom";
import Label from "@/components/Label";
import SubmitButton from "@/components/submitbutton";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useState } from "react";
import { Alert, Col, FormGroup, Row } from "react-bootstrap";
import * as Yup from "yup";
import { CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { baseUrl } from "@/constants/apis";

const DocumentsForm = ({ userId, data }) => {
  const lFrontUrl = data.driverData.license_details
    ? `${data.driverData.license_details.license_photo_front}`
    : "/assets/images/placeholder.jpg";
  const lBackUrl = data.driverData.license_details
    ? `${data.driverData.license_details.license_photo_back}`
    : "/assets/images/placeholder.jpg";
  const iFrontUrl = data.driverData.insurance_details
    ? `${data.driverData.insurance_details.insurance_photo_front}`
    : "/assets/images/placeholder.jpg";
  const iBackUrl = data.driverData.insurance_details
    ? `${data.driverData.insurance_details.insurance_photo_back}`
    : "/assets/images/placeholder.jpg";
  const { access_token } = useAppSelector((state) => state.auth);
  const [licenseFront, setLicenseFront] = useState(lFrontUrl);
  const [licenseBack, setLicenseBack] = useState(lBackUrl);
  const [insuranceFront, setInsuranceFront] = useState(iFrontUrl);
  const [insuranceBack, setInsuranceBack] = useState(iBackUrl);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [countryid, setCountryid] = useState(0);
  const [stateId, setStateId] = useState(0);

  const id = userId;

  const formik = useFormik({
    initialValues: {
      user_id: id,
      driver_id: data.driverData.id,
      profile_id: data.profileData.id,
      license_number: data.driverData.license_details ? data.driverData.license_details.license_number : "",
      license_expiry_date: data.driverData.license_details
        ? data.driverData.license_details.license_expiry_date
        : "",
      license_issuance_country: data.driverData.license_details
        ? data.driverData.license_details.license_issuance_country
        : "",
      license_issuance_state: data.driverData.license_details
        ? data.driverData.license_details.license_issuance_state
        : "",
      license_photo_front: lFrontUrl,
      license_photo_back: lBackUrl,
      insurance_number: data.driverData.insurance_details
        ? data.driverData.insurance_details.insurance_number
        : "",
      insurance_expiry_date: data.driverData.insurance_details
        ? data.driverData.insurance_details.insurance_expiry_date
        : "",
      insurance_photo_front: iFrontUrl,
      insurance_photo_back: iBackUrl,
    },
    validationSchema: Yup.object({
      license_number: Yup.string().required("License Number is required"),
      license_expiry_date: Yup.date().required("License Expiry Date is required"),
      license_issuance_country: Yup.string().required("Please Select License Issuance Country"),
      license_issuance_state: Yup.string().required("Please Select License Issuance State"),
      license_photo_front: Yup.mixed().required("Please Select License Front"),
      license_photo_back: Yup.mixed().required("Please Select License Back"),
      insurance_number: Yup.string().required("Insurance Number is required"),
      insurance_expiry_date: Yup.date().required("Insurance Expiry Date is required"),
      insurance_photo_front: Yup.mixed().required("Please Select Insurance Front"),
      insurance_photo_back: Yup.mixed().required("Please Select Insurance Back"),
    }),
    onSubmit: async (values) => {
      console.log("I am values: ", values);
      try {
        setIsSubmitting(true);
        setAlertMessage(null); // Clear any previous alert
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
          // if (key === 'license_issuance_country' && values[key]) {
          //     formData.append(key, values[key], values[key].name)
          // } else {
          formData.append(key, values[key]);
          // }
        });

        await axios.post(`${baseUrl}/drivers/${id}/updateDocuments`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
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
  return (
    <form onSubmit={formik.handleSubmit}>
      {alertMessage && (
        <Alert variant={alertMessage.variant} onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage.message}
        </Alert>
      )}
      <h2 className="text-xl font-bold">License Details</h2>
      <Row>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="license_number">License Number</Label>
            <InputCustom
              type="text"
              name="license_number"
              id="license_number"
              onChange={formik.handleChange}
              value={formik.values.license_number}
            />
            {formik.touched.license_number && formik.errors.license_number ? (
              <div>{formik.errors.license_number}</div>
            ) : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="license_expiry_date">License Expiration</Label>
            <InputCustom
              type="date"
              min={new Date().toISOString().split("T")[0]}
              name="license_expiry_date"
              id="license_expiry_date"
              onChange={formik.handleChange}
              value={formik.values.license_expiry_date}
            />
            {formik.touched.license_expiry_date && formik.errors.license_expiry_date ? (
              <div>{formik.errors.license_expiry_date}</div>
            ) : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="license_issuance_country">Country</Label>
            <CountrySelect
              name="license_issuance_country"
              id="license_issuance_country"
              onChange={(e) => {
                setCountryid(e.id);
                formik.setFieldValue("license_issuance_country", e.name);
              }}
              value={formik.values.license_issuance_country}
              // defaultValue={formik.values.license_issuance_country}
              placeHolder="Select Country"
            />
            {formik.touched.license_issuance_country && formik.errors.license_issuance_country ? (
              <div>{formik.errors.license_issuance_country}</div>
            ) : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="license_issuance_state">State</Label>
            <StateSelect
              countryid={countryid}
              name="license_issuance_state"
              id="license_issuance_state"
              onChange={(e) => {
                setStateId(e.id);
                formik.setFieldValue("license_issuance_state", e.name);
              }}
              placeHolder="Select State"
              // defaultValue={formik.values.license_issuance_state}
              value={formik.values.license_issuance_state}
            />
            {formik.touched.license_issuance_state && formik.errors.license_issuance_state ? (
              <div>{formik.errors.license_issuance_state}</div>
            ) : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="license_photo_front">Driver License Photo (Front)</Label>
            <InputCustom
              type="file"
              className="form-text"
              name="license_photo_front"
              id="license_photo_front"
              onChange={(event) => {
                // Set the file in Formik state
                formik.setFieldValue("license_photo_front", event.currentTarget.files[0]);
                setLicenseFront(URL.createObjectURL(event.currentTarget.files[0]));
              }}
            />
            {formik.touched.license_photo_front && formik.errors.license_photo_front ? (
              <div>{formik.errors.license_photo_front}</div>
            ) : null}
            <Image
              src={licenseFront}
              height={80}
              width={80}
              alt="License Front"
              className="px-2 py-1 rounded-full"
            />
            Maximum file upload size is 100MB
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="license_photo_back">Driver License Photo (Back)</Label>
            <InputCustom
              type="file"
              className="form-text"
              name="license_photo_back"
              id="license_photo_back"
              onChange={(event) => {
                // Set the file in Formik state
                formik.setFieldValue("license_photo_back", event.currentTarget.files[0]);
                setLicenseBack(URL.createObjectURL(event.currentTarget.files[0]));
              }}
            />
            {formik.touched.license_photo_back && formik.errors.license_photo_back ? (
              <div>{formik.errors.license_photo_back}</div>
            ) : null}
            <Image
              src={licenseBack}
              height={80}
              width={80}
              alt="Profile"
              className="px-2 py-1 rounded-full"
            />
            Maximum file upload size is 100MB
          </FormGroup>
        </Col>
        <br />
        <h2 className="text-xl font-bold">Insurance Details</h2>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="insurance_number">Insurance Number</Label>
            <InputCustom
              type="text"
              name="insurance_number"
              id="insurance_number"
              onChange={formik.handleChange}
              value={formik.values.insurance_number}
            />
            {formik.touched.insurance_number && formik.errors.insurance_number ? (
              <div>{formik.errors.insurance_number}</div>
            ) : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="insurance_expiry_date">Insurance Expiration</Label>
            <InputCustom
              type="date"
              name="insurance_expiry_date"
              id="insurance_expiry_date"
              min={new Date().toISOString().split("T")[0]}
              onChange={formik.handleChange}
              value={formik.values.insurance_expiry_date}
            />
            {formik.touched.insurance_expiry_date && formik.errors.insurance_expiry_date ? (
              <div>{formik.errors.insurance_expiry_date}</div>
            ) : null}
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="insurance_photo_front">Insurance Front</Label>
            <InputCustom
              type="file"
              className="form-text"
              name="insurance_photo_front"
              id="insurance_photo_front"
              onChange={(event) => {
                // Set the file in Formik state
                formik.setFieldValue("insurance_photo_front", event.currentTarget.files[0]);
                setInsuranceFront(URL.createObjectURL(event.currentTarget.files[0]));
              }}
            />
            {formik.touched.insurance_photo_front && formik.errors.insurance_photo_front ? (
              <div>{formik.errors.insurance_photo_front}</div>
            ) : null}
            <Image
              src={insuranceFront}
              height={80}
              width={80}
              alt="Profile"
              className="px-2 py-1 rounded-full"
            />
            Maximum file upload size is 100MB
          </FormGroup>
        </Col>
        <Col md={6} className="mb-6">
          <FormGroup>
            <Label htmlFor="insurance_photo_back">Insurance Back</Label>
            <InputCustom
              type="file"
              className="form-text"
              name="insurance_photo_back"
              id="insurance_photo_back"
              onChange={(event) => {
                // Set the file in Formik state
                formik.setFieldValue("insurance_photo_back", event.currentTarget.files[0]);
                setInsuranceBack(URL.createObjectURL(event.currentTarget.files[0]));
              }}
            />
            {formik.touched.insurance_photo_back && formik.errors.insurance_photo_back ? (
              <div>{formik.errors.insurance_photo_back}</div>
            ) : null}
            <Image
              src={insuranceBack}
              height={80}
              width={80}
              alt="Profile"
              className="px-2 py-1 rounded-full"
            />
            Maximum file upload size is 100MB
          </FormGroup>
        </Col>
        <SubmitButton className="bg-gradients w-1/4 m-auto" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default DocumentsForm;
