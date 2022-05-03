import axios from "axios";
import React, { useEffect, useState,useContext } from "react";


import { AppContext } from "../MainPage";

export default function Movies({ data ,cancel}) {
  const [editMoviebut, setEditMovieButt] = useState(false);
  const [obj, setObj] = useState({
    name: "",
    genres: "",
    medium: "",
    premiered: "",
  });

  const [permis, setPermis] = useState({ permissions: [] });

  const [subs, setSubs] = useState([]);
  const [allMembers, setALLMembers] = useState([]);

  const movieContext = useContext(AppContext);
 
  useEffect(async () => {
    const { data } = await axios.get(
      `http://localhost:8000/permissions/${sessionStorage.getItem("username")}`
    );
    setPermis(data);
    const { data: subsmovies } = await axios.get(`http://localhost:8001/subs`);

    setSubs(subsmovies);

    const { data: allMembersdata } = await axios.get(
      `http://localhost:8001/members`
    );
    setALLMembers(allMembersdata);
  }, []);

  const clickEdit = () => {
    setEditMovieButt(true);
  };
  const onChangeObj = (e) => {
    const { name, value } = e.target;
    const newObj = { ...obj, [name]: value };
    setObj(newObj);
  };
  const UpdateMovieData = async () => {
    const genres = obj.genres.split(",");

    const updatedMovie = {
      name: obj.name === "" ? data.name : obj.name,
      genres: obj.genres === "" ? data.genres : genres,
      image: { medium: obj.medium === "" ? data.image.medium : obj.medium },
      premiered: obj.premiered === "" ? data.premiered : obj.premiered,
    };
    await axios.put(`http://localhost:8001/movies/${data._id}`, updatedMovie);
  };
  const CancelClick = () => {
    cancel()
    setEditMovieButt(false);
  
  };
  const DeleteMovie = async () => {
    await axios.delete(`http://localhost:8001/movies/${data._id}`);
  };

  const GoToSubsPage =() => {
    movieContext.ShowSubsComp()
  }

  return (
    <div className="UsersComp">
      {!editMoviebut && (
        <div>
          <h3>
            <strong>
              {data.name} , {data.premiered.substring(0, 4)}
            </strong>{" "}
          </h3>
          Genres : {`${data.genres.join(",")}`} <br />
          <img src={data.image.medium} className="PicMovie"></img> <br />
          
            
          <h3>Subscriptions Wathched</h3>
          <ul>
          {subs.map((m) =>
              m.movies
                .map((rer) => rer)
                .map((s) =>
                  s.movie.includes(data.name)
                    ? allMembers
                        .filter((memb) => memb._id === m._id)
                        .map((R, index) => (
                          <li key={index}>
                            
                           <button onClick={GoToSubsPage} className="btn btn-light">{R.name}</button>  , {s.date}
                          </li>
                        ))
                    : null
                )
            )}
          </ul>
            
          
          {permis.permissions.includes("Update Subscription") && (
            <button onClick={clickEdit} className="btn btn-warning">Edit</button>
          )}
          {' '}
          {permis.permissions.includes("Delete Movies") && (
            <button onClick={DeleteMovie} className="btn btn-danger">Delete</button>
          )}
        </div>
      )}

      {editMoviebut && (
        <div>
          Name :{" "}
          <input
            type={"text"}
            name="name"
            defaultValue={data.name}
            onChange={onChangeObj}
          />{" "}
          <br />
          Genres :{" "}
          <input
            type={"text"}
            name="genres"
            defaultValue={data.genres.join(",")}
            onChange={onChangeObj}
          />{" "}
          <br />
          Image Url :{" "}
          <input
            type={"text"}
            name="medium"
            defaultValue={data.image.medium}
            onChange={onChangeObj}
          />{" "}
          <br />
          premiered :{" "}
          <input
            type={"text"}
            name="premiered"
            defaultValue={data.premiered}
            onChange={onChangeObj}
          />{" "}
          <br />
          <button onClick={UpdateMovieData} className="btn btn-warning">Update</button>
          {' '}
          <button onClick={CancelClick} className="btn btn-danger">Cancel</button>
        </div>
      )}
    </div>
  );
}
