"use client";
import Breadcrumb from "@/components/Breadcrumb";
import AppLayout from "@/layouts/AppLayout";
import Head from "next/head";
import {
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
} from "react-bootstrap";
import Button from "@/components/Button";
import SubmitButton from "@/components/submitbutton";
import Label from "@/components/Label";
import InputCustom from "@/components/InputCustom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFilter, FaTruck } from "react-icons/fa";
import { faFileEdit, faFilter } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useFormik } from "formik";
import GeneralInformationForm from "./GeneralInformationForm";
import DocumentsForm from "./DocumentsForm";
import TrucksForm from "./TrucksForm";
import apis from "@/constants/apis";
import { useAppSelector } from "@/lib/hooks";
import { handleError } from "@/utils/functions";

const EditDriver = () => {
  const {access_token} = useAppSelector(state => state.auth)
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    // ... other form fields
    // profilePicture: driver.profile ? data.driver.profile.profile_picture : '/assets/images/default-profile.png',
    // status: driver.driver ? data.driver.driver.status : 'active',
    profilePicture: null,
    status: "active",
  });
  // const driver = driverData;
  // const [user, setUser] = useState(null);
  // const [hiredBy, setHiredBy] = useState(null);
  const breadcrumbItems = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Drivers", link: "/drivers" },
    { text: "Edit Driver" },
  ];
 

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        setIsLoading(true);
        const {data,status} = await axios.get(`${apis.drivers}/${id}`,{headers:{Authorization:`Bearer ${access_token}`}});
        if (status === 200) {
          console.log(data);
          setData(data)
        }
        //   setUser(response.data.driver);
        //   setHiredBy(response.data.hired_by);
      } catch (error) {
        handleError(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriverData();
  }, [access_token, id]);

  if (isLoading) {
    return <div>isLoading ...</div>;
  }

  return (
    <AppLayout>
      <Head>
        <title>Edit Driver - IWS</title>
      </Head>
      <div className="driver max-w-screen-xl mx-10 mt-3 mb-10">
        <Breadcrumb items={breadcrumbItems} />
        <Container className="space-y-5">
          <Row className="content space-x-5 px-3 bg-white pb-10 pt-3 mt-4">
            <Col className="flex flex-col space-y-5 justify-content-between">
              <Tab.Container id="left-tabs-example" defaultActiveKey="general-info">
                <Row>
                  <Col>
                    <Nav variant="pills" className="flex-row justify-content-center mx-auto">
                      <Nav.Item>
                        <Nav.Link eventKey="general-info">General Information</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="documents">Documents</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="trucks">Trucks</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="reminder">Reminder</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>
                    <Tab.Content>
                      <Tab.Pane eventKey="general-info">
                        <div className="generalInformation">
                          <GeneralInformationForm userId={id} data={data} />
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="documents">
                        <div className="documents">
                          <DocumentsForm userId={id} data={data} />
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="trucks">
                        <div className="trucks">
                          <TrucksForm userId={id} data={data} />
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="reminder">
                        <div className="reminders">
                          <Form>
                            <div className="space-y-5">
                              <h2 className="text-xl font-bold">Driver Document Expiry Reminder</h2>
                              <hr />
                              <div className="space-y-2">
                                <div className="flex flex-row justify-content-between w-full">
                                  <p className="w-2/4">Driver First Document Expiry In</p>
                                  <InputCustom className="w-2/4" disabled value="30" icon="Days" />
                                </div>
                                <div className="flex flex-row justify-content-between w-full">
                                  <p className="w-2/4">Driver Second Document Expiry In</p>
                                  <InputCustom className="w-2/4" disabled value="01" icon="Days" />
                                </div>
                                <div className="flex flex-row justify-content-between w-full">
                                  <p className="w-2/4">Driver First Vehicle Document Expiry In</p>
                                  <InputCustom className="w-2/4" disabled value="30" icon="Days" />
                                </div>
                                <div className="flex flex-row justify-content-between w-full">
                                  <p className="w-2/4">Driver First Vehicle Document Expiry In</p>
                                  <InputCustom className="w-2/4" disabled value="01" icon="Days" />
                                </div>
                              </div>
                              <br />
                              <h2 className="text-xl font-bold">Trip Reminder</h2>
                              <hr />
                              <div className="space-y-2">
                                <div className="flex flex-row justify-content-between w-full">
                                  <p className="w-2/4">Driver</p>
                                  <InputCustom
                                    className="w-2/4"
                                    disabled
                                    value="30"
                                    icon="minute before pickup time"
                                  />
                                </div>
                                <div className="flex flex-row justify-content-between w-full">
                                  <p className="w-2/4">Admin (Trip Not Started by Driver)</p>
                                  <InputCustom
                                    className="w-2/4"
                                    disabled
                                    value="45"
                                    icon="minute before pickup time"
                                  />
                                </div>
                              </div>
                            </div>
                          </Form>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </div>
    </AppLayout>
  );
};

export default EditDriver;
