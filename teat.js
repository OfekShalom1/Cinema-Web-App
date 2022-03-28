const axios = require("axios")
const getAll = async() => {
    const response = await fetch("https://api.tvmaze.com/shows")
    console.log(response);
}