import { useState, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import GoogleMaps from "simple-react-google-maps";
import credenciales from "../../../credenciales";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { useEffect } from "react";

export default function Places() {
  const [selected, setSelected] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: credenciales.mapsKey,
    libraries: ["places"],
  });
  const [ libraries ] = useState(['places']);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  if (!isLoaded) return <div>Loading...</div>;
  return <Maps selected={selected} setSelected={setSelected} />;
}

function Maps(props) {
  const center = useMemo(() => ({ lat: -39.8231998, lng: -73.2615179 }), []);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="px-4 py-5 flex-auto">
        <div className="px-4 md:px-10 py-4 md:py-4 bg-gray-100">
          <div className="flex justify-center py-3">
            <div className="places-container">
              <PlacesAutocomplete setSelected={props.setSelected} />
            </div>
            {props.selected && (
              <GoogleMaps
                apiKey={credenciales.mapsKey}
                style={{ height: "500px", width: "891px" }}
                // mapContainerClassName="map-container"
                zoom={13}
                center={props.selected}
                markers={props.selected}
                // {selected && markers={selected} }
              />
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Busca tu dirección"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

// export default Maps
