import { Box, Progress, Spinner } from "@chakra-ui/react"
import DataTable from "react-data-table-component"
import PropTypes from 'prop-types'

const Tabla = ({ data, columnas, noData, cargando, click, estilos }) => {

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  }

  return (
    <>
      <DataTable
        columns={columnas}
        data={data}
        loadingComponent={< Box sx={{ m: '2rem' }} >
          <Spinner />
        </Box >}
        progressComponent={<Progress size='xs' isIndeterminate />}
        direction="auto"
        onRowClicked={click}
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
            {data.length === 0 ? 'No hay datos' : ""}
          </Box >
        }
        paginationComponentOptions={paginationComponentOptions}
        progressPending={cargando}
        customStyles={estilos ? estilos : {
          headCells: {
            style: {
              backgroundColor: '#161616',
              color: 'white',
              fontSize: '.8rem',
            },
          },
          cells: {
            style: {
              color: 'tranparent',
              cursor: 'auto'
            },
          },
        }}
      />

    </>

  )
}

export default Tabla

Tabla.propTypes = {
  data: PropTypes.array.isRequired,
  columnas: PropTypes.array.isRequired,
  noData: PropTypes.element,
  cargando: PropTypes.bool,
  click: PropTypes.func,
  estilos: PropTypes.object
}