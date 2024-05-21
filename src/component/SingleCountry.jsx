import axios from 'axios';
import { useState, useEffect } from 'react';
import { API } from '../utils/Api';

function SingleCountry() {
	const [countries, setCountries] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const fetchCountries = () => {
		try {
			axios.get(API).then((res) => {
				setCountries(res.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handlefilter = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);
		if (query === '') {
			fetchCountries();
		} else {
			const filtered = countries.filter((c) => {
				return c.name.common.toLowerCase().includes(query);
			});
			return setCountries(filtered);
		}
	};

	useEffect(() => {
		fetchCountries();
	}, []);

	console.log(countries);
	return (
		<>
			<div>
				<div>Showing Results for "{searchQuery || 'No Search Query'}"</div>
				<div>
					<input
						type="text"
						value={searchQuery}
						onChange={handlefilter}
						// onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="search by country"
					/>
				</div>
				<div className="country">
					{countries?.map((c, index) => (
						<div key={index} className="section">
							<p>Country {c.name.common}</p>
							<p>Capital city {c.capital}</p>
							<div>
								<img src={c.flags.png} />
							</div>
							<p>Continent: {c.continents}</p>
							<p>
								Timezone:{' '}
								{c.timezones.length === 1 ? (
									<span>{c.timezones}</span>
								) : (
									<span>
										{c.timezones?.map((t, index) => (
											<span key={index}>{t} &nbsp; &nbsp; </span>
										))}
									</span>
								)}
							</p>
						</div>
					))}
					{countries.length < 1 && <p>No country found</p>}
				</div>
			</div>
		</>
	);
}

export default SingleCountry;
