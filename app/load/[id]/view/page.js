"use client";
import apis from "@/constants/apis";
import AppLayout from "@/layouts/AppLayout";
import { useAppSelector } from "@/lib/hooks";
import { handleError } from "@/utils/functions";
import axios from "axios";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Container, Card, CardBody, CardHeader } from "react-bootstrap";
const LoadDetail = () => {
  const { id } = useParams();
  const { access_token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data, status } = await axios.get(`${apis.loads}/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        if (status === 200) {
          console.log(data);
        }
      } catch (error) {
        handleError(error);
      }
    };
    getData();
  }, [id, access_token]);

  return (
    <>
      <Head>
        <title>Load - IWS</title>
      </Head>
      <AppLayout>
        <Container>
          <div className="grid grid-cols-3 grid-rows-12 gap-4">
            <div className="row-span-8">2</div>
            <div className="row-span-2">6</div>
            <div className="row-span-5 col-start-2 row-start-3">7</div>
            <div className="row-span-2 col-start-2 row-start-8">8</div>
            <div className="row-span-3 col-start-2 row-start-10">9</div>
            <div className="row-span-2 col-start-3 row-start-1">10</div>
            <div className="row-span-5 col-start-3 row-start-3">11</div>
            <div className="row-span-4 col-start-1 row-start-9">12</div>
          </div>
        </Container>
      </AppLayout>
    </>
  );
};

export default LoadDetail;
