"use client";
import Breadcrumb from "@/components/Breadcrumb";
import InputCustom from "@/components/InputCustom";
import AppLayout from "@/layouts/AppLayout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from "@reach/combobox";
const breadcrumbItems = [{ text: "Dashboard", link: "/dashboard" }, { text: "Find Truck" }];

const optionList = [
  { value: "available", label: "Available" },
  { value: "in-transit", label: "In Transit" },
  { value: "not-available", label: "Not Available" },
  { value: "blue", label: "Blue" },
  { value: "white", label: "White" },
];
const FindTruck = () => {
  const [pickup, setPickup] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState();
  const [currentLocation, setCurrentLocation] = useState({ lat: 76, lng: 79 });
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
    getCurrentLocation();
  }, []);

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

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
            <Col className="col-md-7 flex flex-col pb-40 space-y-5 mt-4 p-4 bg-white border-gradient border-gradient-color">
              <h2 className="text-xl font-bold">Origin Points</h2>

              <PlacesAutocomplete setSelected={setPickup} label={"Pickup"} />
              <PlacesAutocomplete setSelected={setDestination} label={"Destination"} />
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
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}>
              <Col className="mt-4 px-0 w-full bg-white border-gradient border-gradient-color">
                <Map defaultCenter={currentLocation} defaultZoom={10}>
                  {pickup && <Marker position={pickup} label={"Pickup"} />}
                  {destination && <Marker position={destination} label={"Destination"} />}
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

const PlacesAutocomplete = ({ setSelected, label }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <label className="rounded-md p-0 flex flex-row border-none focus:border-none focus:ring  focus:ring-opacity-50">
        {label}
      </label>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};


const Directions = () => {
  const map = useMap()
  const routesLibrary = useMapsLibrary("routes")
  const [directionService, setDirectionService] = useState()
  const [directionRenderer, setDirectionRenderer] = useState()
  useEffect(() => {
    if (!map || !routesLibrary) return
    setDirectionService(new routesLibrary.DirectionsService())
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({map}))
  },[map, routesLibrary]) 

  useEffect(() => {
    if (!directionRenderer || !directionService) return 
    
    directionService.route({
      origin:"Pakka qila Hyderabad",
      destination:"Fazal masjid latifabad unit 9",
      travelMode:google.maps.TravelMode.DRIVING,
      provideRoutesAlternatives:true,
    }).then(response => {
      directionRenderer.setDirections(response)
    })


  },[directionRenderer,directionService])



  return(
    <></>
  )
}