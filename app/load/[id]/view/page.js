"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import SubmitButton from "@/components/submitbutton";
import AppLayout from "@/layouts/AppLayout";
import { handleError } from "@/utils/functions";
import axios from "axios";
import apis from "@/constants/apis";
import { useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import DirectionRenderer from "@/components/DirectionRenderer";
import Truck from "@/components/Truck";
const breadcrumbItems = [{ text: "Dashboard", link: "/dashboard" }, { text: "Track" }];
const ViewLoad = () => {
  const { id } = useParams();
  const { access_token } = useAppSelector((state) => state.auth);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.0902, lng: -95.7129 });

  const getData = useCallback(
    async (loading = false) => {
      try {
        if (loading) {
          setIsLoading(true);
        }
        const { data, status } = await axios.get(`${apis.loads}/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (status === 200) {
          setData(data.data);
        }
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [access_token, id]
  );

  useEffect(() => {
    getData(true);
    const intervalId = setInterval(() => {
      getData();
    },  30 *1000);

    return () => clearInterval(intervalId);
  }, [getData]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (!isLoading) {
  //       setData((prev) => ({
  //         ...prev,
  //         current_location: {
  //           latitude: String(parseFloat(prev?.current_location?.latitude) + 0.001),
  //           longitude: String(parseFloat(prev?.current_location?.longitude) + 0.001),
  //         },
  //       }));
  //     }
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [isLoading]);

  return (
    <AppLayout>
      <Head>
        <title>View - Track Load - IWS</title>
      </Head>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="find-truck max-w-screen-xl mx-10 mt-3 mb-10">
          <Breadcrumb items={breadcrumbItems} />
          <Container className="">
            <Row className="content space-x-5">
              <Col className="flex flex-col bg-white px-6 lg:px-8 pb-10 space-y-5 mt-4 p-4">
                <Row className="space-y-5">
                  <Col className="flex justify-content-between">
                    <h2 className="text-xl font-bold">Journey Info</h2>
                    {/* <SubmitButton type="button" className="w-max bg-primary">
                      Edit
                    </SubmitButton> */}
                  </Col>
                  <div className="w-100 h-40 !p-0 lg:h-60 border-gradient border-gradient-color position-relative">
                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
                      <Col className=" px-0 w-full h-40 lg:h-60 bg-white border-gradient border-gradient-color">
                        <Map
                          center={currentLocation}
                          defaultZoom={4}
                          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                          onBoundsChanged={(data) => setCurrentLocation(data.detail.center)}
                        >
                          <DirectionRenderer
                            pickup={data?.pickup_location}
                            dropoff={data?.dropoff_location}
                          />
                          <AdvancedMarker
                            position={{
                              lat: parseFloat(data.current_location.latitude),
                              lng: parseFloat(data.current_location.longitude),
                            }}
                          >
                            <Truck />
                          </AdvancedMarker>
                        </Map>
                      </Col>
                    </APIProvider>
                  </div>
                  <Col className="flex border-gradient border-gradient-color px-0">
                    {/* <Table className="table-striped" headers={[]} data={data[0]} /> */}
                    <Table striped responsive>
                      <tbody>
                        <tr className="space-x-16">
                          <td>
                            <span>
                              <strong>Load ID : </strong>
                            </span>
                            <span>{data?.id}</span>
                          </td>
                        </tr>
                        <tr className="space-x-16">
                          <td>
                            <span>
                              <strong>Pickup Date/Time : </strong>
                            </span>
                            <span>{data?.pickup_date}</span>
                          </td>
                        </tr>
                        <tr className="space-x-16">
                          <td>
                            <span>
                              <strong>Journey Duration (Est.): </strong>
                            </span>
                            <span>--</span>
                          </td>
                        </tr>
                        <tr className="space-x-16">
                          <td>
                            <span>
                              <strong>Journey Distance(Est.) </strong>
                            </span>
                            <span>-- </span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Table striped responsive>
                      <tbody>
                        <tr className="space-x-16">
                          <td>
                            <span>
                              <strong>Bill ID: </strong>
                            </span>
                            <span>----</span>
                          </td>
                        </tr>
                        <tr className="space-x-16">
                          <td>
                            <span>
                              <strong>Dropoff Date/Time: </strong>
                            </span>
                            <span>--</span>
                          </td>
                        </tr>
                        <tr className="space-x-16">
                          <td>
                            <span>
                              <strong>Pickup: </strong>
                            </span>
                            <span>{data.pickup_location}</span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col className="flex flex-col justify-content-between">
                    <div className="flex justify-content-between mb-4 align-top">
                      <h2 className="text-2xl font-bold">Driver Details</h2>
                      <Image
                        className="w-10 h-10 bg-black object-cover rounded-full"
                        src={data.driver.profile.profile_photo}
                        width={10}
                        height={10}
                        alt=""
                      />
                    </div>
                    <Table striped responsive className="border">
                      <tbody className="">
                        <tr className="space-x-16 h-14 align-middle">
                          <td colSpan={2}>
                            <strong>Full Name:</strong>{" "}
                            {data.driver.user.first_name + " " + data.driver.user.last_name}, {data.driver.id}
                          </td>
                        </tr>
                        <tr className="space-x-16 h-14 align-middle">
                          <td>
                            <strong>License Number:</strong>
                            <br /> {data?.driver?.user?.license ?? "--"}
                          </td>
                          <td>
                            <strong>Email:</strong>
                            <br /> {data?.driver?.user?.email}
                          </td>
                        </tr>
                        <tr className="space-x-16 h-14 align-middle">
                          <td colSpan={2}>
                            <strong>Phone No:</strong> {data?.driver?.profile?.phone}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="space-x-5 space-y-5">
              <Col className="bg-white mt-3 p-5 space-y-3">
                <h2 className="text-2xl font-bold">Vehicle Details</h2>
                <hr />
                <div>
                  <FontAwesomeIcon className="primary-color" icon={faTruckFast} />{" "}
                  {data?.driver?.vehicles[0]?.vehicle_type}
                </div>
                <div>
                  <FontAwesomeIcon className="primary-color" icon={faBars} />{" "}
                  {data?.driver?.vehicles[0]?.payload_weight}
                </div>
                <div>
                  <FontAwesomeIcon className="primary-color" icon={faBars} /> -- X -- X -- inches
                </div>
                <div>
                  <FontAwesomeIcon className="primary-color" icon={faTruckFast} /> <strong>Make: </strong>
                  {data?.driver?.vehicles[0]?.make}
                </div>
                <div>
                  <FontAwesomeIcon className="primary-color" icon={faTruckFast} /> <strong>Model: </strong>
                  {data?.driver?.vehicles[0]?.model}
                </div>
              </Col>
              <Col className="bg-white mt-3 p-5 space-y-3">
                <h2 className="text-2xl font-bold">Activity Log</h2>
                <hr />
                <Table striped responsive>
                  <tbody>
                    <tr>
                      <th>Created:</th>
                      <td>--</td>
                    </tr>
                    <tr>
                      <th>Assigned:</th>
                      <td>--</td>
                    </tr>
                    <tr>
                      <th>Trip Started:</th>
                      <td>--</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col className="bg-white mt-3 p-5 space-y-3">
                <h2 className="text-2xl font-bold">Status</h2>
                <hr />
                <Table striped responsive>
                  <tbody>
                    <tr>
                      <th>Booking</th>
                      <td>
                        <Button className="bg-gradients text-white text-xs rounded-pill">
                          {data.status}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="space-x-5 space-y-5">
              <Col className="bg-white mt-3 p-5 space-y-3">
                <h2 className="text-2xl font-bold">Journey Log</h2>
                <hr />
                <Table striped responsive>
                  <tbody>
                    <tr>
                      <th>Booked By</th>
                      <td>--</td>
                    </tr>
                    <tr>
                      <th>Booked At</th>
                      <td>--</td>
                    </tr>
                    <tr>
                      <th>Booking Confirmed At</th>
                      <td>--</td>
                    </tr>
                    <tr>
                      <th>Start At</th>
                      <td>--</td>
                    </tr>
                    <tr>
                      <th>End Trip At</th>
                      <td>---</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col className="bg-white mt-3 p-5 space-y-3">
                <h2 className="text-2xl font-bold">Payment Details</h2>
                <hr />
                <Table striped responsive>
                  <tbody>
                    <tr>
                      <th>SYSTEM ESTIMATED</th>
                      <td />
                    </tr>
                    <tr>
                      <th style={{ color: "lightgreen" }}>Total Fare</th>
                      <td style={{ color: "lightgreen" }}>${data?.total_fare}</td>
                    </tr>
                    <tr>
                      <th>Driver Fare</th>
                      <td>${data?.driver_fare}</td>
                    </tr>
                    <tr>
                      <th>Payment Status</th>
                      <td>
                        <Button className="bg-gradients text-white text-xs rounded-pill">--</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </AppLayout>
  );
};

export default ViewLoad;
