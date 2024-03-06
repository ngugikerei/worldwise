import CountryItem from './CountryItem';
import styles from './CountryList.module.css';

export default function CountryList({ cities }) {
  //console.log(cities);
  //get list of countries from cities arrray
  //map over them and filter out duplicates
  const countries = cities.reduce((array, city) => {
    if (!array.map((el) => el.country).includes(city.country))
      return [...array, { country: city.country, emoji: city.emoji }];
    else return [...array];
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
