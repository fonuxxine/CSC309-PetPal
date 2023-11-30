import { useState, useEffect } from "react";
import "./style.css";
import PetList from "../../components/PetList";

const petURL = "pet-listings/";

function Landing() {
  const [pets, setPets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [breed, setBreed] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [age, setAge] = useState("");
  const [ages, setAges] = useState([]);
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState([]);


  const statusValues = {
    "AV": "available",
    "AD": "adopted",
    "PN": "pending",
    "WD": "withdrawn",
}

  function getAllUnique(lst) {
    let unique = [];
    for (let i in lst) {
      if (!unique.includes(lst[i])) {
        unique.push(lst[i]);
      }
    }
    return unique;
  }
  useEffect(() => {
    fetch(petURL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setTypes(json.results.map((d) => d.type));
        setBreeds(json.results.map((d) => d.breed));
        setAges(json.results.map((d) => d.age));
        setStatuses(json.results.map((d) => d.status));
        setPets(json.results);
        // console.log(json.results);
        // console.log(pets);
      });
  }, []);

  function applyFilter(){
    let params = {};
    if(age !== ""){
        params['age'] = age
    };
    if(type !== ""){
        params['type'] = type
    }
    if(breed !== ""){
        params['breed'] = breed
    }
    if(status !== ""){
        params['status'] = status
    }
    fetch(petURL+ '?' + new URLSearchParams(params), {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
            //console.log(json.results)
            setPets(json.results);
        });
  }
  return (
    <div>
      <div className="container-fluid search-container d-flex justify-content-center p-5">
        <input
          className="search-bar"
          type="text"
          placeholder="Search a pet..."
        />
        <button className="search-but" type="submit">
          Search
        </button>
      </div>
      <div className="row container-fluid">
        <div className="col-sm-2 p-5 pb-0 pt-4">
          <h1 className="filter-h1">Filter</h1>
          <label className="filter-labels">Type</label>
          <select
            className="filter-select form-select"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="">Select type</option>
            {getAllUnique(types).map((type, i) => (
              <option value={type} key={i}>{type}</option>
            ))}
          </select>

          <label className="filter-labels">Breed</label>
          <select
            className="form-select"
            value={breed}
            onChange={(event) => setBreed(event.target.value)}
          >
            <option value="">Select breed</option>
            {getAllUnique(breeds).map((breed, i) => (
              <option value={breed} key={i}>{breed}</option>
            ))}
          </select>

          <label className="filter-labels">Age</label>
          <select
            className="form-select"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          >
            <option value="">Select age</option>
            {getAllUnique(ages).map((age, i) => (
              <option value={age} key={i}>{age}</option>
            ))}
          </select>

          <label className="filter-labels">Status</label>
          <select
            className="form-select"
            value={statusValues[status]}
            onChange={(event) => setAge(event.target.value)}
          >
            <option value="">Select status</option>
            {getAllUnique(statuses).map((status, i) => (
              <option value={status} key={i}>{statusValues[status]}</option>
            ))}
          </select>
          <button className="search-but mt-2" type="submit" onClick={() => applyFilter()}>
            Filter
          </button>
        </div>
        <PetList pets={pets}/>
      </div>
    </div>
  );
}

export default Landing;
