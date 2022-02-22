import styles from "../styles/Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../pages/_app";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
export default function Nav() {
  useEffect(() => {
    const token: any = sessionStorage.getItem("token");
    setIsLogged(token);
  });
  const name: string = "Osman";
  const { isLogged, setIsLogged, cart, setCart } = useContext(AppContext);
  const router = useRouter();

  const getCartData = useQuery("cartData", () =>
    fetch("http://149.28.209.208/azzoa-spa/api/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => setCart(result.data.json_object.items.length))
  );

  useEffect(() => {
    const token: any = sessionStorage.getItem("token");
    setIsLogged(token);
    // fetch("http://149.28.209.208/azzoa-spa/api/cart", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization: "Bearer " + sessionStorage.getItem("token"),
    //   },
    // })
    //   .then((data) => data.json())
    //   .then((result) => {
    //     if (result.status === 200) {
    //       setCart(result.data.json_object.items.length);
    //     }
    //   });
   if(token){
      getCartData.refetch()
    if (getCartData.error == false) {
      setCart(getCartData.data.json_object.items.length);
    } else {
      console.log(getCartData.error);
    }
   }
  }, [isLogged, setCart, setIsLogged, getCartData.data]);

  const handleLogout: () => void = () => {
    setIsLogged("");
    setCart(0);
    sessionStorage.removeItem("token");
    router.push("/");
  };
  return (
    <div className={styles.topnav}>
      <Link href="/">
        <a className={styles.link}>Home</a>
      </Link>
      <Link href="/about">
        <a className={styles.link}>About</a>
      </Link>
      <Link href="/profile">
        <a>
          {isLogged && isLogged != "undefined" ? (
            <FontAwesomeIcon icon={faUser} />
          ) : (
            ""
          )}
          {isLogged && isLogged != "undefined" ? "  " + name : ""}
        </a>
      </Link>

      <span className={styles.link}>
        {isLogged && isLogged != "undefined" ? (
          <span className="log-out" onClick={handleLogout}>
            <a className={styles.link}>Logout</a>
          </span>
        ) : (
          <span>
            {" "}
            <Link id="login" href="/login">
              <a className={styles.link}>Register/Login</a>
            </Link>{" "}
          </span>
        )}
      </span>
      <Link href="/cart">
        <a className={styles.link}>
          <FontAwesomeIcon icon={faShoppingCart} /> {cart}
        </a>
      </Link>
    </div>
  );
}
