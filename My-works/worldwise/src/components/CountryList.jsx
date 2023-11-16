import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).indexOf(city.country) > -1) {
      return arr;
    } else {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem key={country.country} country={country} />;
      })}
    </ul>
  );
}

export default CountryList;
