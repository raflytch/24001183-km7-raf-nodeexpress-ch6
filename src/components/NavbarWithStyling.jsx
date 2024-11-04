import { useState, useEffect } from "react";
import { About } from "./About/About";
import "./NavbarWithStyling.css";
import { useNavbar } from "../hooks/UseNavbar";

function NavbarWithStyling({ menu, name, age, address }) {
  let List;

  const {
    isToggle,
    isActiveToggle,
    count,
    isCount,
    isField,
    isFieldFilled,
    isClick,
    isClicked,
  } = useNavbar();

  if (menu) {
    List = (
      <ul className="navbar-list">
        {menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  } else {
    List = <h1>tidak ditemukan</h1>;
  }
  return (
    <>
      <nav className="navbar-container">
        <h1 className="navbar-title">FSW 2 {name}</h1>
        <ul className="navbar-list">
          <li>{age}</li>
          <li>{address}</li>
        </ul>
        {List}

        <button
          onClick={() => isClicked(!isClick)}
          style={{
            backgroundColor: isClick ? "red" : "green",
            color: isClick ? "white" : "black",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "block",
            margin: "0 auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {" "}
          Click Me
        </button>

        <button
          onClick={() => isActiveToggle(!isToggle)}
          style={{
            backgroundColor: isToggle ? "red" : "green",
            color: isToggle ? "white" : "black",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Hello click me on the button
        </button>
        <button onClick={() => isCount(count + 1)}> Count: {count} </button>
        <input
          type="text"
          onChange={() => isFieldFilled(true)}
          style={{
            backgroundColor: isField ? "red" : "green",
            color: isField ? "white" : "black",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "block",
            margin: "0 auto",
            marginTop: "20px",
          }}
        />
      </nav>
      <About children={name} age={age} address={address} />
    </>
  );
}

export default NavbarWithStyling;
