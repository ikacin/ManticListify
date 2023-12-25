import React, { useState ,useEffect} from 'react';
import { Pagination } from '@mantine/core';

const Paginations = (data) => {

     const NewItem =  () => {
            return(
                <Pagination total={data} siblings={1} initialPage={10} />
            )
    }


    return (
        <>
              <NewItem/>
        </>
    );
}
export default Paginations