// NewLoadModal.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, InputGroup, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaCalendar, FaDollarSign, FaMoneyBill, FaSearchLocation, FaUsers } from "react-icons/fa";
import axios from "axios";
import apis from "@/constants/apis";
import { useAppSelector } from "@/lib/hooks";

const NewLoadModal = ({ show, handleClose }) => {
  const { access_token } = useAppSelector((state) => state.auth);
  const [driverOptions, setDriverOptions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data, status } = await axios.get(apis.getDriverDropDown, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (status === 200) {
          setDriverOptions(data.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    getData();
  }, [access_token]);

  const handleAddLoad = async (values) => {
    try {
      // Assuming you have an Axios instance set up
      const response = await axios.post(apis.loads, values);

      if (response.data.success) {
        // Show a success message (you can use React state for this)
        console.log("Trip added successfully!");
      } else {
        // Handle cases where the API request was successful but the trip wasn't added
        console.error("Failed to add trip. Server response:", response.data);
      }
    } catch (error) {
      // Handle errors related to the API request
      console.error("Error adding trip:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      driver: null,
      bill_id: "",
      pickup: "",
      drop_off: "",
      pickup_date: "",
      total_fare: "",
      driver_fare: "",
    },
    validationSchema: Yup.object({
      driver: Yup.string().required("Driver is required"),
      bill_id: Yup.string().required("Bill ID is required"),
      pickup: Yup.string().required("Pickup location is required"),
      drop_off: Yup.string().required("Drop-off location is required"),
      pickup_date: Yup.date().required("Pickup date is required"),
      total_fare: Yup.number()
        .required("Total fare is required")
        .min(0, "Total fare must be greater than or equal to 0"),
      driver_fare: Yup.number()
        .required("Driver fare is required")
        .min(0, "Driver fare must be greater than or equal to 0"),
    }),
    onSubmit: (values) => {
      console.log("106: ", values);
      handleAddLoad(values);
      handleClose();
    },
  });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Load</Modal.Title>
        {driverOptions.values}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <Form.Label htmlFor="driver">Driver</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaUsers />
              </InputGroup.Text>
              <Form.Select
                id="driver"
                name="driver"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.driver}
              >
                <option value="" disabled>
                  Select a driver
                </option>
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
              <InputGroup.Text id="">
                <FaMoneyBill />
              </InputGroup.Text>
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
            <Form.Label htmlFor="pickup">Pickup</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FaSearchLocation />
              </InputGroup.Text>
              <Form.Control
                type="text"
                id="pickup"
                name="pickup"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pickup}
              />
            </InputGroup>
            {formik.touched.pickup && formik.errors.pickup && (
              <Form.Text className="text-danger">{formik.errors.pickup}</Form.Text>
            )}
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label htmlFor="drop_off">Drop Off</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FaSearchLocation />
              </InputGroup.Text>
              <Form.Control
                type="text"
                id="drop_off"
                name="drop_off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.drop_off}
              />
            </InputGroup>
            {formik.touched.drop_off && formik.errors.drop_off && (
              <Form.Text className="text-danger">{formik.errors.drop_off}</Form.Text>
            )}
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label htmlFor="pickup_date">Pickup Date</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FaCalendar />
              </InputGroup.Text>
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
            <Form.Label htmlFor="total_fare">Total Fare</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <FaDollarSign />
              </InputGroup.Text>
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
              <InputGroup.Text id="basic-addon1">
                <FaDollarSign />
              </InputGroup.Text>
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

          {/* Other form fields go here... */}

          <FormGroup className="space-x-2 float-right">
            <Button className="bg-primary border-primary" type="submit">
              Save Load
            </Button>
            <Button type="button" onClick={handleClose} className="bg-secondary border-secondary">
              Close
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
    // <Button type='submit' className='bg-primary border-primary'>
    //   Upload
    // </Button>
    // <Button  className='bg-secondary border-secondary' onClick={onHide}>
    //   Close
    // </Button>
  );
};

export default NewLoadModal;
