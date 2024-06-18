import Image from "next/image";
import styles from "./page.module.css";
import "./page.module.css";
import LoginPage from "@/app/adminauth/login/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="mangers-container">
        <div className="">
          <p>Admin Site</p>
          <LoginPage />
        </div>
      </div>
    </main>
  );
}
