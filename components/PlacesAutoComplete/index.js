"use client";

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover } from "@reach/combobox";

const PlacesAutocomplete = ({ setSelected, label, setCurrentLocation }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    clearSuggestions();
    setValue(address, false);
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    if (typeof setCurrentLocation === "function") {
      setCurrentLocation({ lat, lng });
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      {label && (
        <label className="rounded-md p-0 flex flex-row border-none focus:border-none focus:ring  focus:ring-opacity-50">
          {label}
        </label>
      )}
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50"
      />
      <ComboboxPopover className="bg-white rounded-md p-1 z-10">
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} className="cursor-pointer z-[5000]" />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete;
