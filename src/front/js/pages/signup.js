import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [data, setData] = useState({})

	const handleChange = (event)=>{
		setData({...data, [event.target.name]: event.target.value})
	};

	const handleSubmit = ()=>{
			fetch("https://3001-holyfs-validacionjwt-oc0p9hbc2op.ws-eu59.gitpod.io/api/signup",{
				method: 'POST',
				body: JSON.stringify(data),
				headers:{
					"Content-Type": "application/json"
				}
			}).then((resp)=>{resp.json()})
    
		}


	return (
    <div className="text-center mt-5">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
			name="email"
			onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
		  	name="password"
			onChange={handleChange}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <Link to="/login">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          signup
        </button>
        </Link>        
      </form>
    </div>
  );
};
