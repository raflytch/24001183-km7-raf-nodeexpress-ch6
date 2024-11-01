import "./NavbarWithStyling.css";
import PropTypes from "prop-types";

function NavbarWithStyling({ listMenu }) {
  return (
    <div className="navbar-container">
      <h1>FSW 2</h1>
      <ul>
        {listMenu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

NavbarWithStyling.propTypes = {
  listMenu: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NavbarWithStyling;
