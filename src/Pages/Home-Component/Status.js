import React, {useState,useEffect} from "react";
import {SearchBar} from './Search';
import * as style from '../../Styling/Styling';

  function Headline(props){
    const [Count, setCount] = useState(0);
    let beef = props.num+":";

    return(
      <div style={{
      display: "flex",
      fontSize: "15px",
      float: "left",
      height: "100px",
      width: "100%", 
      border: "1px solid black"}}>
    <div style={{padding: "0", margin: "0", fontSize:"15px", width: "100%"}}><strong style={{fontSize: "20px", float: "left"}}>{beef}</strong><br></br>
    <div style={{textAlign: "centre"}}>{props.title}<p><strong>{}</strong></p>
      </div>
    </div>
    <button onClick={() => setCount(Count+1)}>LIKE</button>
    <button onClick={() => setCount(Count-1)}>DISLIKE</button>
    <p>{Count}</p>
    </div>
    )
  }
    
    function getHeadlines(search) {
      let url = `https://newsapi.org/v2/top-headlines?country=au&apiKey=4d4305d9e0564cd6a358af2b757517f4&q=${search}`;
  
      return fetch(url)
        .then((res) => res.json())
        .then((res) => res.articles) // get just the list of articles
        .then((articles) =>
        // get just the title and url from each article
        articles.map((article) => ({
        title: article.title,
        url: article.url
        })),
        );
  }

export const Status = function(){
    let [search, setSearch] = useState("");
    let [truth, setTruth] = useState([]);
    const [loading, setLoading] = useState("");
    
      useEffect(() => {
        setLoading("Loading");
        getHeadlines(search)
          .then(headlines => {
            setTruth(headlines);
            setLoading("");
          });
      }, [search]);

    return(
      <div>
      <div style={style.DataContainer2}>
    <p><strong>{loading}</strong></p>
    <SearchBar onSubmit={setSearch} style={{margin: "10px"}}/>
    <br/>
    {truth.map((headline,index) => (
          <Headline num={index+1} key={headline.url} title={headline.title} />)
          )}
          </div>
      </div>
    );
}