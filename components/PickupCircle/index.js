"use client"
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

const DrawPickupCircle = ({ pickupLocation, radiusInMiles }) => {
  const map = useMap();
  const circleRef = useRef(null);

  useEffect(() => {
    if (!map || !pickupLocation) return;

    const drawCircle = (map, center, radiusInMiles) => {
      const milesToMeters = 1609.34; // 1 mile = 1609.34 meters
      const radiusInMeters = radiusInMiles * milesToMeters;

      const circleOptions = {
        strokeColor: "#ff0909",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#ff090966",
        fillOpacity: 0.1,
        map,
        center,
        radius: radiusInMeters,
      };
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
      const circle = new google.maps.Circle(circleOptions);
      circleRef.current = circle;
    };

    drawCircle(map, pickupLocation, radiusInMiles);

    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
      }
    };
  }, [map, pickupLocation, radiusInMiles]);

  return null;
};

export default DrawPickupCircle