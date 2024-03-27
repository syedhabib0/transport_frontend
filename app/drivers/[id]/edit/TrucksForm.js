import AddVehicleModal from "@/components/Modal/AddVehicleModal";
import EditVehicleModal from "@/components/Modal/EditVehicleModal";
import SubmitButton from "@/components/submitbutton";
import axios from "axios";
import { faFileEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { baseUrl } from "@/constants/apis";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchTruckTypes } from "@/lib/truckTypes/slice";
import { fetchDriverStatus } from "@/lib/driverStatus/slice";

const TrucksForm = ({ userId, data }) => {
  const { access_token } = useAppSelector((state) => state.auth);
  const { truckTypes } = useAppSelector((state) => state.truckType);

  const dispatch = useAppDispatch();

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [drivers, setDrivers] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleEditModalOpen = (vehicle) => {
    setSelectedVehicle(vehicle);
    setEditModalOpen(true);
  };

  const handleAddSubmit = async (values) => {
    // Handle form submission here
    console.log("I am values: ", values);
    try {
      setAlertMessage(null); // Clear any previous alert
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        // if (key === 'license_issuance_country' && values[key]) {
        //     formData.append(key, values[key], values[key].name)
        // } else {
        formData.append(key, values[key]);
        // }
      });
      console.log(formData);

      const response = await axios.post(`${baseUrl}/drivers/${userId}/createTrucks`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response);
      setAlertMessage({
        variant: "success",
        message: "Data updated successfully",
      });
    } catch (error) {
      console.error(error.response.data);
      setAlertMessage({
        variant: "danger",
        message: "Error updating data",
      });
    } finally {
      // setIsSubmitting(false);
    }

    // Close the modal
    setAddModalOpen(false);
  };
  const handleEditSubmit = async (values, vehicleId) => {
    // Handle form submission here
    console.log("I am values: ", values);
    try {
      setAlertMessage(null); // Clear any previous alert
      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      console.log(formData);

      const response = await axios.post(`${baseUrl}/drivers/${userId}/updateTrucks/${vehicleId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log(response);
      // Handle success (you may redirect or show a success message)
      // Handle Success
      setAlertMessage({
        variant: "success",
        message: "Data updated successfully",
      });
    } catch (error) {
      // Check if response and response.data are available
      if (error.response && error.response.data) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
      // Handle error (show an error message)
      // Handle error
      setAlertMessage({
        variant: "danger",
        message: "Error updating data",
      });
    } finally {
      // setIsSubmitting(false);
    }

    setAddModalOpen(false);
  };

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/drivers/${userId}/getVehicles`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setDrivers(response.data.driver);
        setVehicles(response.data.vehicles);
        // setUser(response.data.driver);
        // setHiredBy(response.data.hired_by);
      } catch (error) {
        console.log("I am running 127 error");
        console.error("Error fetching Truck data:", error);
      }
    };

    fetchVehicleData();
  }, [userId, access_token]);

  useEffect(() => {
    dispatch(fetchTruckTypes());
    dispatch(fetchDriverStatus());
  }, [dispatch]);

  return (
    <Row>
      {alertMessage && (
        <Alert variant={alertMessage.variant} onClose={() => setAlertMessage(null)} dismissible>
          {alertMessage.message}
        </Alert>
      )}
      <Col className="flex flex-row justify-between">
        {vehicles && vehicles.length > 0 ? (
          vehicles.map((vehicle, key) => (
            <div key={key} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold">({vehicle?.unit_number})</h2>
                <ul className="pl-0">
                  <li>
                    Dimensions: {vehicle?.other_details && vehicle?.other_details.length} X{" "}
                    {vehicle?.other_details && vehicle?.other_details.height} X{" "}
                    {vehicle?.other_details && vehicle?.other_details.width}{" "}
                    {vehicle?.other_details && vehicle?.other_details.dimension_in}
                  </li>
                  <li>
                    {vehicle?.make} {vehicle?.model} {vehicle?.payload_weight}
                  </li>
                </ul>
                <div
                  className="rounded-pill px-5 py-1 mt-5 w-auto text-center"
                  style={{
                    backgroundColor: "lightgreen",
                  }}
                >
                  {vehicle?.other_details && vehicle.other_details.is_available
                    ? "Available"
                    : "Not Available"}
                </div>
              </div>
              <button onClick={() => handleEditModalOpen(vehicle)}>
                <FontAwesomeIcon
                  icon={faFileEdit}
                  className="bg-gradients rounded-full w-6 h-6 p-2 mx-auto white-color"
                />
              </button>
            </div>
          ))
        ) : (
          <div>No Vehicle assigned</div>
        )}
        <div>
          <SubmitButton
            className="bg-gradients white-color float-right"
            onClick={() => setAddModalOpen(true)}
          >
            Add New Vehicle
          </SubmitButton>
        </div>
      </Col>
      {/* Modal component */}
      <AddVehicleModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddSubmit}
        truckTypes={truckTypes}
      />
      {console.log("selectedVehicle: ", selectedVehicle)}
      <EditVehicleModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        vehicleId={selectedVehicle ? selectedVehicle.id : null}
        userId={userId}
        truckTypes={truckTypes}
      />
    </Row>
  );
};

export default TrucksForm;
