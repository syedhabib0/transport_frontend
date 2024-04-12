"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import Card from "@/components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faMap } from "@fortawesome/free-solid-svg-icons";
import avatar from "@/public/assets/images/drivers.png";
import Button from "@/components/Button";
import Link from "next/link";
import AppLayout from "@/layouts/AppLayout";
import { useAppSelector } from "@/lib/hooks";
import { handleError } from "@/utils/functions";
import axios from "axios";
import apis from "@/constants/apis";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const breadcrumbItems = [{ text: "Dashboard", link: "/dashboard" }, { text: "Track" }];
const TrackLoad = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.0902, lng: -95.7129 });
  const { access_token } = useAppSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getData = useCallback(
    async () => {
      try {
        const { data, status } = await axios.get(apis.getOnGoingLoads, {
          params: { per_page: 10 },
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (status === 200) {
          setData(data.data);
        }
      } catch (error) {
        handleError(error);
      }
    },
    [access_token],
  )
  


  useEffect(() => {
    getData();

   
  }, [getData]);

  return (
    <AppLayout>
      <Head>
        <title>Track Load - IWS</title>
      </Head>
      <div className="find-truck max-w-screen-xl mx-auto  mb-10">
        <Breadcrumb items={breadcrumbItems} />
        <Container className="">
          <Row className="content space-x-5">
            <Col sm={12} lg={6} className="max-h-[500px] min-h-[500px] overflow-y-scroll flex flex-col !bg-slate-100 px-12 pb-40 space-y-5 mt-4 p-4  border-gradient border-gradient-color">
              <h2 className="text-xl font-bold">Ongoing Trip</h2>
              {data.map((item, key) => [
                <Card className="flex flex-column w-100  p-4" key={key}>
                  <div className="">
                    <div className="flex flex-col lg:flex-row">
                      <div className="m-2 h-16 w-16">
                        <Image
                          src={item.driver.profile.profile_photo}
                          width={50}
                          height={50}
                          alt="User Avatar"
                          roundedCircle
                          className="size-full rounded-full object-cover"
                          style={{
                            maxWidth: "50px",
                            maxHeight: "50px",
                          }}
                        />
                      </div>

                      <div className="p-2">
                        <h2 className="font-bold text-lg">Bill ID: {item?.bill_id}</h2>
                        <p className="primary-color font-semibold">
                          {item?.driver?.user?.first_name + " " + item?.driver?.user?.last_name}, {item?.driver?.id}
                        </p>
                        <p className=" text-slate-400">
                          {item?.driver?.user?.email}, {item?.driver?.profile?.phone}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="p-2">
                      <FontAwesomeIcon icon={faBookmark} className="primary-color" /> {item?.pickup_date}{" "}
                    </div>
                    <div className="flex flex-col lg:flex-row p-2 ">
                      <div className="flex-1">
                        <FontAwesomeIcon icon={faMap} className="primary-color" /> {item?.pickup_location}{" "}
                      </div>
                      <div className="flex-1">
                        <FontAwesomeIcon icon={faMap} className="primary-color" /> {item?.dropoff_location}{" "}
                      </div>
                    </div>
                    <div className="space-x-1 lg:space-x-10 mx-auto text-center">
                      <Button className="bg-gradients border-gradient border-gradient-color text-white">
                        <Link href={`/load/${item.id}/view`}>Track Load</Link>
                      </Button>
                      <Button className="bg-light hover:bg-gray-100 text-black border-gradient border-gradient-color">
                        <Link href={`/load/${item.id}/view`}>View Load</Link>
                      </Button>
                    </div>
                  </div>
                </Card>,
              ])}
            </Col>

            <Col className=" !mx-0 !px-0 max-h-[500px] min-h-[500px] w-full bg-white border-gradient border-gradient-color">
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
                <Map
                  center={currentLocation}
                  defaultZoom={4}
                  mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                  onBoundsChanged={(data) => setCurrentLocation(data.detail.center)}
                />
              </APIProvider>
            </Col>
          </Row>
        </Container>
      </div>
    </AppLayout>
  );
};

export default TrackLoad;
