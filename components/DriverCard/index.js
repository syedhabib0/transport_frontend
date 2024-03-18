import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import Button from "../Button";
import Link from "next/link";
import Card from "../Card";
import avatar from "@/public/assets/images/drivers.png";
import { faBookmark, faMap } from "@fortawesome/free-solid-svg-icons";
import { handleError } from "@/utils/functions";
import { insertFirstMessage, messageTypes } from "@/utils/firebase/chat";
import { useAppSelector } from "@/lib/hooks";

const DriverCard = ({ data }) => {
  console.log(data);
  const { user } = useAppSelector((state) => state.auth);
  const handleChat = () => {
    try {
      const ChatUser = data?.driver?.user;
      insertFirstMessage(ChatUser, " Hey I Need You!", messageTypes.text, user);
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
            {/* <h2 className="font-bold text-lg">{10} Unit</h2> */}
            <p className="primary-color font-semibold">
              {data?.driver?.user?.first_name}, {data?.driver?.user?.last_name}
            </p>
            {/* <p className=" text-slate-400">
              {data?.email}, {data?.phone}
            </p> */}
          </div>
        </div>
        {/* <hr /> */}
        {/* <div className="p-2">
          <FontAwesomeIcon icon={faBookmark} className="primary-color" /> {data?.trips}{" "}
        </div>
        <div className="flex flex-row p-2">
          <div>
            <FontAwesomeIcon icon={faMap} className="primary-color" /> {data?.pickup}{" "}
          </div>
          <div>
            <FontAwesomeIcon icon={faMap} className="primary-color" /> {data?.dropoff}{" "}
          </div>
        </div> */}
        <div className="space-x-1 lg:space-x-10 mx-auto text-center">
          <Button className="bg-gradients border-gradient border-gradient-color text-white">
            Assign Load
          </Button>
          <Button
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
