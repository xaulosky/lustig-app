import { Box, Progress, Spinner } from "@chakra-ui/react"
import DataTable from "react-data-table-component"
import PropTypes from 'prop-types'

const Tabla = ({ data, columnas, noData }) => {

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
        />


    )
}

export default Tabla

Tabla.defaultProps = {
    noData: null
}

Tabla.propTypes = {
    data: PropTypes.array.isRequired,
    columnas: PropTypes.array.isRequired,
    noData: PropTypes.node
}
