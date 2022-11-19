import React, { useState, useEffect } from 'react';
import '../css/Category.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
    createCategory,
    getAllCategory,
    deleteCategory as deleteCategoryAction,
    editCategory as editCategoryAction,
    categoryMessageAndErrorRemove
} from '../../actions/CategoryAction';
import Modals from './Modals';
import { BiEditAlt } from 'react-icons/bi';
import { MdDelete, MdAdd } from 'react-icons/md';
import { Modal, Box, Button, Typography } from '@mui/material';
import { Row, Col, Table } from 'react-bootstrap';
import ErrorHandle from './ErrorHandle';


const Category = () => {
    const dispatch = useDispatch()

    // state for add category
    const [addCategoryModal, setAddCategoryModal] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')

    // state for delete category
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
    const [deleteCategoryId, setDeleteCategoryId] = useState('')

    // state for edit category
    const [editCategoryModal, setEditCategoryModal] = useState(false)
    const [editCategoryDetail, setEditCategoryDetail] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const { categories, error, message } = useSelector((state) => state.category)
    const productState = useSelector((state) => state.product);

    // const showAllCategory = (category) => {
    //     const categoryData = []

    //     for (let cat of category) {
    //         categoryData.push(
    //             <li key={cat._id}>
    //                 {cat.categoryName}
    //                 {cat.children.length > 0 ? <ul>{showAllCategory(cat.children)}</ul> : null}
    //             </li>
    //         )
    //     }

    // return categoryData;
    // }


    const showMainCategoryInList = (category, option = []) => {
        for (let cat of category) {
            option.push({
                id: cat._id,
                categoryName: cat.parentCategoryId ? `-- ${cat.categoryName}` : cat.categoryName
            })
        }
        return option;
    }

    const addCategory = (e) => {
        e.preventDefault()
        const data = { categoryName, parentCategoryId }
        dispatch(createCategory(data))

        setCategoryName('')
        setParentCategoryId('')
        setAddCategoryModal(false)
    }

    const deleteCategory = () => {
        dispatch(deleteCategoryAction(deleteCategoryId))
        setDeleteCategoryModal(false)
    }

    const editCategory = (e) => {
        e.preventDefault()
        dispatch(editCategoryAction(editCategoryDetail))
        setEditCategoryModal(false)
    }

    const filterProducts = (categoryId) => {
        return productState.products.filter((value) => value.categoryId._id === categoryId)
    }

    useEffect(() => {
        if (message)
            dispatch(getAllCategory())
    }, [message])

    return (
        <>
            <Navbar />
            <div className="category-main-box">
                <Sidebar />
                <div className="category-box">
                    <div className="category-first-box">
                        <div className="category-heading">Categories</div>
                        <button className="category-first-box-add-button" onClick={() => setAddCategoryModal(true)}>
                            <MdAdd style={{ marginRight: '5px' }} />
                            Add Category
                        </button>

                        {/* --- modal for add category start */}
                        <Modals
                            state={addCategoryModal}
                            title="Add New Category"
                            button_1="Cancel"
                            button_2="Add Category"
                            size="md"
                            cancelFnc={() => {
                                setAddCategoryModal(false)
                                setCategoryName('')
                                setParentCategoryId('')
                                setErrorMessage('')
                            }}
                            addFnc={addCategory}
                        >
                            <input type="text" placeholder="Enter Category Name" className="form-control" required onChange={(e) => setCategoryName(e.target.value)} />
                            <div style={{ margin: '2px 0px 10px 5px', color: 'red', fontSize: '13px' }}>
                                {errorMessage && errorMessage}
                            </div>

                            <select onChange={(e) => setParentCategoryId(e.target.value)} className="form-select">
                                <option value="">Select Category</option>
                                {
                                    // console.log(showMainCategoryInList(categories))
                                    showMainCategoryInList(categories).map((value, index) => <option key={index} value={value.id}>{value.categoryName}</option>)
                                }

                            </select>
                        </Modals>
                        {/* modal for add category end --- */}

                    </div>

                    {/* --- show category and subcategory in table start */}
                    <div className="category-second-box">
                        <Table bordered responsive="sm" style={{ backgroundColor: 'white' }}>
                            <thead>
                                <tr>
                                    <th className="category-react-table-th">S.no</th>
                                    <th className="category-react-table-th">Main Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.length > 0 &&
                                    categories.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{value.categoryName}</td>
                                                <Table bordered hover style={{ marginBottom: '0px', backgroundColor: 'white' }}>
                                                    <thead>
                                                        <tr>
                                                            <th className="category-react-table-th" style={{ width: '40%' }}>Sub Category</th>
                                                            <th className="category-react-table-th">Total Products</th>
                                                            <th className="category-react-table-th">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            value.children.length > 0 && value.children.map((sub_value, sub_index) => {
                                                                return (
                                                                    <tr key={sub_index} style={{ paddingTop: '50px' }}>
                                                                        <td>{sub_value.categoryName}</td>
                                                                        <td>{filterProducts(sub_value._id).length}</td>
                                                                        <td>
                                                                            <BiEditAlt onClick={() => {
                                                                                setEditCategoryDetail(sub_value)
                                                                                setEditCategoryModal(true)
                                                                            }} />
                                                                            <MdDelete style={{ marginLeft: '20px' }} onClick={() => {
                                                                                setDeleteCategoryId(sub_value._id)
                                                                                setDeleteCategoryModal(true)
                                                                            }} />
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </ Table>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
                {/* show category and subcategory in table end --- */}

                {/* calling ErrorHandle() function component to show alert */}
                {
                    <ErrorHandle message={message} error={error} removeAction={categoryMessageAndErrorRemove} />
                }
            </div>


            {/* --- modal for delete category start */}
            <Modal open={deleteCategoryModal}>
                <Box className="category-modal-box">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are Your Sure
                    </Typography>
                    <Box className="category-modal-button">
                        <Button variant="outlined" onClick={() => setDeleteCategoryModal(false)} style={{ marginRight: '5px' }}>No</Button>
                        <Button variant="contained" onClick={deleteCategory}>Yes</Button>
                    </Box>
                </Box>
            </Modal>
            {/* modal for delete category end --- */}


            {/* --- modal for edit category start */}
            <Modals
                state={editCategoryModal}
                title="Edit Category"
                button_1="No"
                button_2="Yes"
                size="md"
                cancelFnc={() => setEditCategoryModal(false)}
                addFnc={editCategory}
            >
                <Row>
                    <Col>
                        <label className="mb-2">Category Name</label>
                        <input type="text" value={editCategoryDetail.categoryName} placeholder="Enter Category Name" className="form-control mb-2" onChange={(e) => setEditCategoryDetail({ ...editCategoryDetail, categoryName: e.target.value })} />
                    </Col>
                    <Col>
                        <label className="mb-2">Parent Category Name</label>
                        <select onChange={(e) => setEditCategoryDetail({ ...editCategoryDetail, parentCategoryId: e.target.value })} className="form-select">
                            <option value={editCategoryDetail.parentCategoryId}>{editCategoryDetail && showMainCategoryInList(categories).filter((value) => value.id === editCategoryDetail.parentCategoryId)[0].categoryName}</option>
                            {
                                showMainCategoryInList(categories).map((value, index) => <option key={index} value={value.id}>{value.categoryName}</option>)
                            }
                        </select>
                    </Col>
                </Row>
            </Modals>
            {/* modal for edit category end --- */}
        </>
    );
};

export default Category;