import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React, { useMemo, useState } from 'react'
import { getNestedValue } from './utils/fn';


/**
 * column = {id, header, key}
 * 
 * 
 */


const CustomTale = ({
    column=[],
    data=[],
    enablePagination = true,
    page = 1,
    setPage,
    totalPages=1,
    // setTotalPages,
    itemPerPage = 10
}) => {
    // const [page, setPge] = useState(1);
    // const [count, setCount] = useState(1);

    const columnKeys = useMemo(()=>{
        return column.map(item=>item.key);
    },[column]);

    // const currentPageData = useMemo(()=>{
    //     const totalPages = Math.ceil(data.length/itemPerPage);
    //     const startIndex = (page-1) * itemPerPage;
    //     const endIndex = startIndex + itemPerPage;
    //     setTotalPages(totalPages);

    //     return data.slice(startIndex, endIndex)

    // },[data]);

  return (
      <>
          <Stack direction={'column'} spacing={2}>
            <Box sx={{
                height: 'calc(100vh - 166px)',
                overflowY: 'auto'
            }}>
              <table style={{
                  border: '1px solid #ddd',
                  
              }}
                  className='custom-table'
              >
                  <thead>
                      <tr>
                          {column.map((cell) => <th>{cell.header}</th>)}
                      </tr>
                  </thead>
                      <tbody>
                          {
                              data.map((row, index) =>
                                  <tr>
                                      {column.map(col => {
                                        
                                       const value = getNestedValue(row, col.key);
                                          return <td>{col.Cell ? col.Cell(row, index) : value}</td>
                                      })}
                                  </tr>
                              )}
                      </tbody>
              </table>
            </Box>
              {enablePagination && totalPages>1&& <Box>
                  <Pagination 
                    page={page}
                    count={totalPages} 
                    variant="outlined" 
                    shape="rounded" 
                    sx={{
                        '& .MuiPagination-ul':{
                            justifyContent: 'end'
                        }
                    }}
                    onChange={(e, value)=>setPage(value)}
                    size = 'small'
                    />
              </Box>}
          </Stack>
      </>
  )
}

export default CustomTale