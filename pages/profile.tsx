import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Address from "../components/Address";
import { AppContext } from "./_app";
import Login from "./login";
export default function Profile() {
  const history = useRouter();
  const {isLogged, setIsLogged, cart, setCart} = useContext(AppContext);
  const [address, setAddress] = useState([]);
  const [newAddress, setNewAddress] = useState({
    type: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    street_address_1: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetch("http://149.28.209.208/azzoa-spa/api/address", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setAddress(result.data.json_object.data);
        }
      });
  }, []);

  const handleAddAddress = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch("http://149.28.209.208/azzoa-spa/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(newAddress),
    })
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          AddessAddednotify();
        } else {
          wrongAddessnotify();
        }
      });
  };

  const AddessAddednotify = () =>
    toast("Succesfully added new address", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const wrongAddessnotify = () =>
    toast("Address is Invalid", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  if (!isLogged || sessionStorage.getItem("token") == "undefined") {
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
      <div className="col-md-6 mb-4">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Add New Address</h5>
          </div>
          <div className="card-body">
            <form>
              {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="form7Example1"
                      className="form-control"
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          type: e.target.value,
                        })
                      }
                    />
                    <label className="form-label" htmlFor="form7Example1">
                      Address Type
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="form7Example2"
                      className="form-control"
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          name: e.target.value,
                        })
                      }
                    />
                    <label className="form-label" htmlFor="form7Example2">
                      Name
                    </label>
                  </div>
                </div>
              </div>

              {/* <!-- Text input --> */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form7Example3"
                  className="form-control"
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      city: e.target.value,
                    })
                  }
                />
                <label className="form-label" htmlFor="form7Example3">
                  City
                </label>
              </div>
              {/* <!-- Text input --> */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form7Example3"
                  className="form-control"
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      state: e.target.value,
                    })
                  }
                />
                <label className="form-label" htmlFor="form7Example3">
                  State
                </label>
              </div>
              {/* <!-- Text input --> */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form7Example3"
                  className="form-control"
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      country: e.target.value,
                    })
                  }
                />
                <label className="form-label" htmlFor="form7Example3">
                  Country
                </label>
              </div>

              {/* <!-- Text input --> */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form7Example4"
                  className="form-control"
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      street_address_1: e.target.value,
                    })
                  }
                />
                <label className="form-label" htmlFor="form7Example4">
                  Address
                </label>
              </div>

              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="form7Example1"
                      className="form-control"
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          latitude: e.target.value,
                        })
                      }
                    />
                    <label className="form-label" htmlFor="form7Example1">
                      Latitude
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <input
                      type="text"
                      id="form7Example2"
                      className="form-control"
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          longitude: e.target.value,
                        })
                      }
                    />
                    <label className="form-label" htmlFor="form7Example2">
                      Longitude
                    </label>
                  </div>
                </div>
              </div>

              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form7Example5"
                  className="form-control"
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      email: e.target.value,
                    })
                  }
                />
                <label className="form-label" htmlFor="form7Example5">
                  Email
                </label>
              </div>

              {/* <!-- Number input --> */}
              <div className="form-outline mb-4">
                <input
                  type="number"
                  id="form7Example6"
                  className="form-control"
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      phone: e.target.value,
                    })
                  }
                />
                <label className="form-label" htmlFor="form7Example6">
                  Phone
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Addresses</h5>
          </div>
          <div className="card-body">
            {address.map((item:any) => (
              <Address key={item.id} address={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="col">
        <div className="form-outline">
          <button
            className="btn mx-5 px-5 btn-primary"
            onClick={handleAddAddress}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
