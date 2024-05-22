import { NavLink } from 'react-router-dom';
export const NavLinks = () => {
	return (
		<ul className='navlinks'>
			<NavLink to="/">All</NavLink>
			<NavLink to="/africa">Africa</NavLink>
			<NavLink to="/asia">Asia</NavLink>
			<NavLink to="/europe">Europe</NavLink>
			<NavLink to="/america">America</NavLink>
			<NavLink to="/oceania">Oceania</NavLink>
		</ul>
	);
};
