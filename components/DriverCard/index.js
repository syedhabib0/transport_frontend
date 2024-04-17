import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Card from "../Card";
import avatar from "@/public/assets/images/drivers.png";
import { handleError, kmToMiles } from "@/utils/functions";
import { insertFirstMessage, messageTypes } from "@/utils/firebase/chat";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const DriverCard = ({ data, assignLoad, pickup }) => {
  console.log(data);
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const routesLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] = useState();
  const [miles, setMiles] = useState("");

  useEffect(() => {
    if (!routesLibrary) return;
    setDirectionService(new routesLibrary.DirectionsService());
  }, [routesLibrary]);

  useEffect(() => {
    if (!directionService) return;

    const body = {
      origin: new google.maps.LatLng(pickup.lat, pickup.lng),
      destination: new google.maps.LatLng(data.latitude, data.longitude),
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionService
      .route(body)
      .then((response) => {
        if (response?.routes?.length > 0 && response?.routes[0].legs.length > 0) {
          const distance = kmToMiles(response?.routes[0].legs[0].distance.text);
          setMiles(distance);
        }
      })
      .catch((error) => {
        console.error("Error fetching route:", error);
      });
  }, [data?.latitude, data?.longitude, directionService, pickup]);

  const handleChat = () => {
    try {
      const ChatUser = data?.driver?.user;
      const isMessageInserted = insertFirstMessage(ChatUser, " Hey I Need You!", messageTypes.text, user);
      if (isMessageInserted) {
        router.push("/chat");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Card className="flex flex-column w-100  p-4">
      <div className="">
        <div className="flex flex-row">
          <div className="bg-primary rounded-full p-2 m-2 h-16 w-16">
            <Image
              src={avatar}
              width={50}
              height={50}
              alt="User Avatar"
              roundedCircle
              className="me-2"
              style={{
                maxWidth: "50px",
                maxHeight: "50px",
              }}
            />
          </div>

          <div className="p-2">
            {data?.driver?.vehicles && data?.driver?.vehicles?.length > 0 && (
              <h2 className="font-bold text-lg">{data.driver?.vehicles[0].unit_number} Unit</h2>
            )}

            <p className="primary-color font-semibold m-0">
              {data?.driver?.user?.first_name}, {data?.driver?.user?.last_name}
            </p>
            <p className=" text-slate-400 m-0"> Distance: {miles}</p>
            <p className=" text-slate-400 m-0">
              {data?.driver?.user?.email}, {data?.driver?.user?.phone}
            </p>
          </div>
        </div>
        <hr />
        {data?.driver?.vehicles && data?.driver?.vehicles?.length > 0 && (
          <>
            <span className="badge text-bg-primary mr-1">Vehicle: {data.driver?.vehicles[0].vehicle_type}</span>
            <span className="badge text-bg-secondary mr-1">
              Payload Weight: {data.driver?.vehicles[0].payload_weight} Lbs
            </span>
            <span className="badge text-bg-success mr-1">Make: {data.driver?.vehicles[0].make}</span>
            <span className="badge text-bg-info mr-1">Model:{data.driver?.vehicles[0].model}</span>
          </>
        )}
        <div className="space-x-1 lg:space-x-10 mx-auto text-center mt-2">
          <Button
            onClick={() => assignLoad(data)}
            type="button"
            className="bg-gradients border-gradient border-gradient-color text-white"
          >
            Assign Load
          </Button>
          <Button
            type="button"
            onClick={handleChat}
            className="bg-light hover:bg-gray-100 text-black border-gradient border-gradient-color"
          >
            Chat
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DriverCard;
