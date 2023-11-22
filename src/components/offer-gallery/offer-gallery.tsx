type OfferGalleryProps = {
  picsUrls: string[];
}

export default function OfferGallery({picsUrls}: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {picsUrls.slice(0, 6).map((picUrl) => (
          <div key={picUrl} className="offer__image-wrapper">
            <img className="offer__image" src={picUrl} alt="Photo studio" />
          </div>
        ))})
      </div>
    </div>
  );
}
