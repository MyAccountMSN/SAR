import {
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../../redux/actions/categoriesActions';
import {
  addNewSubCategory,
  updateSubCategory,
} from '../../../../redux/actions/subCategoriesActions';
import {
  ADD_SUBCATEGORY_RESET,
  SET_CURRENT_SUBCATEGORY_RESET,
  UPDATE_SUBCATEGORY_RESET,
} from '../../../../redux/constants/subCategoriesConstants';

const SubCategoryForm = () => {
  const dispatch = useDispatch();

  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  useEffect(() => {
    if (!cookies.user) {
      nav('/manager/login', { replace: true });
    }
    if (cookies.user.split('+')[1] !== 'A') {
      nav('/', { replace: true });
    }
  }, [cookies.user]);

  const categories = useSelector((state) => state.getCategories);
  const { categories: categoriesList, error, loading } = categories;

  const currentSubCategory = useSelector(
    (state) => state.setCurrentSubCategory
  );
  const { currentSubCategory: current } = currentSubCategory;

  const addSubCategorySt = useSelector((state) => state.addSubCategory);
  const {
    loading: addingLoading,
    success,
    error: addingError,
  } = addSubCategorySt;

  const updateSubCategorySt = useSelector((state) => state.updateSubCategory);
  const {
    success: updateSuccess,
    error: updateError,
    loading: updateLoading,
  } = updateSubCategorySt;

  // const addCategorySt = useSelector(state => state.addCategory)
  // const { loading:addingLoading , error:addingError } = addCategorySt

  const [name, setName] = useState('');
  const [catId, setCatId] = useState('');

  useEffect(() => {
    dispatch(getCategories(true));
  }, []);

  useEffect(() => {
    if (current && current.subCatName) {
      setName(current.subCatName);
      setCatId(current.catID);
    }
    if (!current || !current.subCatName) {
      setName('');
      setCatId('');
    }
  }, [current]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addNewSubCategory(catId, name));
    document.getElementById('addCatForm').reset();
    dispatch({ type: SET_CURRENT_SUBCATEGORY_RESET });
    setName('');
    setCatId('');
  };

  const onClickHandler = () => {
    dispatch(updateSubCategory(catId.toString(), name, current.subCatID));
    document.getElementById('addCatForm').reset();
    dispatch({ type: SET_CURRENT_SUBCATEGORY_RESET });
  };

  return (
    <form className='text-center' onSubmit={submitHandler} id='addCatForm'>
      {success && (
        <Alert
          onClose={() => {
            dispatch({ type: ADD_SUBCATEGORY_RESET });
          }}
        >
          تمت الإضافة بنجاح
        </Alert>
      )}
      {addingError && (
        <Alert
          severity="error"
          onClose={() => {
            dispatch({ type: ADD_SUBCATEGORY_RESET });
          }}
        >
          {addingError}
        </Alert>
      )}
      {updateSuccess && (
        <Alert
          onClose={() => {
            dispatch({ type: UPDATE_SUBCATEGORY_RESET });
          }}
        >
          تم التعديل بنجاح
        </Alert>
      )}
      {updateError && (
        <Alert
          severity="error"
          onClose={() => {
            dispatch({ type: UPDATE_SUBCATEGORY_RESET });
          }}
        >
          {updateError}
        </Alert>
      )}
      <h2 className='text-center mb-3'>الأصناف الفرعية</h2>
      <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-simple-select-filled-label'>
          الصنف الرئيسي
        </InputLabel>
        <Select
          required
          sx={{ width: '100%' }}
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={catId}
          onChange={(e) => setCatId(e.target.value)}
        >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            categoriesList.map((cat) => (
              <MenuItem key={cat.catID} value={cat.catID}>
                {cat.catName}
              </MenuItem>
            ))
          )}
        </Select>

        <TextField
          sx={{ width: '100%' }}
          required
          label='اسم الصنف الفرعي'
          onChange={(e) => setName(e.target.value)}
          variant='standard'
          value={name}
        />
      </FormControl>

      <br />
      <button
        type='button'
        className='btn btn-info mx-1'
        onClick={() => {
          dispatch({ type: SET_CURRENT_SUBCATEGORY_RESET });
          setName('');
          setCatId('');
        }}
        disabled={addingLoading || updateLoading || !current.subCatID}
      >
        إزالة التحديد
      </button>
      <button
        type='button'
        className='btn btn-outline-primary mx-1'
        onClick={onClickHandler}
        disabled={addingLoading || updateLoading || !current.subCatID}
      >
        {updateLoading ? <CircularProgress size={20} color='grey' /> : 'تعديل'}
      </button>
      <button
        type='submit'
        className='btn btn-primary mx-1'
        disabled={addingLoading || updateLoading || current.subCatID}
      >
        {addingLoading ? <CircularProgress size={20} color='grey' /> : 'إضافة'}
      </button>
    </form>
  );
};

export default SubCategoryForm;
