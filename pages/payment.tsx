import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { AppContext } from "./_app";
import Login from "./login";

export default function Pyment() {
  const history = useRouter();
  const {isLogged, setIsLogged, cart, setCart }= useContext(AppContext);
  const [paymentMethods, setPaymentMethods] = useState<Array<string | number> | string>([]);
  const [shippingMethods, setShippingMethods] = useState<Array<string | number> | string>([]);
  const [shippingAddress, setShippingAddress] = useState<Array<string | number> | string>([]);
  const [billingAddress, setBillongAddress] = useState<Array<string | number> | string>([]);
  const [pymentDetail, setPymentDetail] = useState({
    payment_method: "",
    shipping_method: "",
    shipping_address: "",
    billing_address: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [gross, setGross] = useState(0);
  const [net, setNet] = useState(0)

  useEffect(() => {
    if (isLogged) {
      getPaymentMethods();
      getShippingMethods();
      getAddress();
    }
  }, []);

  useEffect(() => {
    if (isLogged) {
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
          const grossTotal:Array<number> = [];
          const netTotal:Array<number>  = [];
          items.map((item:any) => {
            grossTotal.push(parseInt(item.gross_total));
            netTotal.push(parseInt(item.net_total));
          });
          const grossSum = grossTotal.reduce((total, amount) => total + amount);
          const netSum = netTotal.reduce((total, amount) => total + amount);
          setGross(grossSum);
          setNet(netSum);
        });
    }
  }, []);

  async function getPaymentMethods() {
    const data = await fetch(
      "http://149.28.209.208/azzoa-spa/api/payment-methods",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );

    const result = await data.json();
    const methods:Array<never | any >  = [];
    result.data.json_array.map((method:any) =>
      methods.push({ id: method.id, name: method.name })
    );
    setPaymentMethods([...methods]);
  }

  async function getShippingMethods() {
    const data = await fetch(
      "http://149.28.209.208/azzoa-spa/api/shipping-methods",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );

    const result = await data.json();
    const methods:any = [];
    result.data.json_array.map((method:any) =>
      methods.push({ id: method.id, name: method.name })
    );
    setShippingMethods([...methods]);
  }

  async function getAddress() {
    const data = await fetch("http://149.28.209.208/azzoa-spa/api/address", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    const result = await data.json();
    const billing:any = [];
    const shipping:any = [];
    result.data.json_object.data.map((address:any) => {
      if (address.type == "billing") {
        billing.push(address);
      }
      if (address.type == "shipping") {
        shipping.push(address);
      }
    });

    setShippingAddress([...shipping]);
    setBillongAddress([...billing]);
  }

  const handlePuchase = () => {
    fetch("http://149.28.209.208/azzoa-spa/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(pymentDetail),
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        if (result.status == 201) {
          setTimeout(() => history.push("/"), 3000);
          paymentSuccessNotify();
        } else {
          paymentInvalidNotify();
        }
      });
  };

  const paymentSuccessNotify = () =>
    toast("Payment success, Thank You", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const paymentInvalidNotify = () =>
    toast("Payment did not success, something wrong", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    if (!isLogged || sessionStorage.getItem('token') == 'undefined') {
      return <Login />;
    } 

  return (
    <div className="row">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="col-md-12 mb-4">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Payment details</h5>
          </div>
          <div className="card-body">
            <form>
              {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <select
                      id="form7Example1"
                      name="form7Example1"
                      onChange={(e) =>
                        setPymentDetail({
                          ...pymentDetail,
                          payment_method: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        {" "}
                        --- select a payment method ---{" "}
                      </option>
                      {paymentMethods &&
                        paymentMethods.map((method) => {
                          return (
                            <option key={method.id} value={method.id}>{method.name}</option>
                          );
                        })}
                    </select>
                    <label className="form-label" htmlFor="form7Example1">
                      Pyment method
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <select
                      id="form7Example2"
                      name="form7Example2"
                      onChange={(e) =>
                        setPymentDetail({
                          ...pymentDetail,
                          shipping_method: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        {" "}
                        --- select a shipping method ---{" "}
                      </option>
                      {shippingMethods &&
                        shippingMethods.map((method) => {
                          return (
                            <option key={method.id} value={method.id}>{method.name}</option>
                          );
                        })}
                    </select>
                    <label className="form-label" htmlFor="form7Example2">
                      Shipping method
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <select
                      id="form7Example1"
                      name="form7Example1"
                      onChange={(e) =>
                        setPymentDetail({
                          ...pymentDetail,
                          shipping_address: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        {" "}
                        --- select a shipping shipping address ---
                      </option>
                      {shippingAddress &&
                        shippingAddress.map((address) => {
                          return (
                            <option key={address.id} value={address.id}>
                              {address.street_address_1}
                            </option>
                          );
                        })}
                    </select>
                    <label className="form-label" htmlFor="form7Example1">
                      Shipping address id
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <select
                      id="form7Example2"
                      name="form7Example2"
                      onChange={(e) =>
                        setPymentDetail({
                          ...pymentDetail,
                          billing_address: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        {" "}
                        --- select a shipping billing address ---{" "}
                      </option>
                      {billingAddress &&
                        billingAddress.map((address) => {
                          return (
                            <option key={address.id} value={address.id}>
                              {address.street_address_1}
                            </option>
                          );
                        })}
                    </select>
                    <label className="form-label" htmlFor="form7Example2">
                      Billing address id
                    </label>
                  </div>
                </div>
                <div>
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span id="totalPrice">
                    <strong>$ {gross > 0 && gross + 5}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handlePuchase}
                >
                  Make purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
