import React, { useState, useEffect, useSelector, useRef } from "react";
import { useDispatch } from "react-redux";
import { listStores, createStore } from "../actions/storeActions";

import axios from "axios";
import { Link } from "react-router-dom";
import { storeCreateReducer, storeListReducer } from "../redux/slices/store";

const StoreScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const fileEl = useRef(null);

  const storeListState = useSelector((state) => state.storeList.storeListState);
  const { loading, error } = useSelector((state) => state.storeList);

  const { success } = useSelector((state) => state.storeCreate);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(listStores());
    }
  }, [dispatch, success, userInfo, history]);

  // file uploader handler
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    // setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      // setUploading(false)
    } catch (error) {
      console.error(error);
      // setUploading(false)
    }
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !image) {
      setMessage("Please fill all the fields");
    } else {
      dispatch(
        createStore({
          name,
          logo: image,
        })
      );

      setName("");
      fileEl.current.value = "";
    }
  };

  return (
    <div className="main-content">
      <div className="col-left">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2 style={{ color: "red" }}>{error}</h2>
        ) : (
          <div>
            <h1>Stores</h1>

            <div className="stores">
              {storeListState.map((store) => (
                <Link
                  to={`/store/${store.id}`}
                  key={store.id}
                  className="store-card"
                >
                  <img src={store.logo} alt={store.name} />
                  <h2>{store.name}</h2>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="col-right">
        <form className="form-inline" onSubmit={submitHandler}>
          {message && <h4 style={{ color: "red" }}>{message}</h4>}
          <h2>Create a new store</h2>
          <div className="input-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Store name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="file">Logo</label>
            <input
              type="file"
              name="logo"
              id="file"
              ref={fileEl}
              onChange={uploadFileHandler}
            />
          </div>
          <button className="btn primary" type="submit">
            Create New Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreScreen;
