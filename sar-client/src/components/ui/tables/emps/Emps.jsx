import { Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmp, getEmps} from '../../../../redux/actions/empsActions'
import { ADD_EMP_RESET, DELETE_EMP_RESET, SET_CURRENT_EMP, SET_CURRENT_EMP_RESET, UPDATE_EMP_RESET } from '../../../../redux/constants/empConstants';

const Emps = () => {
  const dispatch = useDispatch()
    
    const currentEmp = useSelector(state => state.setCurrentEmp)
    const { currentEmp: current } = currentEmp
    
    const emps = useSelector((state) => state.getEmps);
    const { emps: empsList, error, loading } = emps;

    const deleteEmpSt = useSelector((state) => state.deleteEmp);
    const { success, error: deleteError, loading: deleteLoading } = deleteEmpSt;

    const addEmpSt = useSelector((state) => state.addEmp);
    const { success:addSuccess, error: addError, loading: addLoading } = addEmpSt;
    
    const updateEmpSt = useSelector((state) => state.updateEmp);
    const { success: updateSuccess, error: updateError, loading: updateLoading } = updateEmpSt;
  
  // Pagination code
  // const [empsState, setEmpsState] = useState()
  // const [currentEmps, setCurrentEmps] = useState([])
  // const [currentPage, setCurrentPage] = useState(1)
  // const [empsPerPage, setEmpsPerPage] = useState(10)

  // const pageNumbers = []
  

  // useEffect(() => {
  //   if (!loading) {
  //   const indexOfLastEmp = currentPage * empsPerPage
  //   const indexOfFirstEmp = indexOfLastEmp - empsPerPage
  //   setCurrentEmps(empsList.slice(indexOfFirstEmp, indexOfLastEmp))
  //   for (let i = 1; i <= Math.ceil(empsList / empsPerPage); i++) {
  //       pageNumbers.push(i);
  //   }
  // }
  // }, [loading])
  
  
  

  useEffect(() => {
    dispatch({ type: SET_CURRENT_EMP_RESET })
    dispatch({ type: UPDATE_EMP_RESET })
    dispatch({ type: ADD_EMP_RESET })
    dispatch(getEmps());
  }, []);
  

    useEffect(() => {
        if (success || updateSuccess ||addSuccess) {
          dispatch(getEmps());
      }
    }, [success, updateSuccess,addSuccess])
    

    const deleteHandler = (id) => {
        dispatch(deleteEmp(id))
        
    }


    

    if (loading) {
    return <Box sx={{ display: 'flex',justifyContent:'center' }}>
      <CircularProgress size={100} color='grey' />
    </Box>
  }
  if (error) {
        return <Alert variant='error'>{ error }</Alert>
    }
  return (
    <div>
          { error && <Alert variant='error' onClose={ () => { dispatch({ type: DELETE_EMP_RESET }) } }>{ error }</Alert> }
          { success && <Alert onClose={() => {dispatch({type:DELETE_EMP_RESET})}}>تم الحذف بنجاح</Alert> }
          { deleteError && <Alert variant='error' onClose={ () => { dispatch({ type: DELETE_EMP_RESET }) } }>{ deleteError }</Alert> }
          
      <h2 className='text-center mt-5'>الموظفون</h2>
      <div className='form-group w-75 mb-3 mx-auto' dir='rtl'>
        <label htmlFor='search-for-employee' className='form-label mt-4'>
          البحث عن مندوب
        </label>
        <input
          type='text'
          className='form-control'
          name='search-for-employee'
          placeholder='اكتب اسم أو جزء من اسم المندوب'
        />
      </div>

      <div className='container-fluid px-5'>
        {/* <nav style={{border:'solid 1px black'}}>
            <ul className='pagination'>
                {pageNumbers.map((number) => (   
                    <li key={ number } className='page-item'>
                        <a href='!#' className='page-link'>
                            {number}
                        </a>
                    </li> 
                ))}
            </ul>
        </nav> */}
        
        <div className='table-responsive'>
          
          <table className='table table-bordered table-striped mx-auto' dir='rtl'>
            <thead>
              <tr className='bg-primary text-white'>
                <th scope='col'>ID</th>
                <th scope='col'>الاسم</th>
                <th scope='col'>كلمة المرور</th>
                <th scope='col'>رقم الجوال الأول</th>
                <th scope='col'>رقم الجوال الثاني</th>
                <th scope='col'>البريد الإلكتروني</th>
                <th scope='col'>الحي</th>
                <th scope='col'>ملاحظات</th>
                <th scope='col'>خيارات</th>
              </tr>
            </thead>
              <tbody style={ { fontSize: '0.9rem' } }>
                { empsList.map((emp) => (
                  <tr key={emp.empId}>
                    <td>{ emp.empId }</td>
                    <td>{ emp.empName }</td>
                    <td>{ emp.password }</td>
                    <td>{ emp.mobile1 }</td>
                    <td>{ emp.mobile2 }</td>
                    <td>{ emp.email }</td>
                    <td>{ emp.address1 }</td>
                    <td>{ emp.notes }</td>
              <td>
                  <button style={{width: '75px'}} className='btn btn-primary mx-2 my-1'onClick={
                                          () => {
                                              dispatch({ type: SET_CURRENT_EMP, payload: emp }),
                                            document.getElementById('root').scrollIntoView({behavior:'smooth'})
                                          } }
                                  >تعديل</button>
                      <button style={ { width: '75px' } }
                        className='btn btn-danger mx-2'
                        onClick={ () => deleteHandler(String(emp.empId)) }
                        disabled={ deleteLoading }
                              >
                        { deleteLoading ? <CircularProgress color="inherit" size={ 15 } /> :
                          'حذف' }
                      </button>
                  
              </td>
          
            </tr>
                ))}
            
            
            </tbody>
          </table>
      </div>
      </div>
      
    </div>
  );
};

export default Emps;
