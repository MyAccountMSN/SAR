import { Box, Button, Checkbox, CircularProgress, FormControlLabel } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubCategories,deleteSubCategory } from '../../../../redux/actions/subCategoriesActions'
import { UPDATE_CATEGORY_RESET } from '../../../../redux/constants/categoriesConstants'
import { ADD_SUBCATEGORY_RESET, SET_CURRENT_SUBCATEGORY, SET_CURRENT_SUBCATEGORY_RESET, UPDATE_SUBCATEGORY_RESET} from '../../../../redux/constants/subCategoriesConstants'

const SubCategories = () => {

    const dispatch = useDispatch()

    const subCategories = useSelector((state) => state.getSubCategories);
    const { subCategories: subCategoriesList, error, loading } = subCategories;
    
    const currentSubCategory = useSelector(state => state.setCurrentSubCategory)
    const { currentSubCategory: currentSub } = currentSubCategory

    const deleteSubCategorySt = useSelector((state) => state.deleteSubCategory);
    const { success, error: deleteError, loading: deleteLoading } = deleteSubCategorySt;

    const addSubCategorySt = useSelector((state) => state.addSubCategory);
    const { success:addSuccess, error: addError, loading: addLoading } = addSubCategorySt;
    
    const updateSubCategorySt = useSelector((state) => state.updateSubCategory);
    const {success:updateSuccess, error:updateError, loading:updateLoading } = updateSubCategorySt;

  useEffect(() => {
    dispatch({ type: SET_CURRENT_SUBCATEGORY_RESET })
    dispatch({ type: UPDATE_SUBCATEGORY_RESET })
    dispatch({ type: ADD_SUBCATEGORY_RESET })
    dispatch(getSubCategories())
  }, [])
    
    useEffect(() => {
        if (success || updateSuccess ||addSuccess) {
          dispatch(getSubCategories());
      }
    }, [success, updateSuccess,addSuccess])
    
    const deleteHandler = (id) => {
        dispatch(deleteSubCategory(id))
    }


  if (loading) {
      return (
          <Box sx={ { display: 'flex', justifyContent: 'center' } }>
            <CircularProgress size={100} color='grey' />
          </Box>
      )
  }
  return (
      <div>
            {/* {success && <Alert onClose={() => {dispatch({type:DELETE_CATEGORY_RESET})}}>تم الحذف بنجاح</Alert> }
            { deleteError && <Alert variant='error' onClose={ () => { dispatch({ type: DELETE_CATEGORY_RESET }) } }>{ deleteError }</Alert> } */}
          <h3 className='text-center my-3'>الأصناف الفرعية</h3>
          <div className='table-responsive'>
                <table className='table table-striped table-bordered mx-auto w-75 mt-5' dir='rtl'>
                    <thead className='bg-primary text-white'>
                        <tr className='py-5'>
                            <th>ID</th>
                            <th>الاسم</th>
                            <th>الصنف الرئيسي</th>
                    
                            <th className='text-center'>خيارات</th>
                        </tr>
                    </thead>
                    <tbody>
                        { subCategoriesList.sort((a,b)=>{return a.catID - b.catID}).map(subCat => (
                            <tr key={subCat.subCatID}>
                                <td>{ subCat.subCatID }</td>
                                <td>{ subCat.subCatName }</td>
                                <td>{ subCat.catName }</td>
                                <td className='d-flex justify-content-center'>
                                    <button
                                        className='btn btn-danger mx-2'
                                        disabled={ deleteLoading }
                                        onClick={()=>deleteHandler(subCat.subCatID)}
                                    >
                                        {deleteLoading ?  <CircularProgress color="inherit"  size={15} /> :
                                        'حذف'
                                    } </button>
                                    <button className='btn btn-primary'
                                        onClick={
                                            () => dispatch({ type: SET_CURRENT_SUBCATEGORY,payload:subCat }) }
                                    >تعديل</button>
                                    <FormControlLabel control={
                        <Checkbox
                            name="Show"
                        />
                    } label="إظهار" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
          </div>
          
          
    </div>
  )
}

export default SubCategories