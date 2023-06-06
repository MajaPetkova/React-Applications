import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";

export const Navbar = () => {
  return (
    <footer className="navbar">
      <nav className="navbarBox">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <ExploreIcon fill="#2c2c2c" width="36px" height="36px" />
            <p>Explore</p>
          </li>
          <li className="navbarListItem">
            <OfferIcon fill="#2c2c2c" width="36px" height="36px" />
            <p>Offer</p>
          </li>
          <li className="navbarListItem">
            <PersonOutlineIcon fill="#2c2c2c" width="36px" height="36px" />
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
