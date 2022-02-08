import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../../styles/singleProduct.module.css";
import { AppContext } from "../_app";

export default function Product({ product }:any) {
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
        console.log(result)
        if(result.status === 200){
          setCart(result.data.json_object.items.length)
        }
      });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.productImg}>
        <Image
          className="image"
          src={product.image}
          height="420"
          width="327"
          alt=""
        />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.productText}>
          <h1 className={styles.headingOne}>{product.title}</h1>
          <p className={styles.pragrap}>{product.content}</p>
        </div>
        <h4 className={styles.headingOne}>Price : $ {product.sale_price}</h4>
        <div className={styles.productPriceBtn}>
          <button
            className="btn btn-dark px-4 py-2 me-3"
            type="button"
            onClick={handleAddToCart}
          >
            <a className={styles.link}>Add to cart</a>
          </button>

          <button className="btn btn-dark px-4 py-2 " type="button">
            <Link href="/cart">
              <a className={styles.link}>Buy Now</a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
export async function getStaticPaths() {
  const res = await fetch("http://149.28.209.208/azzoa-spa/api/products");
  const result = await res.json();
  const products = result.data.json_object.products.data;

  const paths = products.map((product:any) => ({
    params: { id: `${product.id}` },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }:any) {
  const res = await fetch(
    `http://149.28.209.208/azzoa-spa/api/product/${params.id}`
  );
  const result = await res.json();
  const product = result.data.json_object;
  return { props: { product } };
}
