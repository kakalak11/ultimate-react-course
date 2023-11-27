import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../components/User";

import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <>
      <User />
      <div className={styles.app}>
        <SideBar />
        <Map />
      </div>
    </>
  );
}

export default AppLayout;
