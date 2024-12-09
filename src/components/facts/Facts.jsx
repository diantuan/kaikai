import axios from "axios";
import { useEffect, useState } from "react";

const Facts = () => {
  const [fact, setFact] = useState(null)

  useEffect(()=>{

    const getFact = async()=>{
      try{
        const response = await axios.get("https://api.api-ninjas.com/v1/facts", {headers:{"X-Api-Key" : "Y/Y/msoiB794NMea6hVWDg==RvRZd70tPC9HwmaA"}})

        console.log(response)
        setFact(response.data)
      }
      catch(error){
        console.log(error)
      }
    }
    getFact()

    setInterval(()=>{
      getFact()
    }, 10000

    )

  },[])
  return ( <div>
    <h2>facts</h2>
    {fact && fact.map(fac=>(
      <div key = {fac.fact}>{fac.fact}</div>
    ))}
  </div> );
}
 
export default Facts;