import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Private = () => {
	const [usuarios, setUsuarios] = useState([]);
	let id = window.location.href.split(":")[2]

	const [user, setUser]=useState({})
	let navigate = useNavigate();
	const peticionGet = async () => {
        await axios.get(`https://3001-holyfs-validacionjwt-oc0p9hbc2op.ws-eu59.gitpod.io/api/user/1`)
            .then(response => {
				console.log(response.data)
                setUsuarios((response.data));
            }).catch(error => {
                console.log(error);
            })
    }
	useEffect(() => {
		get_Token()
		peticionGet()
	}, [])
	// retrieve token form localStorage
	;
	const get_Token=()=>{
		let token = localStorage.getItem('jwt-token')
		if(!token){
			navigate("/notlogin")
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


	return (
        
		<div className="text-center mt-5">
            
			<h1>Wellcome {usuarios.email} </h1>
			<p>
				<img src="https://super-ficcion.com/wp-content/uploads/2020/08/20200827_183335-scaled.jpg" />
			</p>
			<div className="alert alert-info" />
			<h1>Wellcome to Dark Side of the Internet</h1>
		</div>
	);
};
