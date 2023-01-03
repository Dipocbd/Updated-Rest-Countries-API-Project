import React,{useState, useEffect} from 'react'
import Filter from './Filter'
import Search from './Search/Search'
import { Link } from 'react-router-dom'

const url = "https://restcountries.com/v3.1/all"

const Countries = () => {
    const [countries, setCountries] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [error, setError] = useState("")

     const fetchCountriesData = async()=>{
        try {
             const response = await fetch(url)

              if(!response.ok) throw new Error('Something went wrong!')
             
              const countries = await response.json()
            //    console.log(countries);
              setCountries(countries)

              setisLoading(false)

        } catch (error) {
          setisLoading (false);
          setError(error.message);
            

        }
     };

    

     const getCountryByName = async(countryName)=>{
        try {
         const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
         
         if(!response.ok) throw new Error ('Country not found!')
 
         const data = await response.json()
         console.log(data);
         setCountries(data)
         
        } catch (error) {
         setisLoading (false);
         setError(error.message);
           
        }
     };

     const getCountryByRegion = async(regionName)=>{
        try {
         const response = await fetch(`https://restcountries.com/v3.1/region/${regionName}`)
         
         if(!response.ok) throw new Error ('Failed..!')
 
         const data = await response.json()
         setCountries(data)
         
        } catch (error) {
         setisLoading (false);
         setError(error.message);
           
        }
     };



     useEffect(()=>{
     fetchCountriesData();
     }, [])

    

    
   


  return (
    <div className='countries_wrapper'>
       <div className='countries_top'>
        <Search onSearch={getCountryByName}/>
       
       <div className='filter'>
         <Filter onSelect={getCountryByRegion}/>
       </div>
       </div>

       <div className='countries_bottom'>
          {isLoading && !error && <h4>Loading... A minute please</h4>}
          {error && !isLoading && <h4>{error}</h4>}

          {
            countries.map(country=>(
                // <Link to={`/country/${country.name.official}`}>
                <div className='countries_card'>
                    <div className='countries_img'>
                      <img src={country.flags.png} alt="flag"/>
                    </div>
                    <div className='countries_data'>
                      <h3>{country.name.official}</h3>
                      <h4>Population: {new Intl.NumberFormat().format(country.population)}</h4>
                      <h4>Region: {country.region}</h4>
                      <h4>Capital: {country.capital}</h4> 
                      <div>
                        <Link to= {`/country/${country.name.official}`}>
                          <button className='btn'>Learn More</button>
                        </Link>
                      </div>
                      {/* <div className='buttons'><button className='btn'>Learn More</button></div> */}

                        </div>
                 </div>
              //  </Link>
            
            ))
          }
       </div>
    </div>
  )
}

export default Countries