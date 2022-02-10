import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../pages/_app";
export default function CartItem({
  item,
  grossPrice,
  netPrice,
  cartItems,
  setCartItems,
}: any) {
  const { isLogged, setIsLogged, cart, setCart } = useContext(AppContext);
  const [quantity, setQuantity] = useState(item.quantity);
  const [gross, setGross] = useState(grossPrice);
  const [net, setNet] = useState(netPrice);

  const history = useRouter();
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    fetch(`http://149.28.209.208/azzoa-spa/api/cart/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((res) => {
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
            setCart(result.data.json_object.items.length);
          });
      });
  };

  async function handleQuantityPlus(e: any) {
    const response = await fetch(
      `http://149.28.209.208/azzoa-spa/api/cart/${item.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ quantity: parseInt(quantity) + 1 }),
      }
    );

    const result = await response.json();
    let items: any = [];
    if (result.status === 200) {
      items = result.data.json_object.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id == item.id) {
          setQuantity(items[i].quantity);
        }
      }

      const grossTotal: any = [];
      const netTotal: any = [];
      items.map((item: any) => {
        grossTotal.push(parseInt(item.gross_total));
        netTotal.push(parseInt(item.net_total));
      });
      const grossSum = grossTotal.reduce(
        (total: number, amount: number) => total + amount
      );
      const netSum = netTotal.reduce(
        (total: number, amount: number) => total + amount
      );
      setGross(grossSum);
      setNet(netSum);
    }
  }

  async function handleQuantityMinus(e: any) {
    e.preventDefault();
    const response = await fetch(
      `http://149.28.209.208/azzoa-spa/api/cart/${item.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ quantity: parseInt(quantity) - 1 }),
      }
    );

    const result = await response.json();
    let items: any = [];
    if (result.status === 200) {
      result.data.json_object.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id == item.id) {
          setQuantity(items[i].quantity);
        }
      }

      const grossTotal: Array<number> = [];
      const netTotal: Array<number> = [];
      items.map((item: any) => {
        grossTotal.push(parseInt(item.gross_total));
        netTotal.push(parseInt(item.net_total));
      });
      const grossSum = grossTotal.reduce((total, amount) => total + amount);
      const netSum = netTotal.reduce((total, amount) => total + amount);
      setGross(grossSum);
      setNet(netSum);
    }
  }

  return (
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col-2">
          <img alt="" className="img-fluid" src={item.product?.image} />
        </div>
        <div className="col">
          <div className="row text-muted">{item.product?.title}</div>
          <div className="row">{item.product?.slug}</div>
        </div>
        <div className="col">
          {"   "}
          <a className="update" onClick={handleQuantityMinus}>
            -
          </a>
          <a href="#" className="border" style={{ textDecoration: "none" }}>
            {quantity}
          </a>
          <a className="update " onClick={handleQuantityPlus}>
            +
          </a>
          {"  "}
        </div>
        <div className="col">$ {item.product?.sale_price * quantity}</div>
        <div className="col">
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}
