import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AppContext } from "./_app";
import styles from "../styles/register.module.css";
import { useFormik } from "formik";
import { object } from "yup";

export default function Register() {
  const router = useRouter();
  const { isLogged, setIsLogged, cart, setCart } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      phone: "",
      password_confirmation: "",
    },
    onSubmit: (values) => {
      fetch("http://149.28.209.208/azzoa-spa/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((data) => data.json())
        .then((result) => {
          console.log(result)
          sessionStorage.setItem("token", result.data.json_object.token);
          if (result.status == 200 || 201) {
            const token = sessionStorage.getItem("token");
            setIsLogged(token);
          }
          router.push("/");
        });
    },
  });
  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUserName">User name</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            className="form-control"
            id="exampleInputUserName"
            aria-describedby="usernameHelp"
            placeholder="Enter user name"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPhone">Phone number</label>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            className="form-control"
            id="exampleInputPhone"
            aria-describedby="phoneHelp"
            placeholder="Enter Phone number"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={formik.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            className="form-control"
            id="exampleInputConfirmPassword1"
            placeholder="Confirm password"
            onChange={formik.handleChange}
          />
        </div>

        <button className="btn btn-primary mt-3" type="submit">
          Register
        </button>
        <div className="login">
          <Link href="/login">
            <a className={styles.link}>Login</a>
          </Link>
        </div>
      </form>
    </div>
  );
}
