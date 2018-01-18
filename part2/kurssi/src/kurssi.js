import React from "react";

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

export default Kurssi;
