import React from "react";
import ReactDOM from "react-dom";

const Otsikko = props => {
  return <h1>{props.kurssi}</h1>;
};

const Sisalto = props => {
  return <Osa nimi={props.sisalto.nimi} tehtavia={props.sisalto.tehtavia} />;
};

const Osa = props => {
  return (
    <p>
      {props.nimi} {props.tehtavia}
    </p>
  );
};

const Yhteensa = props => {
  return <p>yhteensä {props.yhteensa} tehtävää</p>;
};

const App = () => {
  const kurssi = "Half Stack -sovelluskehitys";
  const osa1 = {
    nimi: "Reactin perusteet",
    tehtavia: 10
  };
  const osa2 = {
    nimi: "Tiedonvälitys propseilla",
    tehtavia: 7
  };
  const osa3 = {
    nimi: "Komponenttien tila",
    tehtavia: 14
  };

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto sisalto={osa1} />
      <Sisalto sisalto={osa2} />
      <Sisalto sisalto={osa3} />
      <Yhteensa yhteensa={osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
