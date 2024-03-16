"use client";
import Breadcrumb from "@/components/Breadcrumb";
import InputCustom from "@/components/InputCustom";
import AppLayout from "@/layouts/AppLayout";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { useLoadScript } from "@react-google-maps/api";

import { handleError } from "@/utils/functions";
import axios from "axios";
import apis from "@/constants/apis";
import { useAppSelector } from "@/lib/hooks";
import { trucksFeatures } from "@/constants/data";
import SubmitButton from "@/components/submitbutton";
import DrawPickupCircle from "@/components/PickupCircle";
import PlacesAutocomplete from "@/components/PlacesAutoComplete";
import DriverCard from "@/components/DriverCard";
const breadcrumbItems = [{ text: "Dashboard", link: "/dashboard" }, { text: "Find Truck" }];

const optionList = [
  { value: "available", label: "Available" },
  { value: "in-transit", label: "In Transit" },
  { value: "not-available", label: "Not Available" },
  { value: "blue", label: "Blue" },
  { value: "white", label: "White" },
];
const FindTruck = () => {
  const { access_token } = useAppSelector((state) => state.auth);
  const [truckTypes, setTruckTypes] = useState({});
  const [pickup, setPickup] = useState(null);
  const [formData, setFormData] = useState({
    radius: "300",
    lift_gate: "0",
    hazmat: "0",
    icc_bar: "0",
    tsa: "0",
    twic: "0",
    pallet_jack: "0",
    true_dock_high: "0",
    tanker_endorsement: "0",
    truck_type: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.0902, lng: 95.7129 });
  const [active, setActive] = useState(false);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const getCurrentLocation = () => {
      const geolocationAPI = navigator.geolocation;
      if (!geolocationAPI) {
        toast.error("Geolocation API is not available in your browser!", toastOptions);
      } else {
        geolocationAPI.getCurrentPosition(
          (position) => {
            const { coords } = position;
            setCurrentLocation((prev) => ({
              ...prev,
              lat: coords.latitude,
              lng: coords.longitude,
            }));
          },
          (error) => {
            toast.error("Something went wrong getting your position!", toastOptions);
          }
        );
      }
    };

    const getData = async () => {
      try {
        const { data, status } = await axios.get(apis.getTruckTypes, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (status === 200) {
          setTruckTypes(data.data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    getData();
    getCurrentLocation();
  }, [access_token]);

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  const handleChange = (e) => {
    const { value, name, type, checked } = e.target;
    console.log(value, name, type, checked);
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked ? "1" : "0" }));
    } else if (type === "text") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (type === "select-one") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...formData,
        latitude: pickup.lat,
        longitude: pickup.lng,
        driver_status: selectedOptions.map((item) => item.value),
      };

      const { data, status } = await axios.post(apis.searchdrivers, body, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (status === 200) {
        setDrivers(data.data);
        setActive((prev) => !prev);
      }
    } catch (error) {
      handleError(error);
    }
  };

  if (!isLoaded) {
    return <div>Is Loading...</div>;
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
            {!active ? (
              <Col className="col-md-7 flex flex-col pb-40 space-y-5 mt-4 p-4 bg-white border-gradient border-gradient-color">
                <h2 className="text-xl font-bold">Origin Points</h2>

                <PlacesAutocomplete setSelected={setPickup} label={"Pickup"} />
                <InputCustom
                  className="outline-slate-400"
                  controlId="pickup-location"
                  label="Distance"
                  float={true}
                  value={formData.radius}
                  icon={"In Mile(s)"}
                  onChange={handleChange}
                  name="radius"
                />
                <Form.Group className="flex flex-row space-x-5">
                  <h2 className="text-xl font-bold">Truck Features</h2>
                  <select
                    className="w-50"
                    onChange={handleChange}
                    name="truck_type"
                    value={formData.truck_type}
                  >
                    <option value="find truck" key="0" selected disabled>
                      Find Truck
                    </option>
                    {Object.keys(truckTypes).map((key) => (
                      <option key={key} value={key}>
                        {truckTypes[key]}
                      </option>
                    ))}
                  </select>
                </Form.Group>
                <div className="flex flex-row flex-wrap space-x-5 space-y-3">
                  {Object.keys(trucksFeatures).map((item) => (
                    <Form.Group key={item}>
                      <InputCustom
                        isCheck={true}
                        label={item.replaceAll("_", " ").toUpperCase()}
                        className=" me-3 border-slate-400"
                        name={item}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  ))}
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
                <div className="my-2">
                  <SubmitButton type="button" className={"bg-gradients"} onClick={handleSubmit}>
                    Find Truck
                  </SubmitButton>
                </div>
              </Col>
            ) : (
              <Col className="col-md-7 flex flex-col pb-40 space-y-5 mt-4 p-4 bg-white border-gradient border-gradient-color">
                <h2 className="text-xl font-bold">{drivers.length} Drivers Found</h2>
                <div className="max-h-[800px] min-h-[800px] overflow-auto">
                  {drivers.length > 0 ? (
                    drivers.map((item) => <DriverCard key={item.driver_id} data={item} />)
                  ) : (
                    <div className="h-full flex justify-center items-center flex-col">
                      <p>Oopss No Driver Found !!!</p>
                      <SubmitButton type="button" className={"bg-gradients w-max"} onClick={() => setActive(false)}>
                        Find Truck
                      </SubmitButton>
                    </div>
                  )}
                </div>
              </Col>
            )}

            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
              <Col className="mt-4 px-0 w-full bg-white border-gradient border-gradient-color">
                <Map
                  defaultCenter={currentLocation}
                  defaultZoom={6}
                  mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                >
                  {pickup && <Marker position={pickup} label={"Pickup"} />}
                  {pickup && formData.radius && (
                    <DrawPickupCircle pickupLocation={pickup} radiusInMiles={parseFloat(formData.radius)} />
                  )}
                </Map>
              </Col>
            </APIProvider>
          </Row>
        </Container>
      </div>
    </AppLayout>
  );
};

export default FindTruck;
