import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Detail from "./Detail";

const RestCountries = () => {
    const [commentsData, setCommentsData] = useState([]);

    useEffect(() => {
        const url = "https://restcountries.com/v3.1/all";
        axios.get(url)
            .then(function (response) {
                setCommentsData(response.data);

                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);




    return (
        <div>
            <Detail data={commentsData} />
        </div>
    );
};

export default RestCountries;
