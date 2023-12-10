import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import { useRef, useEffect } from 'react';
import { useMap } from '../../hooks/useMap';
import { useLocation } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { Location } from '../../types/location';
import { AppRoute, PlacemarkPath } from '../../const';

type MapProps = {
  mapType: 'cities' | 'offer';
  offers: Offer[];
  offerId: Offer['id'] | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: PlacemarkPath.Default,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

const currentCustomIcon = leaflet.icon({
  iconUrl: PlacemarkPath.Active,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});

export default function Map({ mapType, offers, offerId }: MapProps): JSX.Element {

  const { pathname } = useLocation();
  const location: Location = offers[0]?.city.location;
  const isOfferPage = pathname.startsWith(AppRoute.Offer);
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map && location) {
      map.setView({
        lat: location.latitude,
        lng: location.longitude,
      });

    }
  }, [map, location]);

  useEffect(() => {
    if (map) {
      const markerLayer = leaflet.layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = leaflet.marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            offerId !== undefined && offer.id === offerId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer)
          .bindPopup(`<h2>${offer.title}</h2><p style="font-size:1.5em">€${offer.price}</p>`);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, offerId, isOfferPage, mapType]);

  return (
    <section
      className={`${mapType}__map map`}
      ref={mapRef}
      style={mapType === 'offer' ?
        {
          height: '100%',
          minHeight: '600px',
          width: '60%',
          minWidth: '1144px',
          margin: '0 auto'
        }
        : undefined}
    >
    </section>
  );
}
