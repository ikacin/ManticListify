import React, { useState ,useEffect} from 'react';
import { Table } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const Tables = ({type,data,name,text,info,title,images}) => {
    const navigate = useNavigate();

    const getClick = (id) => {
        navigate(`/layout/${id}`);
    }


    return (
        <Table>
            <thead>
            <tr>
                <th>{name}</th>
                <th>{title}</th>
                <th>{text}</th>
                <th>{images}</th>
                <th>{info}</th>
            </tr>
            </thead>

            {type == "list"?
                <tbody> {
                    data.map(item => {
                        return (
                            <tr onClick={() => getClick(item.id)}>
                                <td>{item.brand}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td>
                                <td><img src={item.images[0]} style={{width:"100px"}}/></td>
                                <td>{item.price}</td>

                            </tr>
                        )
                    })
                }</tbody>
                :
                ""
            }

            {type == "list" ?
                <tbody> {
                    data.map(item => {
                        return (
                            <tr onClick={() => getClick(item.id)}>
                                <td>{item.brand}</td>
                                <td>{item.category}</td>
                                <td>{item.description}</td>
                                <td><img src={item.images[0]} width={40} height={40}/></td>
                                <td>{item.price}</td>

                            </tr>
                        )
                    })
                }</tbody>
                :
                ""
            }

            {type == "detail" ?
                <tbody> {
                    data ?

                        <tr>
                            <td>{data.brand}</td>
                            <td>{data.category}</td>
                            <td>{data.description}</td>
                            <td><img src={data.images[0]} width={40} height={40}/></td>
                            <td>{data.price}</td>

                        </tr>
                        :
                        ""
                }</tbody>
                :
                ""
            }

        </Table>
    );
}

export default Tables