import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Login =  () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();



  const handleLogin =  ()=>{
     fetch(process.env.BACKEND_URL + "/api/login",{
      method: 'POST',
      body: JSON.stringify(),
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({ email: email, password: password })
    }).then((response)=>{
      if(response.status === 401) 
        {throw Error("Invalid credentials")
      }else if (response.status === 400){
        throw("Invalid email or password format")
      }else if(!response.ok){
        throw Error("There was a problem in the login request")
      }else{
      return response.json()
      }
    }).then((response)=>{
      const data = response
          // save your token in the localStorage
   //also you should set your user into the store using the setStore function
   localStorage.setItem("jwt-token", data.token);
   navigate("/private") 
   window.location.reload()
   return data
})
}


    



	return (
    <>
      <div className="text-center mt-5">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              onChange={(e)=>{setEmail(e.target.value)}}
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
              onChange={(e)=>{setPassword(e.target.value)}}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
