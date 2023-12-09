import Card from '../card/card';
import { Offer } from '../../types/offer';

type CardListProps = {
  elementType: 'cities' | 'favorite' | 'offers';
  offers: Offer[];
  onCardHover?: (offerId: Offer['id'] | null) => void;
}

function CardList({ elementType, offers, onCardHover }: CardListProps) {
  return (
    <>
      {
        offers.map((offer) => (
          <Card
            key={offer.id}
            elementType={elementType}
            offer={offer}
            onCardHover={onCardHover}
          />
        ))
      }
    </>
  );
}

export default CardList;
