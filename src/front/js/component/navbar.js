import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"

export const Navbar = () => {
	let tok = localStorage.getItem("jwt-token")
	let tokLogout = localStorage.getItem("jwt-token")
	const logout = () => {
		Swal
        .fire({
			icon: 'question',
            title: "LogOut",
            input: "Desea Cerrar sesión?",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        })
        .then((resultado) => {
            console.log(resultado)
            if (resultado.dismiss!='cancel') {
                localStorage.removeItem('jwt-token');
                localStorage.removeItem('user_id');
                window.location.href='/';
    
                
            }else {
                // Dijeron que no
                return "Te mantienes logueado";
            }
            
        });
    
                
          };
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRsnUXkrv5QBuWx6TYrKxNqIXa5JPdUhwLfAzN432_Dg3HyrnFEc-Y79Kl7wonvg5pP4E&usqp=CAU"
						width="60"
						height="40"
					/>
				</span>
			</Link>
			<div className="ml-auto">
				{tok==null?
				<Link to="/login">
					<button className="btn btn-primary">Login</button>
				</Link>
				:<Link to="/private">
					<button className="btn btn-primary">UserZone</button>
		  		</Link>}
				{tokLogout==null?
				<Link to="/signup">
					<button className="btn btn-primary">Sign Up!</button>
				</Link>
				:
				
					<button className="btn btn-primary" onClick={logout}>LogOut</button>
				}
			</div>
		</nav>
	);
};