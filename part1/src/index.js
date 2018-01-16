import React from "react";
import ReactDOM from "react-dom";

const Otsikko = props => {
  return <h1>{props.kurssi}</h1>;
};

const Sisalto = props => {
  return props.osat.map((osa, i) => (
    <Osa nimi={osa.nimi} tehtavia={osa.tehtavia} />
  ));
};

const Osa = props => {
  return (
    <p>
      {props.nimi} {props.tehtavia}
    </p>
  );
};

const Yhteensa = props => {
  return (
    <p>
      yhteensä{" "}
      {props.osat.reduce((acc, cur) => {
        return acc + cur.tehtavia;
      }, 0)}{" "}
      tehtävää
    </p>
  );
};

const App = () => {
  const kurssi = {
    nimi: "Half Stack -sovelluskehitys",
    osat: [
      {
        nimi: "Reactin perusteet",
        tehtavia: 10
      },
      {
        nimi: "Tiedonvälitys propseilla",
        tehtavia: 7
      },
      {
        nimi: "Komponenttien tila",
        tehtavia: 14
      }
    ]
  };

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
