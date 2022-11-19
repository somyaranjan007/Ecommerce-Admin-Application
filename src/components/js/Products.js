import React, { useState, useEffect } from 'react';
import '../css/Products.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Table, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Modals from './Modals';
import {
    addProducts,
    productMessageAndErrorRemove,
    showProducts as showProductAction,
    deleteProduct as deleteProductAction,
    editProduct
} from '../../actions/ProductAction';
import { giveMeImages } from '../../axios/UrlConfig';
import { BiEditAlt } from 'react-icons/bi';
import { MdDelete, MdAdd, MdCancel } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import ErrorHandle from './ErrorHandle';
import { Modal, Box, Button, Typography } from '@mui/material';


const Products = () => {
    // state for show product
    const [showProductModal, setShowProductModal] = useState(false);
    const [showProduct, setShowProduct] = useState()

    const [searchProduct, setSearchProduct] = useState('')

    const { products, message, error } = useSelector((state) => state.product);
    const categoryState = useSelector((state) => state.category);
    const dispatch = useDispatch()

    // state for add product
    const [addProductModal, setAddProductModal] = useState(false);
    const [addProductDetail, setAddProductDetail] = useState({
        productName: null,
        actualPrice: null,
        sellingPrice: null,
        description: null,
        stocks: null,
        categoryId: null
    })
    const [addProductPictures, setAddProductPictures] = useState([]);

    // state for delete product
    const [deleteProductModal, setDeleteProductModal] = useState(false)
    const [deleteProductId, setDeleteProductId] = useState('')

    // state for edit product
    const [editProductModal, setEditProductModal] = useState(false)
    const [editProductDetail, setEditProductDetail] = useState({})

    const productDetailFnc = (value) => {
        setShowProductModal(true)
        setShowProduct(value)
    }

    const addingProductToStateFnc = (e) => {
        const name = e.target.name
        const value = e.target.value

        setAddProductDetail({ ...addProductDetail, [name]: value })
    }

    // adding product to the form and dispatch action
    const addProductFnc = (e) => {
        e.preventDefault()

        const form = new FormData()
        form.append('productName', addProductDetail.productName)
        form.append('sellingPrice', addProductDetail.sellingPrice)
        form.append('description', addProductDetail.description)
        form.append('stocks', addProductDetail.stocks)
        form.append('categoryId', addProductDetail.categoryId)

        for (let img of addProductPictures) {
            form.append('productPictures', img)
        }

        dispatch(addProducts(form))

        setAddProductModal(false)
        setAddProductPictures([])
    }


    const showSubCategoryInList = (cateogories, option = []) => {
        for (let cat of cateogories) {
            if (cat.parentCategoryId) {
                option.push({
                    id: cat._id,
                    categoryName: cat.categoryName
                })
            }
            if (cat.children.length > 0) {
                showSubCategoryInList(cat.children, option)
            }
        }
        return option;
    }

    const deleteProductFnc = () => {
        dispatch(deleteProductAction(deleteProductId))
        setDeleteProductModal(false)
    }

    const editProductFnc = (e) => {
        e.preventDefault()
        dispatch(editProduct(editProductDetail))
        setEditProductModal(false)
    }

    const imagehandle = (e) => {
        if (e.target.files.length > 0) {
            setAddProductPictures([...addProductPictures, e.target.files[0]])
        }
        // console.log(addProductPictures.some((value) => value.name !== e.target.files[0].name))
    }

    const showProductListInTableFnc = (productList) => {
        return (
            productList?.map((value, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td onClick={() => productDetailFnc(value)}>{value.productName}</td>
                        <td>{value.stocks}</td>
                        <td>{value.sellingPrice}</td>
                        <td>{value.categoryId.categoryName}</td>
                        <td>
                            <BiEditAlt onClick={() => {
                                setEditProductModal(true)
                                setEditProductDetail(value)
                            }} />
                            <MdDelete style={{ marginLeft: '20px' }} onClick={() => {
                                setDeleteProductModal(true)
                                setDeleteProductId(value._id)
                            }} />
                        </td>
                    </tr>
                )
            })
        )
    }

    useEffect(() => {
        if (message)
            dispatch(showProductAction())
    }, [message])

    return (
        <>
            <Navbar />
            <div className="product-main-box">
                <Sidebar />

                <div className="product-box">
                    <div className="product-first-box">
                        <div className="product-heading-search-box">
                            <div className="product-heading">Products</div>
                            <div className="product-search-box">
                                <input type="text" placeholder="Search Product" onChange={(e) => setSearchProduct(e.target.value)} className="product-search-bar" />
                                <BsSearch style={{ marginLeft: '-20px', fontSize: '13px' }} />
                            </div>
                        </div>

                        <button className="product-first-box-add-button" onClick={() => setAddProductModal(true)}><MdAdd style={{ marginRight: '5px' }} />Add Product</button>

                        {/* --- Modal for Add Product start */}
                        <Modals
                            state={addProductModal}
                            title="Add New Product"
                            button_1="Cancel"
                            button_2="Add Product"
                            size="md"
                            cancelFnc={() => {
                                setAddProductModal(false)
                            }}
                            addFnc={addProductFnc}
                        >

                            <input type="text" placeholder="Enter Product Name" name="productName" onChange={addingProductToStateFnc} className="form-control mb-2" required />
                            <input type="number" placeholder="Enter Actual Price" name="actualPrice" onChange={addingProductToStateFnc} className="form-control mb-2" required />
                            <input type="number" placeholder="Enter selling Price" name="sellingPrice" onChange={addingProductToStateFnc} className="form-control mb-2" required />
                            <input type="text" placeholder="Enter Description" name="description" onChange={addingProductToStateFnc} className="form-control mb-2" required />
                            <input type="number" placeholder="Enter How Many Stock Available" name="stocks" onChange={addingProductToStateFnc} className="form-control mb-2" required />

                            <select name="categoryId" onChange={addingProductToStateFnc} className="form-select mb-2" required>
                                <option value="" >Select Category</option>
                                {
                                    showSubCategoryInList(categoryState.categories).map((value, index) => <option key={index} value={value.id}>{value.categoryName}</option>)
                                }
                            </select>

                            <input type="file" onChange={imagehandle} className="form-control mb-2" required />
                            {
                                addProductPictures.length > 0 && addProductPictures.map((value, index) => <div key={index} className="form-control mb-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{value.name} <MdCancel onClick={() => setAddProductPictures(addProductPictures.filter((item) => item.name !== value.name))} /></div>)
                            }

                        </Modals>
                        {/* Modal for Add Product end --- */}

                    </div>

                    {/* --- product card start */}
                    <div className="product-second-box">
                        <div className="product-men-product-box">
                            <div className="product-second-box-heading">Men's Products</div>
                            <div className="product-total-quantity">{products.length > 0 ? products.filter((value) => value.categoryId.categoryName.includes("Men")).length : '0'}</div>
                        </div>
                        <div className="product-women-product-box">
                            <div className="product-second-box-heading">Women's Products</div>
                            <div className="product-total-quantity">{products.length > 0 ? products.filter((value) => value.categoryId.categoryName.includes("Women")).length : '0'}</div>
                        </div>
                        <div className="product-total-product-box">
                            <div className="product-second-box-heading">Total Products</div>
                            <div className="product-total-quantity">{products.length}</div>
                        </div>
                    </div>
                    {/* product card end --- */}


                    {/* --- products show in table start */}
                    <div className="product-fourth-box">
                        <Table bordered hover responsive="sm" style={{ backgroundColor: 'white' }}>
                            <thead>
                                <tr>
                                    <th className="product-react-table-th">S.no</th>
                                    <th className="product-react-table-th">Name</th>
                                    <th className="product-react-table-th">Stocks</th>
                                    <th className="product-react-table-th">Selling Price</th>
                                    <th className="product-react-table-th">Category</th>
                                    <th className="product-react-table-th">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    searchProduct ?
                                        showProductListInTableFnc(products?.filter((value) => value.productName.toLowerCase().includes(searchProduct?.toLowerCase())))
                                        :
                                        showProductListInTableFnc(products)
                                }
                            </tbody>
                        </Table>
                    </div>
                    {/* products show in table end --- */}

                </div>

                {/* calling ErrorHandle() function component to show alert */}
                {
                    <ErrorHandle message={message} error={error} removeAction={productMessageAndErrorRemove} />
                }
            </div>


            {/* --- show product detail through Modal start */}
            {
                showProduct ?
                    < Modals
                        state={showProductModal}
                        title="Product Details"
                        button_1="Cancel"
                        size="lg"
                        cancelFnc={() => setShowProductModal(false)}
                    >
                        <Row>
                            <Col md={8}>
                                <label style={{ fontWeight: '600' }}>Name</label>
                                <p>{showProduct.productName}</p>
                            </Col>
                            <Col md={4}>
                                <label style={{ fontWeight: '600' }}>Stocks</label>
                                <p>{showProduct.stocks}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                                <label style={{ fontWeight: '600' }}>Actual Price</label>
                                <p>{showProduct.actualPrice}</p>
                            </Col>
                            <Col md={4}>
                                <label style={{ fontWeight: '600' }}>Selling Price</label>
                                <p>{showProduct.sellingPrice}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <label style={{ fontWeight: '600' }}>Category</label>
                                <p>{showProduct.categoryId.categoryName}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <label style={{ fontWeight: '600' }}>Description</label>
                                <p>{showProduct.description}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <label style={{ fontWeight: '600' }}>Product Pictures</label>
                                <div className="product-images-box">
                                    {showProduct.productPictures.map((image, index) => <img key={index} src={giveMeImages(image.img)} alt="not found" className="product-images" />)}
                                </div>
                            </Col>
                        </Row>
                    </Modals >
                    :
                    null
            }
            {/* show product detail through Modal end --- */}


            {/* --- modal for delete Product start */}
            <Modal open={deleteProductModal}>
                <Box className="category-modal-box">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are Your Sure
                    </Typography>
                    <Box className="category-modal-button">
                        <Button variant="outlined" onClick={() => setDeleteProductModal(false)} style={{ marginRight: '5px' }}>No</Button>
                        <Button variant="contained" onClick={deleteProductFnc}>Yes</Button>
                    </Box>
                </Box>
            </Modal>
            {/* modal for delete Product end --- */}


            {/* --- modal for edit Product start */}
            <Modals
                state={editProductModal}
                title="Edit Product"
                button_1="Cancel"
                button_2="Edit Product"
                size="md"
                cancelFnc={() => {
                    setEditProductModal(false)
                }}
                addFnc={editProductFnc}
            >
                <label style={{ fontWeight: '500' }}>Product Name</label>
                <input type="text" value={editProductDetail?.productName} onChange={(e) => setEditProductDetail({ ...editProductDetail, productName: e.target.value })} className="form-control mb-2" required />

                <label style={{ fontWeight: '500' }}>Actual Price</label>
                <input type="number" value={editProductDetail?.actualPrice} onChange={(e) => setEditProductDetail({ ...editProductDetail, actualPrice: e.target.value })} className="form-control mb-2" required />

                <label style={{ fontWeight: '500' }}>Selling Price</label>
                <input type="number" value={editProductDetail?.sellingPrice} onChange={(e) => setEditProductDetail({ ...editProductDetail, sellingPrice: e.target.value })} className="form-control mb-2" required />

                <label style={{ fontWeight: '500' }}>Product Description</label>
                <input type="text" value={editProductDetail?.description} onChange={(e) => setEditProductDetail({ ...editProductDetail, description: e.target.value })} className="form-control mb-2" required />

                <label style={{ fontWeight: '500' }}>Product Stocks</label>
                <input type="number" value={editProductDetail?.stocks} onChange={(e) => setEditProductDetail({ ...editProductDetail, stocks: e.target.value })} className="form-control mb-2" required />

                <label style={{ fontWeight: '500' }}>Product Category</label>
                <select onChange={addingProductToStateFnc} className="form-select mb-2" required>
                    <option value={editProductDetail?.categoryId} >{editProductDetail.categoryId?.categoryName}</option>
                    {
                        showSubCategoryInList(categoryState.categories).map((value, index) => <option key={index} value={value.id}>{value.categoryName}</option>)
                    }
                </select>

                <input type="file" onChange={imagehandle} className="form-control mb-2" />
                {
                    editProductDetail.productPictures?.length > 0 && editProductDetail.productPictures.map((value, index) => <div key={index} className="form-control mb-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>{value.img} <MdCancel onClick={() => setAddProductPictures(addProductPictures.filter((item) => item.name !== value.name))} /></div>)
                }

            </Modals>
            {/* modal for edit Product end --- */}

        </>
    );
};

export default Products;