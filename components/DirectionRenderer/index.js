import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

const DirectionRenderer = ({ pickup, dropoff }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionService, setDirectionService] = useState();
  const [directionRenderer, setDirectionRenderer] = useState();
  useEffect(() => {
    if (!map || !routesLibrary) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [map, routesLibrary]);

  useEffect(() => {
    if (!directionRenderer || !directionService) return;
    directionService
      .route({
        origin: pickup,
        destination: dropoff,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionRenderer.setDirections(response);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, [directionRenderer, directionService, pickup, dropoff]);

  return <></>;
};

export default DirectionRenderer;
