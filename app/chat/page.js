"use client";
import Breadcrumb from "@/components/Breadcrumb";
import AppLayout from "@/layouts/AppLayout";
import Head from "next/head";
import user1 from "@/public/assets/images/default-profile.png";
import styles from "./style.module.css"; // Import your CSS file for styling
import { Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { BiMessageAltDetail, BiSearch } from "react-icons/bi"; // Import the search icon
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InputCustom from "@/components/InputCustom";
import { FaPaperPlane } from "react-icons/fa";
import { handleError } from "@/utils/functions";
import { getUsers } from "@/utils/firebase/chat";
import { useAppSelector } from "@/lib/hooks";

const Chat = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState({
    chatlist: true,
    messages: false,
  });
  const [users, setUsers] = useState([]);

  const breadcrumbItems = [{ text: "Dashboard", link: "/dashboard" }, { text: "Chat" }];

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading((prev) => ({ ...prev, chatlist: true }));
        const users = await getUsers(user?.id);
        setUsers(users);
        console.log(users);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading((prev) => ({ ...prev, chatlist: false }));
      }
    };
    getData();
  }, [user?.id]);

  const handleChatClick = (id) => {
    try {
      console.log(id);
    } catch (error) {
      handleError(error);
    }
  };

  const handleView = (id) => {
    // Add logic to view the item with the given id
    console.log(`View item with id ${id}`);
  };

  const handleDelete = (id) => {
    // Add logic to delete the item with the given id
    console.log(`Delete item with id ${id}`);
  };

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Drivers",
      selector: (row) => row.totalDrivers,
    },
    {
      name: "SMS Send",
      selector: (row) => row.sentSMS,
    },
    {
      name: "Updated At",
      selector: (row) => row.updatedAt,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-content-between flex-wrap">
          <button className="btn btn-success btn-sm my-1 lg:my-0 lg:mx-1">Edit</button>
          <button className="btn btn-danger btn-sm">Delete</button>
        </div>
      ),
    },
  ];

  const myData = [
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 1,
      name: "Beetlejuice",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
    {
      id: 2,
      name: "Ghostbusters",
      totalDrivers: "1988",
      sentSMS: "1988",
      updatedAt: "1988",
      createdAt: "1988",
    },
  ];

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);


  const messages = [
    {
      id: 1,
      text: "Hi there!",
      timestamp: new Date("2024-01-10T09:30:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 2,
      text: "How are you?",
      timestamp: new Date("2024-01-10T10:15:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 1,
      text: "Hi there!",
      timestamp: new Date("2024-01-10T09:30:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 2,
      text: "How are you?",
      timestamp: new Date("2024-01-10T10:15:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 1,
      text: "Hi there!",
      timestamp: new Date("2024-01-10T09:30:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 2,
      text: "How are you?",
      timestamp: new Date("2024-01-10T10:15:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 1,
      text: "Hi there!",
      timestamp: new Date("2024-01-10T09:30:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 2,
      text: "How are you?",
      timestamp: new Date("2024-01-10T10:15:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-11T08:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-11T08:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-11T08:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-11T08:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-12T04:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-12T04:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-12T04:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-12T04:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-12T04:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-12T04:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-12T04:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    {
      id: 3,
      text: "Good morning!",
      timestamp: new Date("2024-01-12T04:00:00"),
      user: { name: "John", avatar: "user1.jpg" },
    },
    // Add more messages with different timestamps
  ];

  const renderMessages = () => {
    let currentDate = null;

    return messages.map((message,index) => {
      const messageDate = message.timestamp.toDateString();

      // Check if the date has changed
      const showDateSeparator = currentDate !== messageDate;
      currentDate = messageDate;

      return (
        <div key={index}>
          {showDateSeparator && (
            <div className="position-relative py-5">
              <hr className={styles.dateSeparator} />
              <div
                className={`${styles.dateLabel} mx-auto absolute left-10 right-10 lg:left-20 lg:right-20 lg:w-48 top-1`}
              >
                {messageDate}
              </div>
            </div>
          )}
          <div className="message flex flex-row">
            <Image
              src={"/assets/images/default-profile.png"}
              width={30}
              height={30}
              alt={message.user.name}
              className="avatar w-10 h-10"
            />
            <div className="user-info flex flex-col justify-content-between align-items-start ml-2 space-y-1">
              <p className="user-name">
                <strong>{message.user.name}</strong>{" "}
                <span className="gray-color">{message.timestamp.toLocaleTimeString()}</span>{" "}
              </p>
              <div className="text">{message.text}</div>
              <div className="timestamp gray-color">{message.timestamp.toLocaleString()}</div>
            </div>
          </div>
          <hr className={styles.dateSeparator} />
        </div>
      );
    });
  };

 

  useEffect(() => {
    const result = myData.filter((item) => {
      return item.name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);

  const subHeaderComponent = (
    <>
      <div className="flex flex-row justify-content-between space-x-5 w-100">
        <div>
          <span>Show</span> &nbsp;
          <select>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
          &nbsp;
          <span>entries</span>
        </div>
        <div>
          <span>Search:</span>
          <input type="text" placeholder="Type to search..." />
        </div>
      </div>
    </>
  );

  return (
    <AppLayout>
      <Head>
        <title>Load - IWS</title>
      </Head>
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
              {/* <Form>
                                <Form.Group className="mb-3 rounded-pill">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="search-icon">
                                        <BiSearch />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        placeholder="Search..."
                                        aria-label="Search"
                                        aria-describedby="search-icon"
                                        className="rounded-pill"
                                    />
                                </Form.Group>
                            </Form> */}
              <Form>
                <InputGroup className="mb-3 rounded-pill">
                  {/* <InputGroup.Prepend> */}
                  <InputGroup.Text
                    className="primary-color rounded-start-pill border-r-0 bg-white fs-1"
                    id="search-icon"
                  >
                    <BiSearch />
                  </InputGroup.Text>
                  {/* </InputGroup.Prepend> */}
                  <FormControl
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="search-icon"
                    className="border-l-0 rounded-end-pill"
                  />
                </InputGroup>
              </Form>
              <div className="bg-white space-y-3 p-3 overflow-y-scroll h-auto">
                <div className="flex flex-row space-x-2">
                  <BiMessageAltDetail className="fs-1" /> <span> All conversations</span>
                </div>
                {users.map((item,index) => (
                  <div
                    className="flex flex-row space-x-2"
                    key={index}
                    onClick={() => handleChatClick(item.id)}
                  >
                    <Image src={item.image} width={30} height={30} className="w-12 h-12" alt="" />
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
              className="flex flex-col space-y-5 bg-white border-gradient border-gradient-color max-h-screen overflow-y-scroll h-auto p-3"
            >
              <div className="flex flex-col justify-content-between space-y-1">
                <h2 className="text-xl font-bold username">Anthony Libere</h2>
                <p>
                  <strong>1:41 PM EST</strong> <span className="gray-color">Faryetteville, NC</span>
                </p>
                <hr className="hr-primary" />
                <div>{renderMessages()}</div>
              </div>
              <div className="sticky-bottom bg-white">
                <InputCustom
                  inputClass="border-gray-300 bg-gray-200 p-3"
                  placeholder="Type your message here..."
                  icon={<FaPaperPlane className="primary-color" />}
                  iconClass={"border-gray-300 bg-gray-200 border-l-2 w-12"}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </AppLayout>
  );
};

export default Chat;
