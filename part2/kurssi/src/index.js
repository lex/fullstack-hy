import React from "react";
import ReactDOM from "react-dom";

const Kurssi = props => {
  return (
    <div>
      <Otsikko teksti={props.kurssi.nimi} />
      <Sisalto osat={props.kurssi.osat} />
      <Yhteensa osat={props.kurssi.osat} />
    </div>
  );
};

const Otsikko = props => {
  return <h1>{props.teksti}</h1>;
};

const Sisalto = props => {
  return props.osat.map((osa, i) => (
    <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />
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
  const kurssit = [
    {
      nimi: "Half Stack -sovelluskehitys",
      id: 1,
      osat: [
        {
          nimi: "Reactin perusteet",
          tehtavia: 10,
          id: 1
        },
        {
          nimi: "Tiedonvälitys propseilla",
          tehtavia: 7,
          id: 2
        },
        {
          nimi: "Komponenttien tila",
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: "Node.js",
      id: 2,
      osat: [
        {
          nimi: "Routing",
          tehtavia: 3,
          id: 1
        },
        {
          nimi: "Middlewaret",
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ];

  const courses = kurssit.map(kurssi => (
    <Kurssi key={kurssi.id} kurssi={kurssi} />
  ));

  return <div>{courses}</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
