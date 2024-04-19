import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCities } from '../../contexts/CitiesContext';

export default function CityItem({ city }) {
  const { cityName, date, emoji, id, position } = city;
  const { lat, lng } = position;

  const { currentCity, deleteCity } = useCities();

  const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(date));

  async function handleDeleteCity(e) {
    e.preventDefault();
    await deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
}
