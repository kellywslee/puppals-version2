import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useAllDogs, useMyDog } from '../../hooks/useDogs';
import { useGeolocation } from '../../hooks/useGeolocation';
import Loader from '../../ui/Loader';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const { user } = useUser();
  const {
    myDog,
    isLoading: isLoadingMyDog,
    error: errorMyDog,
  } = useMyDog(user?.id);
  const currentUserDogId = myDog && myDog.length > 0 ? myDog[0].id : null;
  const {
    dogs,
    isLoading: isLoadingAllDogs,
    error: errorAllDogs,
  } = useAllDogs(currentUserDogId);
  const [mapPosition, setMapPosition] = useState([43.67, -79.38]);
  const [searchParams] = useSearchParams();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  // eslint-disable-next-line react/prop-types
  const ChangeCenter = ({ position }) => {
    const map = useMap();
    position && map.setView(position);
    return null;
  };

  useEffect(() => {
    // If there's a latitude and longitude in the search parameters, use that
    if (mapLat && mapLng) {
      setMapPosition([parseFloat(mapLat), parseFloat(mapLng)]);
    } else if (myDog && myDog.length > 0) {
      // If myDog is defined and has elements, set the map position
      setMapPosition([myDog[0].lat, myDog[0].lng]);
    } else if (geolocationPosition) {
      // Fallback to geolocation position if available
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [mapLat, mapLng, myDog, geolocationPosition]);

  if (isLoadingMyDog || isLoadingAllDogs) return <Loader />;
  if (errorMyDog || errorAllDogs) {
    toast.error('Error loading dogs');
    return null;
  }

  return (
    <div className="relative w-full">
      {!geolocationPosition && (
        <button
          onClick={getPosition}
          className="absolute bottom-4 left-[40%] z-50 rounded-lg border-4 border-org bg-slate-50 p-1 text-xs"
        >
          {isLoadingPosition ? 'Loading...' : 'Use my location'}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={14}
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
        {mapPosition && <ChangeCenter position={mapPosition} />}
      </MapContainer>
    </div>
  );
};

export default Map;
