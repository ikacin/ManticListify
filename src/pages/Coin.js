import React, { useState ,useEffect} from 'react';
import axios from "axios";
import Header from "./Header";
import Table from "../atoms/Table";
import { Loader } from '@mantine/core';

const Coin = () => {
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [imageList,setImageList] = useState([]);

    const getCoin = () => {
        setLoading(true)
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then(function (response) {
                // handle success
                console.log(response.data);
                setList(response.data)
                setImageList(response.data.image)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            }).finally(() => {
            setLoading(false)
        })


    }

    useEffect(() => {
        getCoin()
    },[])


    const ths = (
        <tr>
            <th>Brand</th>
            <th>Category</th>
            <th>Description</th>
            <th>Title</th>
            <th>Price</th>
            <th>Images</th>
        </tr>
    );

    const rows = list  ?
        <tr key={list.id}>
            <td>{list.symbol}</td>
            <td>{list.name}</td>
            <td>{list.current_price}</td>
            <td>{list.last_updated}</td>
            <td>{list.price_change_percentage_24h}</td>
            <td><img src={imageList} style={{width:"100px"}}/></td>
        </tr>
        :
        ""



    return(
        <>
            {
                loading &&
                <div className={"loading-wrap"}>
                    <Loader />
                </div>
            }
            <Header/>
            <Table captionSide="bottom">
                <thead>{ths}</thead>
                <tbody>{rows}</tbody>
            </Table>

        </>


    )











}

export default Coin

