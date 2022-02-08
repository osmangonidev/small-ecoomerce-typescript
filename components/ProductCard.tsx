import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../pages/_app";
type productType = {
  [key: string | number ]: any
}
export default function ProductCard({ product }: productType) {
  const {isLogged, setIsLogged, cart, setCart} = useContext(AppContext);
  const handleAddToCart = () => {
    fetch("http://149.28.209.208/azzoa-spa/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({ product_id: product.id }),
    })
      .then((data) => data.json())
      .then((result) => {
        if (result.status === 200) {
          setCart(result.data.json_object.items.length);
        }
      });
  };
  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
      <div className="box">
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="card-img-top"
            src={product.image}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">$ {product.sale_price}</p>

            <Link href="">
              <a className="btn btn-primary me-3" onClick={handleAddToCart}>
                Add to cart
              </a>
            </Link>
            <Link href={`/product/${product.id}`}>
              <a className="btn btn-secondary">Details</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
