"use client";
import Breadcrumb from "@/components/Breadcrumb";
import PlacesAutocomplete from "@/components/PlacesAutoComplete";
import apis from "@/constants/apis";
import AppLayout from "@/layouts/AppLayout";
import { useAppSelector } from "@/lib/hooks";
import { handleError } from "@/utils/functions";
import axios from "axios";
import { useFormik } from "formik";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Container, Button, Form, InputGroup, FormGroup } from "react-bootstrap";
import * as Yup from "yup";
import { useLoadScript } from "@react-google-maps/api";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
const breadcrumbItems = [
  { text: "Dashboard", link: "/dashboard" },
  { text: "Load", link: "/load" },
  { text: "add" },
];
const AddLoad = () => {
  const searchParams = useSearchParams();

  const { access_token } = useAppSelector((state) => state.auth);
  const [driverOptions, setDriverOptions] = useState([]);
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [pickupAddress, setPickupAddress] = useState(null);
  const [dropoffAddress, setDropoffAddress] = useState(null);

  const formik = useFormik({
    initialValues: {
      driver: null,
      bill_id: "",
      pickup_date: "",
      total_fare: "",
      driver_fare: "",
      pickup_time: "",
      dropoff_time: "",
      delivery_date: "",
    },
    validationSchema: Yup.object({
      driver: Yup.string().required("Driver is required"),
      bill_id: Yup.string().required("Bill ID is required"),
      pickup_date: Yup.date().required("Pickup date is required"),
      delivery_date: Yup.date().required("Delivery date is required"),
      total_fare: Yup.number()
        .required("Total fare is required")
        .min(0, "Total fare must be greater than or equal to 0"),
      driver_fare: Yup.number()
        .required("Driver fare is required")
        .min(0, "Driver fare must be greater than or equal to 0"),
      pickup_time: Yup.string().required("Pick Up Time is Required "),
      dropoff_time: Yup.string().required("Drop Off Time is Required "),
    }),
    onSubmit: async (values) => {
      if (!pickup) {
        toast.error("Pickup Location is Required");
        return;
      }
      if (!dropoff) {
        toast.error("Dropoff Location is Required");
        return;
      }
      const body = {
        ...values,
        pickup_latitude: pickup.lat,
        pickup_longitude: pickup.lng,
        drop_off_latitude: dropoff.lat,
        drop_off_longitude: dropoff.lng,
        pickup: pickupAddress,
        drop_off: dropoffAddress,
      };
      console.log(body);
      try {
        const { data, status } = await axios.post(apis.loads, body, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (status === 200) {
          toast.success("Load Added Successfully");
        }
      } catch (error) {
        handleError(error);
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const { data, status } = await axios.get(apis.getDriverDropDown, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (status === 200) {
          setDriverOptions(data.data);
          console.log(searchParams.get("driver"));
          formik.setFieldValue("driver", searchParams.get("driver"), true);
        }
      } catch (error) {
        handleError(error);
      }
    };
    getData();
  }, [access_token]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>Load - IWS</title>
      </Head>
      <div className="load max-w-screen-xl mx-10 mt-3 mb-10">
        <Breadcrumb items={breadcrumbItems} />
        <Container className="space-y-5 ">
          <div className="bg-white p-3 h-auto">
            <PlacesAutocomplete setSelected={setPickup} label={"Pickup"} setAddress={setPickupAddress} />
            <PlacesAutocomplete setSelected={setDropoff} label={"DropOff"} setAddress={setDropoffAddress} />
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="driver">Driver</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Select
                    id="driver"
                    name="driver"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.driver}
                    disabled={searchParams.get("driver")}
                  >
                    <option value="">Select a driver</option>
                    {driverOptions.map((driverOption) => (
                      <option key={driverOption.id} value={driverOption.id}>
                        {driverOption.full_name}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                {formik.touched.driver && formik.errors.driver && (
                  <Form.Text className="text-danger">{formik.errors.driver}</Form.Text>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="bill_id">Bill ID</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    id="bill_id"
                    name="bill_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bill_id}
                  />
                </InputGroup>
                {formik.touched.bill_id && formik.errors.bill_id && (
                  <Form.Text className="text-danger">{formik.errors.bill_id}</Form.Text>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="pickup_date">Pickup Date</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="date"
                    id="pickup_date"
                    name="pickup_date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pickup_date}
                  />
                </InputGroup>
                {formik.touched.pickup_date && formik.errors.pickup_date && (
                  <Form.Text className="text-danger">{formik.errors.pickup_date}</Form.Text>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="delivery_date">Delivery Date</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="date"
                    id="delivery_date"
                    name="delivery_date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.delivery_date}
                  />
                </InputGroup>
                {formik.touched.delivery_date && formik.errors.delivery_date && (
                  <Form.Text className="text-danger">{formik.errors.delivery_date}</Form.Text>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="pickup_time">Pickup Time</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="time"
                    id="pickup_time"
                    name="pickup_time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pickup_time}
                  />
                </InputGroup>
                {formik.touched.pickup_time && formik.errors.pickup_time && (
                  <Form.Text className="text-danger">{formik.errors.pickup_time}</Form.Text>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="dropoff_time">Dropoff Time</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="time"
                    id="dropoff_time"
                    name="dropoff_time"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dropoff_time}
                  />
                </InputGroup>
                {formik.touched.dropoff_time && formik.errors.dropoff_time && (
                  <Form.Text className="text-danger">{formik.errors.dropoff_time}</Form.Text>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="total_fare">Total Fare</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    id="total_fare"
                    name="total_fare"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.total_fare}
                  />
                </InputGroup>
                {formik.touched.total_fare && formik.errors.total_fare && (
                  <Form.Text className="text-danger">{formik.errors.total_fare}</Form.Text>
                )}
              </FormGroup>
              <FormGroup className="mb-3">
                <Form.Label htmlFor="driver_fare">Driver Fare</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    id="driver_fare"
                    name="driver_fare"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.driver_fare}
                  />
                </InputGroup>
                {formik.touched.driver_fare && formik.errors.driver_fare && (
                  <Form.Text className="text-danger">{formik.errors.driver_fare}</Form.Text>
                )}
              </FormGroup>

              <FormGroup className="space-x-2 float-right">
                <Button className="bg-primary border-primary" type="submit">
                  Save Load
                </Button>
              </FormGroup>
            </Form>
          </div>
        </Container>
      </div>
    </AppLayout>
  );
};

export default AddLoad;
