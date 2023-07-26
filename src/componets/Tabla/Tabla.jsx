import { Box, Progress, Spinner } from "@chakra-ui/react"
import DataTable from "react-data-table-component"
import { BiBlock } from "react-icons/bi"

const Tabla = ({ data, columnas, noData, cargando }) => {



    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    }

    return (
        <DataTable
            columns={columnas}
            data={data}
            progressComponent={<Progress size='xs' isIndeterminate />}
            direction="auto"

            select
            fixedHeader
            fixedHeaderScrollHeight="600px"
            highlightOnHover
            pagination
            persistTableHead
            pointerOnHover
            responsive
            subHeaderAlign="center"
            subHeaderWrap
            /* selectableRowSelected={selectableRowSelected} */
            noDataComponent={noData ? noData :
                < Box sx={{ m: '2rem' }} >
                    <Spinner />
                </Box >
            }
            paginationComponentOptions={paginationComponentOptions}
            progressPending={cargando}
        />


    )
}

export default Tabla
