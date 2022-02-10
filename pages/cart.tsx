import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Login from "./login";
import { AppContext } from "./_app";

export default function Cart() {
  const {isLogged, setIsLogged, cart, setCart }= useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const [gross, setGross] = useState(0);
  const [net, setNet] = useState(0);
  

  useEffect(() => {
    if (isLogged && sessionStorage.getItem('token') != 'undefined') {
      fetch("http://149.28.209.208/azzoa-spa/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
        .then((data) => data.json())
        .then((result) => {
          setCartItems(result.data.json_object.items);

          const items = result.data.json_object.items;
          const grossTotal:any = [];
          const netTotal:any = [];
          items.map((item:any) => {
            grossTotal.push(parseInt(item.gross_total));
            netTotal.push(parseInt(item.net_total));
          });
          const grossSum = grossTotal.reduce((total:any, amount:any) => total + amount);
          const netSum = netTotal.reduce((total:any, amount:any) => total + amount);
          setGross(grossSum);
          setNet(netSum);
        });
    }
  }, [cartItems, isLogged]);

  if (!isLogged || sessionStorage.getItem('token') == 'undefined') {
    return <Login />;
  }

  return (
    <div className="card">
      <div className="row">
        <div className="col-md-8 cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
              <div className="col align-self-center text-right text-muted">
                {cartItems && cartItems.length} items
              </div>
            </div>
          </div>
          {cartItems &&
            cartItems.map((item:any) => (
              <CartItem
                key={item.id}
                grossPrice={[gross, setGross]}
                netPrice={[net, setNet]}
                item={item}
                cartItems={cartItems}
                setCartItems= {setCartItems}
              />
            ))}
          <div className="back-to-shop">
            <span className="text-muted">Back to shop</span>
          </div>
        </div>
        <div className="col-md-4 summary">
          <div>
            <h5>
              <b>Summary</b>
            </h5>
          </div>
          <hr />
          <div className="row">
            <div className="col" style={{ paddingLeft: 0 }}>
              ITEMS {cartItems && cartItems.length}
            </div>
            <div className="col text-right">NET PRICE $ {net}</div>
          </div>
          <form>
            <p>SHIPPING</p>{" "}
            <select>
              <option className="text-muted">Standard-Delivery- $5.00</option>
            </select>
            <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
          </form>
          <div
            className="row"
            style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}
          >
            <div>VAT $ {gross > 0 && gross - net}</div>
            <div className="col">TOTAL PRICE</div>
            <div className="col text-right">$ {gross > 0 && gross + 5}</div>
          </div>{" "}
          <Link href="/payment">
            <button className="btn btn-primary">
              <a>CHECKOUT</a>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
