import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useAllDogs, useMyDog } from '../../hooks/useDogs';
import { useGeolocation } from '../../hooks/useGeolocation';
import Loader from '../../ui/Loader';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const {
    dogs,
    isLoading: isLoadingAllDogs,
    error: errorAllDogs,
  } = useAllDogs();
  const { user } = useUser();
  const {
    myDog,
    isLoading: isLoadingMyDog,
    error: errorMyDog,
  } = useMyDog(user?.id);
  const [mapPosition, setMapPosition] = useState([43.64, -79.4]);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  const updateSearchParamsWithLocation = useCallback(() => {
    if (geolocationPosition) {
      // Create a new URLSearchParams object to update the search params
      const params = new URLSearchParams();
      params.set('lat', geolocationPosition.lat);
      params.set('lng', geolocationPosition.lng);
      setSearchParams(params); // Update the search params in the URL
    }
  }, [geolocationPosition, setSearchParams]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      updateSearchParamsWithLocation();
    } else if (mapLat && mapLng) {
      setMapPosition([parseFloat(mapLat), parseFloat(mapLng)]);
    } else if (myDog && myDog.length > 0 && myDog[0].lat && myDog[0].lng) {
      setMapPosition([myDog[0].lat, myDog[0].lng]);
    }
  }, [
    geolocationPosition,
    mapLat,
    mapLng,
    myDog,
    setSearchParams,
    updateSearchParamsWithLocation,
  ]);

  // eslint-disable-next-line react/prop-types
  const ChangeCenter = ({ position }) => {
    const map = useMap();
    position && map.setView(position);
    return null;
  };

  if (isLoadingAllDogs || (user && isLoadingMyDog)) return <Loader />;
  if (errorAllDogs || (user && errorMyDog) || !dogs) {
    toast.error('Error loading dogs');
    return null;
  }

  return (
    <div className="relative w-full">
      {!geolocationPosition && (
        <button
          onClick={() => {
            getPosition();
            updateSearchParamsWithLocation();
          }}
          className="absolute bottom-3 left-3 z-50 rounded-lg border-2 border-slate-950 bg-org p-1 text-xs font-bold"
        >
          {isLoadingPosition ? 'Loading...' : 'Use my location 🔍'}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={12}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {dogs.map((dog) => (
          <Marker position={[dog.lat, dog.lng]} key={dog.id}>
            <Popup>
              <img src={dog.image} alt={`${dog.name} the ${dog.breed} dog`} />
              <span>{dog.name}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
};

export default Map;
