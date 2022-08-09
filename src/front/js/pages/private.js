import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Private = () => {

	const [user, setUser]=useState({})
	let navigate = useNavigate();
	useEffect(() => {
		get_Token()
	}, [])
	// retrieve token form localStorage
	;
	const get_Token=()=>{
		let token = localStorage.getItem('jwt-token')
		if(!token){
			navigate("/")
		}else{
			const response= 
			fetch(process.env.BACKEND_URL +"/api/private", {
			   method: 'GET',
			   headers: { 
				 "Content-Type": "application/json",
				 'Authorization': 'Bearer '+token // ⬅⬅⬅ authorization token
			   } 
			}).then((response)=>{
				if(!response.ok) throw Error("There was a problem in the login request")
	
				else if(response.status === 403){
					throw Error("Missing or invalid token")
			
				}else{
					return response.json()
				}
			}).then((response)=>{

				return setUser(response) 
			})

		
		}
	
	
	}

	
	const logOut=()=>{
		localStorage.removeItem('jwt-token');
		navigate(-1);
		

	}


	return (
		<div className="jumbotron">
			<h1 className="display-4">This is your private page: {user.email}</h1>
			<img src={rigoImageUrl} />
			<hr className="my-4" />


				<span className="btn btn-primary btn-lg" href="#" role="button" onClick={logOut}>
					Log out
				</span>

		</div>
	);
};

