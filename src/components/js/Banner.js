import React, { useEffect, useState, useRef } from 'react';
import '../css/Banner.css';
import {
    addBanner,
    deleteBanner,
    getBanner,
    editBanner,
    bannerMessageAndErrorRemove
} from '../../actions/BannerAction';
import { useSelector, useDispatch } from 'react-redux';
import { giveMeBannerImages } from '../../axios/UrlConfig';
import Navbar from './Navbar';
import SideBar from './Sidebar';
import { MdAdd, MdDelete } from 'react-icons/md';
import { Table, Form } from 'react-bootstrap';
import ErrorHandle from './ErrorHandle';
import { Modal, Box, Button, Typography } from '@mui/material';
import Modals from './Modals';


const Banner = () => {
    // state for add banner
    const [addBannerForm, setAddBannerForm] = useState(false)
    const [bannerTitle, setBannerTitle] = useState('')
    const [computerBanner, setComputerBanner] = useState()
    const [mobileBanner, setMobileBanner] = useState();

    // state for delete banner
    const [deleteBannerModal, setDeleteBannerModal] = useState(false)
    const [deleteBannerId, setDeleteBannerId] = useState()

    // state for show banner images
    const [openBannerModal, setOpenBannerModal] = useState(false)
    const [showBannerImages, setShowBannerImages] = useState()

    const inputRef = useRef()

    const dispatch = useDispatch();
    const { bannerDetail, message, error } = useSelector(state => state.banner);

    const addBannerFnc = (e) => {
        e.preventDefault()

        const form = new FormData();
        form.append('bannerTitle', bannerTitle);
        form.append('computerBannerImage', computerBanner)
        form.append('mobileBannerImage', mobileBanner)

        dispatch(addBanner(form))

        if (bannerTitle && computerBanner && mobileBanner) {
            setComputerBanner()
            setMobileBanner()
            inputRef.current.reset()
        }
    }

    const deleteBannerFnc = () => {
        dispatch(deleteBanner(deleteBannerId))
        setDeleteBannerModal(false)
    }

    const editBannerShowFnc = (bannerValue) => {
        const updatedBanner = { ...bannerValue, show: !bannerValue.show }
        dispatch(editBanner(updatedBanner))
    }

    useEffect(() => {
        if (message)
            dispatch(getBanner())
    }, [message])

    // console.log(addBannerForm, new Date().getSeconds())

    return (
        <>
            <Navbar />
            <div className="banner-main-box">
                <SideBar />

                <div className="banner-box">
                    <div className="banner-first-box">
                        <h3>Banner</h3>
                        <button className="banner-first-box-add-button" onClick={() => setAddBannerForm(true)}>
                            <MdAdd style={{ marginRight: '5px' }} />
                            Add Banner
                        </button>
                    </div>

                    {/* --- form for add banner start */}
                    {
                        addBannerForm &&
                        <form className="banner-form-box" onSubmit={addBannerFnc} ref={inputRef}>
                            <div className="banner-input-box">
                                <label className="banner-label">Title</label>
                                <input type="text" placeholder="Banner Title" className="form-control" onChange={(e) => setBannerTitle(e.target.value)} required />
                            </div>

                            <div className="banner-image-select-box">
                                <div className="banner-computer-image">
                                    <label className="banner-label">Computer Banner</label>
                                    <input type="file" accept="image/*" className="form-control" onChange={(e) => setComputerBanner(e.target.files[0])} />
                                </div>

                                <div className="banner-phone-image">
                                    <label className="banner-label">Phone Banner</label>
                                    <input type="file" accept="image/*" className="form-control" onChange={(e) => setMobileBanner(e.target.files[0])} />
                                </div>
                            </div>

                            <button className="banner-cancel-button" onClick={() => setAddBannerForm(false)} >Cancel</button>
                            <button className="banner-add-button" type="submit" >Submit</button>
                        </form>
                    }
                    {/* form for add banner end --- */}

                    <div className="banner-second-box">
                        <h3>All Banner List <span style={{ backgroundColor: '#dee2e6', padding: '0px 5px', fontSize: '14px' }}>{bannerDetail?.length}</span></h3>
                    </div>

                    {/* --- table for show banners_detail start */}
                    <div className="banner-third-box">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th className="banner-react-table-th">S.no</th>
                                    <th className="banner-react-table-th">Title</th>
                                    <th className="banner-react-table-th">Status</th>
                                    <th className="banner-react-table-th">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bannerDetail.length > 0 && bannerDetail.map((value, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}.</td>
                                                <td style={{ width: "100%" }} onClick={() => {
                                                    setShowBannerImages(value)
                                                    setOpenBannerModal(true)
                                                }}>
                                                    {value.bannerTitle}
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <Form>
                                                        <Form.Check
                                                            type="switch"
                                                            checked={value.show}
                                                            onChange={() => editBannerShowFnc(value)}
                                                        />
                                                    </Form>
                                                </td>
                                                <td style={{ textAlign: "center" }}>
                                                    <MdDelete onClick={() => {
                                                        setDeleteBannerId(value._id)
                                                        setDeleteBannerModal(true)
                                                    }} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                    {/* table for show banners_detail end --- */}
                </div>

                {/* calling ErrorHandle() function component to show alert */}
                {
                    <ErrorHandle message={message} error={error} removeAction={bannerMessageAndErrorRemove} />
                }

            </div>


            {/* --- modal for delete banner start */}
            <Modal open={deleteBannerModal}>
                <Box className="category-modal-box">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are Your Sure
                    </Typography>
                    <Box className="category-modal-button">
                        <Button variant="outlined" onClick={() => setDeleteBannerModal(false)} style={{ marginRight: '5px' }}>No</Button>
                        <Button variant="contained" onClick={deleteBannerFnc}>Yes</Button>
                    </Box>
                </Box>
            </Modal>
            {/* modal for delete banner end --- */}


            {/* --- modal for show banner_images start */}
            <Modals
                state={openBannerModal}
                title="Banner Collection"
                button_1="Exit"
                size="lg"
                cancelFnc={() => setOpenBannerModal(false)}
            >
                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Computer Banner</h4>
                <img src={giveMeBannerImages(showBannerImages?.computerBannerImage)} className="banner-modalshow-image" alt="image not found" />

                <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Mobile Banner</h4>
                <img src={giveMeBannerImages(showBannerImages?.mobileBannerImage)} className="banner-modalshow-image" alt="image not found" />
            </Modals>
            {/* modal for show banner_images end --- */}

        </>
    )
}

export default Banner