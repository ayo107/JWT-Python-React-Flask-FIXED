import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Notlogin = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>No estás logueado, Intruso!!!</h1>
			<p>
				<img src="https://d3t4nwcgmfrp9x.cloudfront.net/upload/estilos-liderazgo-personajes-star-wars-643x342.jpg" />
			</p>
			
		</div>
	);
};