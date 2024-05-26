import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner></Spinner>;

  if (!cities.length) {
    return (
      <Message
        message={"Add your first city by clicking on a city on the map."}
      ></Message>
    );
  }

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.city).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id}></CountryItem>
      ))}
    </ul>
  );
}

export default CountryList;
