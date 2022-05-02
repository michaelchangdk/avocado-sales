import React, { useState, useEffect } from "react";
import Header from "./Header";
import Loading from "./Loading";
import Chart from "./Chart";

const AvocadoHome = () => {
  const [loading, setLoading] = useState(true);
  const [regionsList, setRegionsList] = useState([]);
  const [region, selectRegion] = useState("");
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      const response = await fetch(
        "https://express-api-week17.herokuapp.com/regions"
      );
      const data = await response.json();
      setRegionsList(data);
      setLoading(false);
      console.log(regionsList);
    };

    fetchRegions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRegion = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(region);
    const response = await fetch(
      `https://express-api-week17.herokuapp.com/avocadosales/${region}`
    );
    const data = await response.json();
    console.log(data);
    setRegionData(data);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <form>
        <select
          name="regions"
          id="regions"
          disabled={loading}
          onChange={(e) => selectRegion(e.currentTarget.value)}
        >
          {/* Need to fix this choose region part */}
          <option defaultValue={true} disabled="disabled">
            Choose a region:
          </option>
          {regionsList.map((elem) => (
            <option value={elem} key={elem}>
              {elem}
            </option>
          ))}
        </select>
        <button onClick={(e) => loadRegion(e)}>Load</button>
      </form>
      {loading && <Loading />}
      {regionData.length > 0 && (
        <Chart region={region} regionData={regionData} />
      )}
    </>
  );
};

export default AvocadoHome;
