import React, { useState ,useEffect,useContext} from 'react';
import axios from 'axios'
import Headers from "./Header";
import Tables from "../atoms/Table";
import Paginations from "../atoms/pagination";
import { Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {MyContext} from "./Contenxt.api";


const Layout = (props) => {

    const[list,setList] = useState([]);
    const[totalCount,setTotalCount] = useState([]);
    const[totalLimit,setTotalLimit] = useState([]);
    const[loading,setLoading] = useState(true)
    const navigate = useNavigate();
    const { state, dispatch } = useContext(MyContext);
    const GetList = () => {

        axios.get('https://dummyjson.com/products')
            .then(function (response) {
                setTotalLimit(response.data.limit)
                setTotalCount(response.data.total)
                setList(response.data.products)
                setLoading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            }).finally(() => setLoading(false))
    }

    useEffect(() =>{

        GetList()
    },[])




    return (
        <>
            {
                loading &&
                <div className={"loading-wrap"}>
                    <Loader />
                </div>

            }
            <Headers/>
            {

                <Tables type={"list"}  name={"Brand"} title={"Category"} text={"Description"} info={"Price"} images={"images"} data={list} />
            }
            <Paginations data={totalCount} limit={totalLimit}/>

        </>

    )


}

export default Layout