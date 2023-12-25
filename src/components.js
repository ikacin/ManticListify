import React, { useState ,useEffect,useRef,useContext} from 'react';
import styled from 'styled-components'
import axios from 'axios'
import PopoverList from "./popover";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { Loader } from '@mantine/core';
import {MyContext} from "./pages/Contenxt.api";
import party from "party-js";
const Demo = () => {
    const [list,setList] = useState([]);
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate();
    const { state, dispatch } = useContext(MyContext);
    const handleClick = () => navigate('/layout');
    const listRef = useRef();
const getList = () => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/comments')
        .then(function (response) {
            console.log(response);
            setLoading(false)
            setList(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        }).finally(() => setLoading(false))
}

useEffect(() => {

    getList()

},[])








    return(
        <>
            <Container>
                {
                    loading &&
                    <div className={"loading-wrap"}>
                        <Loader />
                    </div>

                }
                <div className={"container"}>
                    {
                        <div className={"list-header-container-wrap"}>
                            <div className={"flex"}>
                                Title
                            </div>

                            <Button   onClick={handleClick} >
                                Connect to databases
                                {state.authorization.user ? state.authorization.user : localStorage.getItem("name")}
                            </Button>
                        </div>
                    }

                    {
                        list.length > 0 && list.map((item,index) => {
                            return(

                                <div ref={listRef} className={"list-main-container-wrap"}>

                                    <div className={"chip-items text-truncate"}>
                                        {item.body}
                                    </div>

                                    <div className={" chip-items text-truncate"}>
                                        <PopoverList item={item.name} email={item.email}/>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </Container>
        </>
    )
}



const Container = styled.div`
    
        .list-table{
          width: 100%;
        }
            .list-header-container-wrap {
              display: flex;
              align-items: center;
              gap: 0 10px;
              background-color: #ffffff;
              padding: 0 35px;
              height: 50px;
              width: 100%;
              font-size: 13px;
              position: relative;
              border-bottom: 1px solid rgba(0,0,0,.06);
              background: #fafafa;
             
            }
      

          .list-main-container-wrap {
            display: flex;
            align-items: center;
            gap: 0 10px;
            height: 60px;
            width: 100%;
            font-size: 14px;
            border-bottom: 1px solid rgba(0,0,0,.06);
            cursor: pointer;
            justify-content: space-between;
            
        
          }

      .list-main-container-wrap:hover{
        background: #fafafa;
        
      }
 
          .lists-item-container{
            display: flex;
          }

          .list-table-actions {
            width: 30px;
            min-width: 30px;
            position: relative;
          }
      .list-wrapper{
        background-color: #ffffff;
      }

      .flex-1 {
        flex: 1;
      }
      
      .i-flex{
        display: flex;
        align-items: center;
      }
      .coin-text{
        padding-left: 10px;
      }
      
      img{
        width: 100%;
      }
      .coin-img{
        max-width: 40px;
      }


      .lds-ring {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
      }
      .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
      }
      .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      
    `



export default Demo



