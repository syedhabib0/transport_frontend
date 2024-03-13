"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import AppLayout from "@/layouts/AppLayout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "@/components/Table";
import { handleError } from "@/utils/functions";

const Dashboard = () => {
  const breadcrumbItems = [{ text: "Dashboard" }];
  const [dashboardData, setDashboardData] = useState(null);
  const [totalEarning, setTotalEarning] = useState(0);
  const [driverEarning, setDriverEarning] = useState(0);
  const [totalLoad, setTotalLoad] = useState(0);
  const [completeLoad, setCompleteLoad] = useState(0);
  const [totalDriver, setTotalDriver] = useState(0);
  const [activeDriver, setActiveDriver] = useState(0);
  const [ongoingLoads, setOngoingLoads] = useState([]);

  const loadStats = [
    {
      icon: "📦",
      title: "Total Loads",
      count: totalLoad,
      // count: 496,
      link: "/load",
    },
    {
      icon: "✅",
      title: "Complete Loads",
      count: completeLoad,
      // count: 496,
      link: "/load?completed",
    },
    {
      icon: "🚚",
      title: "Total Drivers",
      count: totalDriver,
      // count: 496,
      link: "/drivers",
    },
    {
      icon: "👥",
      title: "Active Drivers",
      count: activeDriver,
      // count: 496,
      link: "/drivers",
    },
  ];

  useEffect(() => {
    // Fetch data from your Laravel API
    const fetchData = async () => {
      // Fetch total and driver earnings
      try {
        // const dashboardResponse = await axios.get(`${baseURL}api/dashboard/stats`, {headers: `bearer ${access_token}`})
        // const loadResponse = await axios.get(`${baseURL}api/loads`,{headers: `bearer ${access_token}`})
        // console.log(dashboardResponse);
        // setDashboardData(dashboardResponse)
        // const {
        //     totalLoads,
        //     drivers,
        //     completeLoads,
        //     totalDrivers,
        //     activeDrivers,
        //     totalEarnings,
        //     driverEarnings,
        // } = await dashboardResponse.data
        // setTotalEarning(totalEarnings)
        // setDriverEarning(driverEarnings)
        // setTotalLoad(totalLoads)
        // setCompleteLoad(completeLoads)
        // setTotalDriver(drivers.length)
        // setActiveDriver(activeDrivers)
        // setOngoingLoads(loadResponse.data)
      } catch (error) {
        handleError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AppLayout>
        <Head>
          <title>Dashboard - IWS</title>
        </Head>
        <div className="dashboard max-w-screen-xl mx-auto my-3">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex flex-col">
            <div className="content">
              <div className="flex space-x-10 h-52 mt-4">
                <Card
                  title="Total Earning"
                  className="bg-gradients w-50 text-xl border-none rounded-none py-2 justify-content-center text-center text-white"
                >
                  <p className="text-white text-4xl font-bold">$ {totalEarning}</p>
                </Card>

                <Card
                  title="Driver Earning"
                  className="bg-white w-50 text-xl border-none rounded-none py-2 justify-content-center text-center text-dark"
                >
                  <p className="text-4xl font-bold">${driverEarning}</p>
                </Card>
              </div>

              <div className="flex space-x-16 mt-4 justify-content-between">
                {dashboardData &&
                  loadStats.map((stat, index) => (
                    <Card
                      key={index}
                      className="bg-white text-dark border-none rounded-none w-full h-32 py-3 px-1 justify-center"
                    >
                      <div className="flex flex-row items-center justify-between">
                        <div className="w-1/5 mx-auto rounded-full bg-gradients p-3">
                          <Image src={`/assets/images/load.png`} alt="Load Icon" width={67} height={67} />
                        </div>
                        <div className="w-3/5 mx-auto">
                          <p className=" text-xl font-bold">{stat.count}</p>
                          <p className=" text-sm font-medium text-slate-500">{stat.title}</p>
                          <Link
                            href={stat.link}
                            className="flex items-center primary-color font-normal text-xs"
                          >
                            <FaEye className="me-2" /> View More
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-primary-color">Ongoing Loads</h2>
                <Link href="/load" className="secondary-color">
                  <span>
                    Load More <FontAwesomeIcon icon={faAnglesRight} />
                  </span>
                </Link>
              </div>
              {/* <Table
                            headers={[
                                'Load ID',
                                'Pickup Date',
                                'Pickup',
                                'Dropoff',
                                'Driver Fare',
                                'Driver',
                            ]}
                            data={ongoingLoadsData.map(load =>
                                Object.values(load),
                            )}
                        /> */}
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Dashboard;
