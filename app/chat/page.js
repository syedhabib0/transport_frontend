"use client";
import Breadcrumb from "@/components/Breadcrumb";
import AppLayout from "@/layouts/AppLayout";
import Head from "next/head";
import { Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { BiMessageAltDetail } from "react-icons/bi"; // Import the search icon
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import InputCustom from "@/components/InputCustom";
import { FaPaperPlane } from "react-icons/fa";
import { handleError } from "@/utils/functions";
import { getUsers, insertMessage, listenForNewMessages, messageTypes } from "@/utils/firebase/chat";
import { useAppSelector } from "@/lib/hooks";
import moment from "moment";
import { baseimage } from "@/constants/apis";
import axios from "axios";

const Chat = () => {
  const divRef = useRef();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState({
    chatlist: true,
    messages: false,
  });
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [searched, setSearched] = useState([]);
  const [search, setSearch] = useState("");

  const breadcrumbItems = [{ text: "Dashboard", link: "/dashboard" }, { text: "Chat" }];

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading((prev) => ({ ...prev, chatlist: true }));
        const users = await getUsers(user?.id);
        setUsers(users);
        setSearched(users);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading((prev) => ({ ...prev, chatlist: false }));
      }
    };
    getData();
  }, [user?.id]);

  const handleChatClick = async (item) => {
    try {
      setActive(item);
      const domNode = divRef?.current;
      if (domNode) {
        domNode.scrollTop = domNode.scrollHeight;
      }
    } catch (error) {
      handleError(error);
    }
  };

  const renderMessages = () => {
    return messages.map((message, index) => {
      return (
        <div key={index}>
          <div className="message flex flex-row">
            <Image
              src={
                message.fromId === user.id
                  ? user.profile
                    ? user.profile
                    : "/assets/images/default-profile.png"
                  : active.image === baseimage
                    ? "/assets/images/default-profile.png"
                    : active.image
              }
              width={30}
              height={30}
              alt={message.fromId === user.id ? `${user.first_name} ${user.last_name}` : active.name}
              className="avatar w-10 h-10"
            />
            <div className="user-info flex flex-col justify-content-between align-items-start ml-2 space-y-1">
              <p className="user-name">
                <strong>
                  {message.fromId === user.id ? `${user.first_name} ${user.last_name}` : active.name}
                </strong>{" "}
              </p>
              <div className="text">{message.msg}</div>
              <div className="timestamp gray-color">{moment(message.sent).format("DD/MM/YY hh:mm:a")}</div>
            </div>
          </div>
        </div>
      );
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isMessageAdded = await insertMessage(active, message, messageTypes.text, user);
      if (isMessageAdded) {
        setMessage("");
      }
      if (false) {
        var body = {
          to: active.push_token,
          priority: "high",
          notification: {
            title: `${user.first_name} ${user.last_name} Messaged You`,
            body: message,
          },
          data: {},
        };
        const { data } = await axios.post("https://fcm.googleapis.com/fcm/send", body, {
          headers: { Authorization: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY },
        });
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (active?.id) {
      const handleNewMessage = (newMessage) => {
        const isDuplicate = messages.some((message) => message.id === newMessage.id);
        if (!isDuplicate) {
          setMessages((prev) => {
            const newArray = [...prev, newMessage];
            newArray.sort((a, b) => a?.sent - b?.sent);
            return newArray;
          });
          const domNode = divRef?.current;
          if (domNode) {
            domNode.scrollTop = domNode.scrollHeight;
          }
        }
      };
      const unsubscribe = listenForNewMessages(active, user, handleNewMessage);
      return () => {
        unsubscribe();
        setMessages([])
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active?.id]);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    setSearched(users.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())));
  };

  return (
    <AppLayout>
      <Head>
        <title>Load - IWS</title>
      </Head>
      {isLoading.chatlist ? (
        <div>Loading ... </div>
      ) : (
        <div className="load max-w-screen-xl mx-10 mt-3 mb-10">
          <Breadcrumb items={breadcrumbItems} />
          <Container fluid className="space-y-5">
            <Row className="content lg:px-3 pb-10 pt-3 mt-4">
              <Col md={4} className="flex flex-col space-y-5 max-h-screen">
                <div className="flex flex-row justify-content-between">
                  <h2 className="text-xl font-bold">Chat</h2>
                  <div>
                    <button className="w-10 h-10">
                      <Image src={"/assets/images/menu-button.png"} width={62} height={62} alt="" />
                    </button>
                  </div>
                </div>
                <Form>
                  <InputGroup className="mb-3 rounded-pill">
                    {/* <InputGroup.Text
                      className="primary-color rounded-start-pill border-r-0 bg-white fs-1"
                      id="search-icon"
                    >
                      <BiSearch />
                    </InputGroup.Text> */}
                    <FormControl
                      placeholder="Search..."
                      aria-label="Search"
                      aria-describedby="search-icon"
                      className="border-l-0 "
                      onChange={handleSearch}
                      value={search}
                    />
                  </InputGroup>
                </Form>
                <div className="bg-white space-y-3 p-3 overflow-y-scroll h-auto">
                  <div className="flex flex-row space-x-2">
                    <BiMessageAltDetail className="fs-1" /> <span> All conversations</span>
                  </div>
                  {searched.map((item, index) => (
                    <div
                      className="flex flex-row space-x-2 cursor-pointer border rounded-md"
                      key={index}
                      onClick={() => handleChatClick(item)}
                    >
                      <Image
                        src={item.image === baseimage ? "/assets/images/default-profile.png" : item.image}
                        width={30}
                        height={30}
                        className="w-12 h-12"
                        alt=""
                      />
                      <div className="flex flex-col">
                        <p className="fw-bold">{item.name}</p>
                        <p className="text-muted">{item.about}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              <Col
                md={8}
                ref={divRef}
                className="flex flex-col space-y-5 bg-white border-gradient border-gradient-color max-h-screen overflow-y-scroll h-auto p-3"
              >
                {Object.keys(active).length > 0 ? (
                  <div className="flex flex-col justify-content-between space-y-1">
                    <h2 className="text-xl font-bold username">{active.name}</h2>
                    <hr className="hr-primary" />
                    <div>{renderMessages()}</div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-[400px]"></div>
                )}
                <form onSubmit={handleSubmit} className="sticky-bottom bg-white flex">
                  <InputCustom
                    inputClass="border-gray-300 bg-gray-200 p-3 flex-1"
                    placeholder="Type your message here..."
                    iconClass={"border-gray-300 bg-gray-200 border-l-2 w-12"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={`border-pink-300 border-start-none border-l-0  rounded-l-none bg-gray-100 px-4`}
                  >
                    <FaPaperPlane className="primary-color" />
                  </button>
                </form>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </AppLayout>
  );
};

export default Chat;
