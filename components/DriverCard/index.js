import React, { useEffect, useState } from "react";
import Image from "next/image";
import avatar from "@/public/assets/images/drivers.png";
import { BsChat } from "react-icons/bs";
import { GiWeightScale } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaRoad } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { handleError, kmToMiles } from "@/utils/functions";
import { insertFirstMessage, messageTypes } from "@/utils/firebase/chat";

const DriverCardNew = ({ data, assignLoad, pickup }) => {
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
        router.push(`/chat?driver=${ChatUser?.id}`);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="bg-white rounded-md flex flex-col border border-gray-400">
      <div className="flex gap-2 px-3 pt-3 pb-2 ">
        <div className="h-[50px] w-[50px] flex-none bg-gradients rounded-full">
          <Image
            src={avatar}
            width={50}
            height={50}
            alt="User Avatar"
            roundedCircle
            className="me-2 object-contain"
            style={{
              maxWidth: "50px",
              maxHeight: "50px",
            }}
          />
        </div>
        <div className="">
          {data?.driver?.vehicles && data?.driver?.vehicles?.length > 0 && (
            <p className="text-black font-semibold m-0">{data.driver?.vehicles[0].unit_number} Unit</p>
          )}
          <p className="primary-color font-semibold m-0">
            {data?.driver?.user?.first_name}, {data?.driver?.user?.last_name}
          </p>
          <div className="space-x-2">
            <span className="badge text-bg-success">{data?.driver?.status}</span>
            <span
              onClick={handleChat}
              className="badge text-bg-info cursor-pointer !inline-flex items-center"
            >
              <BsChat />
              Chat
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex px-3 pb-3 pt-1 gap-1 justify-between">
        <div>
          <div className="space-x-3 flex flex-wrap ">
            {data?.driver?.vehicles && data?.driver?.vehicles?.length > 0 && (
              <span className="flex items-center gap-1 text-slate-500 text-xs">
                <GiWeightScale icon="fa-solid fa-scale-unbalanced-flip" /> {data.driver?.vehicles[0].payload_weight} lbs
              </span>
            )}
            {data?.driver?.vehicles && data?.driver?.vehicles?.length > 0 && (
              <span className="flex items-center gap-1 text-slate-500 text-xs">
              <CiDeliveryTruck icon="fa-solid fa-scale-unbalanced-flip" /> {data.driver?.vehicles[0].other_details?.height} * {data.driver?.vehicles[0].other_details?.length} * {data.driver?.vehicles[0].other_details?.width} {data.driver?.vehicles[0].other_details?.dimension_in}
            </span>
            )}

            
          </div>
          <div className="space-x-3 flex flex-wrap ">
            <span className="flex items-center gap-1 text-slate-500 text-xs">
              <FaRoad icon="fa-solid fa-scale-unbalanced-flip" /> {miles || "-"}
            </span>
            <span className="flex items-center gap-1 text-slate-500 text-xs">
              <MdOutlineLocalPhone icon="fa-solid fa-scale-unbalanced-flip" /> {data?.driver?.user?.profile?.phone || "-"}
            </span>
          </div>
        </div>
        <div className="">
          <button
            type="button"
            onClick={() => assignLoad(data)}
            className="btn bg-gradients text-white font-semibold !text-sm "
          >
            Assign Load
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverCardNew;
