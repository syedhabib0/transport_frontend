"use client";
import Breadcrumb from "@/components/Breadcrumb";
import InputCustom from "@/components/InputCustom";
import AppLayout from "@/layouts/AppLayout";
import Head from "next/head";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";

const breadcrumbItems = [
  { text: 'Dashboard', link: '/dashboard' },
  { text: 'Find Truck' },
]

const optionList = [
  { value: 'available', label: 'Available' },
  { value: 'in-transit', label: 'In Transit' },
  { value: 'not-available', label: 'Not Available' },
  { value: 'blue', label: 'Blue' },
  { value: 'white', label: 'White' },
]
const FindTruck = () => {
  const [selectedOptions, setSelectedOptions] = useState()


  function handleSelect(data) {
    setSelectedOptions(data)
}
  return (
    <AppLayout>
      <Head>
        <title>Find Truck - IWS</title>
      </Head>
      <div className="find-truck max-w-screen-xl mx-auto mt-3 mb-10">
        <Breadcrumb items={breadcrumbItems} />
        <Container className="">
          <Row className="content space-x-5">
            <Col className="col-md-7 flex flex-col pb-40 space-y-5 mt-4 p-4 bg-white border-gradient border-gradient-color">
              <h2 className="text-xl font-bold">Origin Points</h2>
              <InputCustom
                className="outline-slate-400"
                float={true}
                controlId="pickup-location"
                label="Pickup Location"
              />
              <InputCustom
                className="outline-slate-400"
                controlId="pickup-location"
                label="Distance"
                float={true}
                value="300"
                icon={"In Mile(s)"}
              />
              <Form.Group>
                <InputCustom
                  isCheck={true}
                  label="Measure Driver Accurate Route"
                  className=" border-slate-400"
                />
              </Form.Group>

              <Form.Group className="flex flex-row space-x-5">
                <h2 className="text-xl font-bold">Truck Features</h2>
                <Form.Select className="w-50">
                  <option value="find truck" key="0" selected disabled>
                    Find Truck
                  </option>
                  <option value="Large" key="1">
                    Large
                  </option>
                  <option value="Medium" key="2">
                    Medium
                  </option>
                  <option value="Small" key="3">
                    Small
                  </option>
                </Form.Select>
              </Form.Group>
              <div className="flex flex-row flex-wrap space-x-5 space-y-3">
                <Form.Group className="pt-3">
                  <InputCustom isCheck={true} label="Van Modified" className=" me-3 border-slate-400" />
                </Form.Group>
                <Form.Group>
                  <InputCustom isCheck={true} label="Lift Gate" className=" me-3 border-slate-400" />
                </Form.Group>
                <Form.Group>
                  <InputCustom isCheck={true} label="Hazmat" className=" me-3 border-slate-400" />
                </Form.Group>
                <Form.Group>
                  <InputCustom isCheck={true} label="Airride" className=" me-3 border-slate-400" />
                </Form.Group>
                <Form.Group>
                  <InputCustom isCheck={true} label="TSA" className=" me-3 border-slate-400" />
                </Form.Group>
                <Form.Group>
                  <InputCustom isCheck={true} label="TWIC" className=" me-3 border-slate-400" />
                </Form.Group>
                <Form.Group>
                  <InputCustom isCheck={true} label="Pallet Jack" className=" me-3 border-slate-400" />
                </Form.Group>
                <Form.Group>
                  <InputCustom isCheck={true} label="Truck Dock High" className=" me-3 border-slate-400" />
                </Form.Group>
                <Form.Group>
                  <InputCustom isCheck={true} label="Tanker Endorsement" className=" me-3 border-slate-400" />
                </Form.Group>
              </div>
              <h2 className="text-xl font-bold">Availability Info</h2>
              <Select
                options={optionList}
                placeholder="Choose Availability"
                value={selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                isMulti
              />
            </Col>

            <Col className="flex flex-col pb-40 space-x-1 space-y-5 mt-4 p-4 bg-white border-gradient border-gradient-color"></Col>
          </Row>
        </Container>
      </div>
    </AppLayout>
  );
};

export default FindTruck;
