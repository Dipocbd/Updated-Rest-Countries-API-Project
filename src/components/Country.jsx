import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Country = () => {

    const [country, setCountry] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [error, setError] = useState("")
    
    const{countryName} = useParams()

   
     useEffect(()=>{
      const getCountryByName = async()=>{
        try {
         const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
         
         if(!response.ok) throw new Error ('Country not found!')
 
         const data = await response.json()
         console.log(data);
         setCountry(data)
         
        } catch (error) {
         setisLoading (false);
         setError(error.message);
           
        }
     };
        getCountryByName();
        }, [countryName])

        return (
          
          <div className='country_info_wrapper'>
            <button className='btn'>
              <Link to="/">Back Home</Link>
            </button>
            <h1 className='top'>Country Data</h1>

            {
             country.map((country, index)=>(
               <article key={index}>
                <div className='country_info_container'>
              <div className='country_info_img'>
                <img src={country.flags.png} alt="Country Flag"/>
              </div>

              <div className='country_info'>
                <h1>{country.name.official}</h1>
                <div className='country_info_left'>
                <h5>Population:<span>{new Intl.NumberFormat().format(country.population)}</span></h5>
                <h5>Region:<span>{country?.region}</span></h5>
                <h5> Sub Region: <span>{country?.subregion}</span></h5>
                <h5> Capital: <span>{country?.capital}</span></h5>
                <h5> Top Level Domain: <span>{country.tld}</span></h5>
                <h5> Currencies: <span>{Object.keys(country?.currencies)}</span></h5>
                <h5> Languages: <span>{Object.keys(country?.languages).map((elem)=> <span key={elem}>{elem}, </span>)}</span></h5>
                <h5> Border: <span>{country?.borders.map((border)=>{return <span key={border}><span>{border},</span> </span>})}</span></h5>
                <h5> TimeZones: <span>{country?.timezones}</span></h5>


                
                


                </div>
              </div>
             </div>
               </article>
             
            ))
            }
          </div>
        )
}

export default Country