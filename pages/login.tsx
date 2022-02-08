import styles from "../styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_app";

export default function Login() {
  const router = useRouter();
  const {isLogged, setIsLogged, cart, setCart} = useContext(AppContext);

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const handleLogin = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://149.28.209.208/azzoa-spa/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((data) => data.json())
      .then((result) => {
        sessionStorage.setItem("token", result.data.json_object.token);
        if (result.status == 200 || 201) {
          console.log("success");
          const token:any = sessionStorage.getItem("token")
          setIsLogged(token);
        }
        router.push("/");
      });
  };
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              setLoginInfo({
                ...loginInfo,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control mb-3"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) =>
              setLoginInfo({
                ...loginInfo,
                password: e.target.value,
              })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <div className={styles.forgot}>
          <Link href="/forgot">Forgot password</Link>
        </div>
        <div className="register">
          <Link href="/register">
            <a className={styles.link}>Register</a>
          </Link>
        </div>
      </form>
    </div>
  );
}
