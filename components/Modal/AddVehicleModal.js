import { Modal, Button, Form, Row, Col, FormGroup } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputCustom from "../InputCustom";
import Label from "../Label";
import Image from "next/image";
import { useState } from "react";
import { trucksFeatures } from "@/constants/data";

const AddVehicleModal = ({ isOpen, onClose, onSubmit, truckTypes, driverStatus }) => {
  const [licensePlate, setLicensePlate] = useState("/assets/images/placeholder.jpg");
  const [frontImage, setFrontImage] = useState("/assets/images/placeholder.jpg");
  const [backImage, setBackImage] = useState("/assets/images/placeholder.jpg");
  const [rightImage, setRightImage] = useState("/assets/images/placeholder.jpg");
  const [leftImage, setLeftImage] = useState("/assets/images/placeholder.jpg");
  const [cargoImage, setCargoImage] = useState("/assets/images/placeholder.jpg");
  const initialValues = {
    vehicle_type: "",
    unit_number: "",
    make: "",
    model: "",
    payload_weight: "",
    length: "",
    width: "",
    height: "",
    dimension_in: "",
    is_available: "",
    lift_gate: "",
    hazmat: "",
    icc_bar: "",
    tsa: "",
    twic: "",
    pallet_jack: "",
    true_dock_high: "",
    tanker_endorsement: "",
    license_plate_image: "",
    state: "",
    license_expiry: "",
    is_expirable: "",
    front_image: "",
    back_image: "",
    left_image: "",
    right_image: "",
    cargo_image: "",
  };

  const validationSchema = Yup.object({
    vehicle_type: Yup.string().required("Required"),
    unit_number: Yup.string().required("Required"),
    make: Yup.string().required("Required"),
    model: Yup.string().required("Required"),
    payload_weight: Yup.string().required("Required"),
    length: Yup.number().required("Required"),
    width: Yup.number().required("Required"),
    height: Yup.number().required("Required"),
    dimension_in: Yup.string().required("Required"),
    is_available: Yup.string().required("Required"),
    license_plate_image: Yup.mixed().required("Required"),
    state: Yup.string().required("Required"),
    license_expiry: Yup.date().required("Required"),
    front_image: Yup.mixed().required("Required"),
    back_image: Yup.mixed().required("Required"),
    left_image: Yup.mixed().required("Required"),
    right_image: Yup.mixed().required("Required"),
    cargo_image: Yup.mixed().required("Required"),
    // Add validation for other fields
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
      onClose();
      formik.resetForm();
      setFrontImage("/assets/images/placeholder.jpg");
      setBackImage("/assets/images/placeholder.jpg");
      setLeftImage("/assets/images/placeholder.jpg");
      setRightImage("/assets/images/placeholder.jpg");
      setCargoImage("/assets/images/placeholder.jpg");
      setLicensePlate("/assets/images/placeholder.jpg");
    },
  });

  return (
    <Modal show={isOpen} onHide={onClose} size="xl">
      <Modal.Header>
        <Modal.Title>Add New Vehicle</Modal.Title>
        <Button
          onClick={onClose}
          className="text-black border-none hover:bg-transparent float-right text-2xl fw-bold"
        >
          X
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md={6} className="space-y-3">
              <h4 className="text-xl">Vehicle Details</h4>
              <Row>
                <Col md={6}>
                  {/* Example field, add others accordingly */}
                  <FormGroup controlId="vehicle_type">
                    <Label>Truck Types</Label>
                    <InputCustom
                      as="select"
                      name="vehicle_type"
                      value={formik.values.vehicle_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.vehicle_type && !!formik.errors.vehicle_type}
                      feedbackError={formik.errors.vehicle_type}
                      required
                    >
                      <option value="">Select</option>
                      {Object.keys(truckTypes).map((key) => (
                        <option key={key} value={key}>
                          {truckTypes[key]}
                        </option>
                      ))}
                    </InputCustom>
                    {/* <Form.Control.Feedback type="invalid">
                                            {formik.errors.vehicle_type}
                                        </Form.Control.Feedback> */}
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="unit_number">Unit Number</Label>
                    <InputCustom
                      type="text"
                      name="unit_number"
                      id="unit_number"
                      onChange={formik.handleChange}
                      value={formik.values.unit_number}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.unit_number && !!formik.errors.unit_number}
                      feedbackError={formik.errors.unit_number}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="make">Make</Label>
                    <InputCustom
                      type="text"
                      name="make"
                      id="make"
                      onChange={formik.handleChange}
                      value={formik.values.make}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.make && !!formik.errors.make}
                      feedbackError={formik.errors.make}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="model">Model</Label>
                    <InputCustom
                      type="text"
                      name="model"
                      id="model"
                      onChange={formik.handleChange}
                      value={formik.values.model}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.model && !!formik.errors.model}
                      feedbackError={formik.errors.model}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="payload_weight">Payload Weight</Label>
                    <InputCustom
                      type="text"
                      name="payload_weight"
                      id="payload_weight"
                      onChange={formik.handleChange}
                      value={formik.values.payload_weight}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.payload_weight && !!formik.errors.payload_weight}
                      feedbackError={formik.errors.payload_weight}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <h4 className="text-xl">Truck Dimension</h4>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <Label htmlFor="length">Length</Label>
                    <InputCustom
                      type="text"
                      name="length"
                      id="length"
                      onChange={formik.handleChange}
                      value={formik.values.length}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.length && !!formik.errors.length}
                      feedbackError={formik.errors.length}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label htmlFor="width">Width</Label>
                    <InputCustom
                      type="text"
                      name="width"
                      id="width"
                      onChange={formik.handleChange}
                      value={formik.values.width}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.width && !!formik.errors.width}
                      feedbackError={formik.errors.width}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label htmlFor="height">Height</Label>
                    <InputCustom
                      type="text"
                      name="height"
                      id="height"
                      onChange={formik.handleChange}
                      value={formik.values.height}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.height && !!formik.errors.height}
                      feedbackError={formik.errors.height}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label htmlFor="dimension_in">Dim In</Label>
                    <InputCustom
                      as="select"
                      name="dimension_in"
                      id="dimension_in"
                      onChange={formik.handleChange}
                      value={formik.values.dimension_in}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.dimension_in && !!formik.errors.dimension_in}
                      feedbackError={formik.errors.dimension_in}
                      required
                    >
                      <option value="">None</option>
                      <option value="feet">Feet</option>
                      <option value="inches">Inches</option>
                    </InputCustom>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="is_available">Status</Label>
                    <InputCustom
                      as="select"
                      name="is_available"
                      id="is_available"
                      onChange={formik.handleChange}
                      value={formik.values.is_available}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.is_available && !!formik.errors.is_available}
                      feedbackError={formik.errors.is_available}
                      required
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value={"0"}>Available</option>
                      <option value={"1"}>Not Available</option>
                    </InputCustom>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                {Object.keys(trucksFeatures).map((item) => (
                  <Col md={4} key={item}>
                    <FormGroup>
                      <InputCustom
                        type="checkbox"
                        name={item}
                        id={item}
                        label={item.replaceAll("_", " ").toUpperCase()}
                        isCheck={true}
                        onChange={formik.handleChange}
                        value={formik.values[item]}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched[item] && !!formik.errors[item]}
                        feedbackError={formik.errors[item]}
                      />
                    </FormGroup>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={6} className="space-y-3">
              <h4 className="text-xl">License Plate and Registration</h4>
              <Row>
                <Col>
                  <Image
                    src={licensePlate}
                    height={80}
                    width={80}
                    alt="License Plate"
                    className="px-2 py-1 rounded-full"
                  />
                  <FormGroup>
                    <Label htmlFor="license_plate_image">License Plate</Label>
                    <InputCustom
                      type="file"
                      className="form-text"
                      name="license_plate_image"
                      id="license_plate_image"
                      isInvalid={formik.touched.license_plate_image && !!formik.errors.license_plate_image}
                      feedbackError={formik.errors.license_plate_image}
                      onChange={(event) => {
                        // Set the file in Formik state
                        formik.setFieldValue("license_plate_image", event.currentTarget.files[0]);
                        setLicensePlate(URL.createObjectURL(event.currentTarget.files[0]));
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="state">States</Label>
                    <InputCustom
                      as="select"
                      name="state"
                      id="state"
                      onChange={formik.handleChange}
                      value={formik.values.state}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.state && !!formik.errors.state}
                      feedbackError={formik.errors.state}
                      required
                    >
                      <option value="">None</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </InputCustom>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="license_expiry">Expiration Date</Label>
                    <InputCustom
                      type="date"
                      name="license_expiry"
                      id="license_expiry"
                      onChange={formik.handleChange}
                      value={formik.values.license_expiry}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.license_expiry && !!formik.errors.license_expiry}
                      feedbackError={formik.errors.license_expiry}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <p>Is Expirable?</p>
                    <InputCustom
                      type="checkbox"
                      name="is_expirable"
                      id="is_expirable"
                      label="Expirable"
                      isCheck={true}
                      onChange={formik.handleChange}
                      value={formik.values.is_expirable}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.is_expirable && !!formik.errors.is_expirable}
                      feedbackError={formik.errors.is_expirable}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <h4 className="text-xl">Pictures of the Vehicle</h4>
              <Row>
                <Col md={6}>
                  <Image
                    src={frontImage}
                    height={80}
                    width={80}
                    alt="Front Image"
                    className="px-2 py-1 rounded-full"
                  />
                  <FormGroup>
                    <Label htmlFor="front_image">Front Image</Label>
                    <InputCustom
                      type="file"
                      className="form-text"
                      name="front_image"
                      id="front_image"
                      isInvalid={formik.touched.front_image && !!formik.errors.front_image}
                      feedbackError={formik.errors.front_image}
                      onChange={(event) => {
                        // Set the file in Formik state
                        formik.setFieldValue("front_image", event.currentTarget.files[0]);
                        setFrontImage(URL.createObjectURL(event.currentTarget.files[0]));
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <Image
                    src={backImage}
                    height={80}
                    width={80}
                    alt="Back Image"
                    className="px-2 py-1 rounded-full"
                  />
                  <FormGroup>
                    <Label htmlFor="back_image">Back Image</Label>
                    <InputCustom
                      type="file"
                      className="form-text"
                      name="back_image"
                      id="back_image"
                      isInvalid={formik.touched.back_image && !!formik.errors.back_image}
                      feedbackError={formik.errors.back_image}
                      onChange={(event) => {
                        // Set the file in Formik state
                        formik.setFieldValue("back_image", event.currentTarget.files[0]);
                        setBackImage(URL.createObjectURL(event.currentTarget.files[0]));
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <Image
                    src={leftImage}
                    height={80}
                    width={80}
                    alt="Left Image"
                    className="px-2 py-1 rounded-full"
                  />
                  <FormGroup>
                    <Label htmlFor="left_image">Left Image</Label>
                    <InputCustom
                      type="file"
                      className="form-text"
                      name="left_image"
                      id="left_image"
                      isInvalid={formik.touched.left_image && !!formik.errors.left_image}
                      feedbackError={formik.errors.left_image}
                      onChange={(event) => {
                        // Set the file in Formik state
                        formik.setFieldValue("left_image", event.currentTarget.files[0]);
                        setLeftImage(URL.createObjectURL(event.currentTarget.files[0]));
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <Image
                    src={rightImage}
                    height={80}
                    width={80}
                    alt="Right Image"
                    className="px-2 py-1 rounded-full"
                  />
                  <FormGroup>
                    <Label htmlFor="right_image">Right Image</Label>
                    <InputCustom
                      type="file"
                      className="form-text"
                      name="right_image"
                      id="right_image"
                      isInvalid={formik.touched.right_image && !!formik.errors.right_image}
                      feedbackError={formik.errors.right_image}
                      onChange={(event) => {
                        // Set the file in Formik state
                        formik.setFieldValue("right_image", event.currentTarget.files[0]);
                        setRightImage(URL.createObjectURL(event.currentTarget.files[0]));
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <Image
                    src={cargoImage}
                    height={80}
                    width={80}
                    alt="Cargo Image"
                    className="px-2 py-1 rounded-full"
                  />
                  <FormGroup>
                    <Label htmlFor="cargo_image">Cargo Image</Label>
                    <InputCustom
                      type="file"
                      className="form-text"
                      name="cargo_image"
                      id="cargo_image"
                      isInvalid={formik.touched.cargo_image && !!formik.errors.cargo_image}
                      feedbackError={formik.errors.cargo_image}
                      onChange={(event) => {
                        // Set the file in Formik state
                        formik.setFieldValue("cargo_image", event.currentTarget.files[0]);
                        setCargoImage(URL.createObjectURL(event.currentTarget.files[0]));
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            {/* Add other form fields */}
            <Button className="bg-primary border-none my-5" type="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddVehicleModal;
