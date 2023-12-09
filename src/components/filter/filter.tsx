import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/app-process/app-process-slice';
import { ActiveCity } from '../../types/city';
import { getActiveCity } from '../../store/app-process/app-process-selectors';
import { cities } from '../../const';

export default function Filter(): JSX.Element {
  const selectedCity = useAppSelector(getActiveCity);
  const filters = [...cities];
  const dispatch = useAppDispatch();

  function handleFilterClick(filter: ActiveCity) {
    return () => dispatch(setCity({city: filter}));
  }

  return (
    <ul className="locations__list tabs__list">
      {filters.map((filter) => (
        <li
          key={filter}
          className="locations__item"
          onClick={handleFilterClick(filter)}
        >
          <Link
            to={AppRoute.Main}
            className={`${filter === selectedCity ? 'tabs__item--active ' : ''}locations__item-link tabs__item`}
          >
            <span>{filter}</span>
          </Link>
        </li>
      ))}


    </ul>
  );
}
