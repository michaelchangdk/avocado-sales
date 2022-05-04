import React, { useState, useEffect } from "react";
import Header from "./Header";
import Loading from "./Loading";
import Chart from "./Chart";

import styled from "styled-components";

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
      setRegionsList(data.data);
      setLoading(false);
    };

    fetchRegions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRegion = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetch(
      `https://express-api-week17.herokuapp.com/avocadosales/${region}`
    );
    const data = await response.json();
    setRegionData(data.data);
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Form>
        <Select
          name="regions"
          id="regions"
          disabled={loading}
          onChange={(e) => selectRegion(e.currentTarget.value)}
          defaultValue="Choose a region:"
        >
          <option disabled="disabled" value="Choose a region:">
            Choose a region:
          </option>
          {regionsList.map((elem) => (
            <option value={elem} key={elem}>
              {elem}
            </option>
          ))}
        </Select>
        <Button disabled={region === ""} onClick={(e) => loadRegion(e)}>
          Load
        </Button>
      </Form>
      {loading && <Loading />}
      {regionData.length > 0 && (
        <Chart region={region} regionData={regionData} />
      )}
    </>
  );
};

export default AvocadoHome;

const Form = styled.form`
  display: flex;
  gap: 20px;
`;

const Select = styled.select`
  padding: 5px;
`;

const Button = styled.button`
  padding: 5px;
`;
