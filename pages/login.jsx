import styles from "../styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_app";
import { useFormik } from "formik";
import { QueryClient, useMutation } from "react-query";

export default function Login() {
  const router = useRouter();
  const { isLogged, setIsLogged, cart, setCart } = useContext(AppContext);
  const mutation = useMutation((userInfo) =>
    fetch("http://149.28.209.208/azzoa-spa/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userInfo)
    }).then(res => res.json())
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      mutation.mutate(values, {
        onSuccess: (result) => {
          console.log(result)
          sessionStorage.setItem("token",result.data.json_object.token);
          console.log("success");
          const token = sessionStorage.getItem("token");
          setIsLogged(token);
          router.push("/");
        },
        onError:(error)=>{
          console.log(error)
        }
      });
      // fetch("http://149.28.209.208/azzoa-spa/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify(values),
      // })
      //   .then((data) => data.json())
      //   .then((result) => {
      //     sessionStorage.setItem("token", result.data.json_object.token);
      //     console.log("success");
      //     const token = sessionStorage.getItem("token");
      //     setIsLogged(token);
      //     router.push("/");
      //   });
    },
  });
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            className="form-control mb-3"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={formik.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
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
