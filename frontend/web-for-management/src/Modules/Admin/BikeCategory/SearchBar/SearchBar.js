import { FaSearch } from 'react-icons/fa'
import "./SearchBar.css"

export default function SearchBike (){
    
    return(
        <div className="Bar" >
            <div className="baobigger">
                <FaSearch id="Search" />
                <input className="input" 
                //   value={textData} 
                //   onChange={handleChange}
                placeholder="Search here..."></input>
            </div>
        </div>
    )
}