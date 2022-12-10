import classes from "./MainNavigation.module.css";
import Link from "next/link";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>NextJS DEMO</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All items</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Item</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
