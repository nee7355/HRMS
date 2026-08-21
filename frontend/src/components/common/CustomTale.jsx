import Box from '@mui/material/Box';
import React, { useMemo } from 'react'


/**
 * column = {id, header, key}
 * 
 * 
 */
const CustomTale = ({
    column=[],
    data=[],
}) => {

    const columnKeys = useMemo(()=>{
        return column.map(item=>item.key);
    },[column]);

  return (
    <>
    <Box>
        <table style={{
            border: '1px solid #ddd',
            }}
            className='custom-table'
            >
            <thead>
                <tr>
                    {column.map((cell)=><td>{cell.header}</td>)}
                </tr>
            </thead>
            <tbody>
                {
                data.map((row)=>
                <tr>
                    {column.map(col=><td>{col.Cell ? col.Cell(row) : row[col.key]}</td>)}
                </tr>
            )}
            </tbody>
        </table>
    </Box>
    </>
  )
}

export default CustomTale