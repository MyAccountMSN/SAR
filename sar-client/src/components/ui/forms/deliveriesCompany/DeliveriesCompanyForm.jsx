import React, { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewDeliveryCompany,
  updateDeliveryCompany
} from '../../../../redux/actions/deliveryCompaniesActions'
import { ADD_DELIVERY_COMPANY_RESET, SET_CURRENT_DELIVERY_COMPANY_RESET, UPDATE_DELIVERY_COMPANY_RESET } from '../../../../redux/constants/deliveryCompaniesConstants';

const DeliveriesCompanyForm = () => {

  const dispatch = useDispatch()
    
  const currentDeliveryCompany = useSelector(state => state.setCurrentDeliveryCompany)
  const { currentDeliveryCompany: current } = currentDeliveryCompany

  const addDeliveryCompanySt = useSelector(state => state.addDeliveryCompany)
  const { loading: addingLoading, success, error: addingError } = addDeliveryCompanySt
  
  const updateDeliveryCompanySt = useSelector((state) => state.updateDeliveryCompany);
  const { success:updateSuccess, error:updateError, loading:updateLoading } = updateDeliveryCompanySt;


  const [name, setName] = useState('')

  useEffect(() => {
    if (current && current.deliveryName) {
      setName(current.deliveryName)
    }
  }, [current])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(addNewDeliveryCompany(name))
    document.getElementById('addDeliveryCompany').reset()
    dispatch({ type: SET_CURRENT_DELIVERY_COMPANY_RESET })
    setName('')
  }
  
  const onClickHandler = (id,name) => {
    dispatch(updateDeliveryCompany(id,name))
    document.getElementById('addDeliveryCompany').reset()
    dispatch({ type: SET_CURRENT_DELIVERY_COMPANY_RESET })
    
  }
  

  
  
  return (
    <form className='text-center' onSubmit={ submitHandler } id='addDeliveryCompany'>
      { success && <Alert onClose={() => {dispatch({type:ADD_DELIVERY_COMPANY_RESET})}}>تمت الإضافة بنجاح</Alert> }
      { addingError && <Alert variant='error' onClose={ () => { dispatch({ type: ADD_DELIVERY_COMPANY_RESET }) } }>{ addingError }</Alert> }
      { updateSuccess && <Alert onClose={() => {dispatch({type:UPDATE_DELIVERY_COMPANY_RESET})}}>تم التعديل بنجاح</Alert> }
      { updateError && <Alert variant='error' onClose={ () => { dispatch({ type: UPDATE_DELIVERY_COMPANY_RESET }) } }>{ updateError }</Alert>}
      <h2 className='my-4'>إضافة شركة توصيل</h2>

      <TextField
        label='اسم الشركة'
        variant='standard'
        onChange={
          (e) => setName(e.target.value)
        }
        value={ name }
        required
      />
      <button
        className='btn btn-primary mx-2'
        type='submit'
        disabled={ addingLoading || updateLoading }
      > 
        { addingLoading ? <CircularProgress size={ 20 } color='grey' /> : "إضافة" }
      </button>
      <button
        className='btn btn-outline-primary mx-2'
        onClick={ () => onClickHandler(current.deliveryID, name) }
        disabled={ addingLoading || updateLoading || !current.deliveryID }
      >
        { addingLoading ? <CircularProgress size={ 20 } color='grey' /> : "تعديل" }
      </button>
    </form>
  );
};

export default DeliveriesCompanyForm;
