import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AppContext } from "./_app";
import styles from "../styles/register.module.css";

export default function Register() {
  const router = useRouter();
  const {isLogged, setIsLogged, cart, setCart} = useContext(AppContext);
  const [registerationInfo, setRegisterationInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    password_confirmation: "",
  });

  const handleRegister = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://149.28.209.208/azzoa-spa/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(registerationInfo),
    })
      .then((data) => data.json())
      .then((result) => {
        sessionStorage.setItem("token", result.data.json_object.token);
        if (result.status == 200 || 201) {
          const token:any = sessionStorage.getItem("token")
          setIsLogged(token);
        }
        console.log(result.data.json_object);
        router.push("/");
      });
  };
  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm}>
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            onChange={(e) =>
              setRegisterationInfo({
                ...registerationInfo,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputUserName">User name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUserName"
            aria-describedby="usernameHelp"
            placeholder="Enter user name"
            onChange={(e) =>
              setRegisterationInfo({
                ...registerationInfo,
                username: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) =>
              setRegisterationInfo({
                ...registerationInfo,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPhone">Phone number</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPhone"
            aria-describedby="phoneHelp"
            placeholder="Enter Phone number"
            onChange={(e) =>
              setRegisterationInfo({
                ...registerationInfo,
                phone: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) =>
              setRegisterationInfo({
                ...registerationInfo,
                password: e.target.value,
              })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputConfirmPassword1"
            placeholder="Confirm password"
            onChange={(e) =>
              setRegisterationInfo({
                ...registerationInfo,
                password_confirmation: e.target.value,
              })
            }
          />
        </div>

        <button className="btn btn-primary mt-3" onClick={handleRegister}>
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
