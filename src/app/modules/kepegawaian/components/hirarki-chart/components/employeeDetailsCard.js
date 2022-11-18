import {useState, useEffect, Fragment} from 'react'
import {MdClose} from 'react-icons/md'
import clsx from 'clsx'
import {KTCardBody, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import axios from 'axios'
import DataTable, {createTheme} from 'react-data-table-component'

const styles = {
  card: {
    position: 'absolute',
    top: '60px',
    left: '0',
    width: '25%',
    height: '75%',
    padding: '2rem',
    margin: '2rem',
    backgroundColor: '#fef9ef',
    borderRadius: '1rem',
    border: '1px solid #d3d3d3',
    overflowY: 'scroll',
  },
  cardCloseBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '30px',
    height: '30px',
    color: '#227c9d',
    backgroundColor: '#fef9ef',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #227c9d',
    cursor: 'pointer',
  },
  // card::-webkit-scrollbar: {
  //   display: none;
  // },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  cardImg: {
    width: '120px',
    borderRadius: '1rem',
  },
  cardName: {
    marginTop: '1rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  cardRole: {
    margin: '1rem 0',
    fontSize: '1.2rem',
  },
  cardBody: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  cardBodyTeamMembers: {
    marginTop: '1rem',
    height: '26vh',
    overflowY: 'scroll',
  },
  cardItem: {
    width: '100%',
    margin: '0.5rem 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
  },
  cardItemLabel: {
    margin: '0.5rem 0',
    fontWeight: 'bold',
  },
  cardItemValue: {
    textAlign: 'justify',
  },
  cardItemTeam: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardItemImg: {
    width: '50px',
    height: '50px',
    margin: '0.2rem',
    borderRadius: '50%',
  },
  cardItemName: {
    marginLeft: '0.5rem',
    fontWeight: 'bold',
  },
  cardItemRole: {
    fontSize: '0.8rem',
    marginLeft: '0.5rem',
  },
}

createTheme(
  'darkMetro',
  {
    text: {
      primary: '#92929f',
      secondary: '#92929f',
    },
    background: {
      default: '#1e1e2e',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#2b2c41',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  },
  'dark'
)

const API_URL = process.env.REACT_APP_SISAPPRA_API_URL
export const DATA_HIRARKI_URL = `${API_URL}/master/struktur_data_hirarki`

const EmployeeDetailsCard = (props) => {
  const [datasatpp, setDataSatPP] = useState()

  useEffect(() => {
    const fetchDataPP = async (id) => {
      const value = await axios.get(`${DATA_HIRARKI_URL}/find/${props.employee.id}`)
      const fixedData = value.data.data.map((item) => {
        const {parentid, position_name, ...newItem} = item
        return {
          ...newItem,
          parentId: parentid == '0' ? '' : parentid + '',
          positionName:
            position_name == props.employee.positionName ? position_name : position_name,
        }
      })
      setDataSatPP(fixedData)
    }
    fetchDataPP()
    console.log('ini buat data test', datasatpp)
  }, [])

  let num = 1

  const columns = [
    {
      name: 'No',
      sortable: true,
      sortField: 'kepegawaian_nrk',
      wrap: true,
      cell: (record) => {
        return <div className='mt-5 mb-5'>{num++}</div>
      },
    },
    {
      name: 'Nama',
      selector: (row) => row.name,
      sortable: true,
      sortField: 'nama',
      center: true,
      wrap: true,
    },
    {
      name: 'Tempat Lahir',
      selector: (row) => row.tempat_lahir,
      sortable: true,
      sortField: 'tempat_lahir',
      width: '240px',
      center: true,
      wrap: true,
    },
    {
      name: 'Tanggal Lahir',
      selector: (row) => row.tanggal_lahir,
      sortable: true,
      sortField: 'tanggal_lahir',
      width: '240px',
      center: true,
      wrap: true,
    },
    // {
    //   name: 'NRK',
    //   selector: (row) => row.nrk,
    //   sortable: true,
    //   sortField: 'nrk',
    //   center: true,
    //   wrap: true,
    // },
    {
      name: 'Status Pegawai',
      selector: (row) => row.status_pegawai,
      sortable: true,
      sortField: 'status_pegawai',
      width: '240px',
      center: true,
      wrap: true,
    },
    {
      name: 'JK',
      selector: (row) => row.jenis_kelamin,
      sortable: true,
      sortField: 'jenis_kelamin',
      center: true,
      wrap: true,
    },
    {
      name: 'Agama',
      selector: (row) => row.agama,
      sortable: true,
      sortField: 'agama',
      center: true,
      wrap: true,
    },
  ]
  return (
    <div style={styles.card}>
      <button style={styles.cardCloseBtn} onClick={props.handleClose}>
        <i className='fa fa-close' />
      </button>
      {props.employee.team === '' ? (
        <div>
          <div style={styles.cardHeader}>
            {/* <h2 style={styles.cardName}>{props.employee.name}</h2> */}
            <h2 cstyle={styles.cardName}>{props.employee.positionName}</h2>
            <p cstyle={styles.cardRole}>List Nama</p>
          </div>
          <div style={styles.cardBody}>
            <DataTable
              columns={columns}
              data={datasatpp}
              // progressPending={loading}
              // progressComponent={<LoadingAnimation />}
              highlightOnHover
              // theme={calculatedMode === 'dark' ? 'darkMetro' : 'light'}
            />
          </div>
        </div>
      ) : (
        <div>
          <div style={styles.cardHeader}>
            <h2>{props.employee.team} Team</h2>
          </div>
          <h4>Team Members:</h4>
          <div style={styles.cardBodyTeamMembers}>
            {props.employees
              .filter((employee) => employee.parentId === props.employee.id.toString())
              .map((employee) => (
                <div style={styles.cardItemTeam} key={employee.id}>
                  <img style={styles.cardItemImg} src={employee.imageUrl} alt='Profile' />
                  <p style={styles.cardItemName}>{employee.name}</p>
                  <p style={styles.cardItemRole}>{employee.positionName}</p>
                </div>
              ))}
          </div>
        </div>
      )}
      {/* <div style={styles.cardItem}>
        <p style={styles.cardItemLabel}>Description:</p>
        <p style={styles.cardItemValue}>{props.employee.description}</p>
      </div> */}
    </div>
  )
}

export default EmployeeDetailsCard
