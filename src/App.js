import useSWR from 'swr';
import List from './components/List';
import './App.css';

const baseUrl = 'https://gbfs.urbansharing.com/oslobysykkel.no/';
const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  const { data: information, error: informationError } = useSWR(
    `${baseUrl}station_information.json`,
    fetcher
  );
  const { data: status, error: statusError } = useSWR(
    `${baseUrl}station_status.json`,
    fetcher
  );

  if (!status || !information) return <h1>Lasting...</h1>;
  if (informationError || statusError)
    return <h1>En feil har oppstått. Vennligst forsøk på nytt.</h1>;

  const stationInformation = information.data.stations;
  const statusStation = status.data.stations;

  const stations = stationInformation.map((information) => ({
    ...information,
    ...statusStation.find(
      (status) => information.station_id === status.station_id
    ),
  }));

  return (
    <>
      <header>
        <h1 className='header'>Oslo Bysykkel</h1>
      </header>
      <main className='main'>
        <p className='text'>
          Liste over stasjonene og hvor mange tilgjengelige låser og ledige
          sykler som er på dem i øyeblikket.
        </p>
        <List dataSource={stations} />
      </main>
    </>
  );
}

export default App;
