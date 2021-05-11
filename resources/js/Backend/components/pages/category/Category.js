import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { retrive, create, BASE_URL } from '../../config/service';
import { Toast } from '../../custom/toast';

export default function Category() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editshow, seteditShow] = useState(false);
    const handleeditClose = () => seteditShow(false);
    const handleeditShow = (e) => {
        editCategory(e.target.id);
        seteditShow(true);
    };


    const onDelete = (e) => {
        deleteCategory(e.target.id);
    }


    const [name, setName] = useState('');
    const [category, setCategory] = useState([]);
    const [categoryid, setCategoryId] = useState('');


    const getCategory = async () => {
        let response = await retrive('/category/index');
        console.log(response);
        setCategory(response.data.category);
    }


    //edit
    const editCategory = async (id) => {
        setCategoryId(id);
        let response = await retrive(`/category/${id}/edit`);
        console.log(response);
        setName(response.data.category.name);

    }

    //update
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const data = {
            'name': name,

        }

        let response = await create(`/category/${categoryid}/update`, { data });
        if (response.data.message === 'success') {
            getCategory();
            Toast.fire({
                icon: 'success',
                title: 'Data Update SuccessFully!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            });
            handleeditClose();
        } else {
            alert('Data not updated');
        }
    }


    //delete
    const deleteCategory = async (id) => {
        let response = await retrive(`/category/${id}/delete`);
        if (response.data.message === 'success') {
            Toast.fire({
                icon: 'warning',
                title: 'Data Deleted SuccessFully!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            })
            getCategory();
        } else {
            alert('Data not Deleted');
        }
    }

    useEffect(() => {
        getCategory();
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            'name': name,
        }
        // window.localStorage.removeItem("user-info");
        // window.localStorage.removeItem("token");

        let response = await create('/category/store', { data });
        console.log(response);
        if (response.data.message === 'success') {
            getCategory();
            handleClose();
            Toast.fire({
                icon: 'success',
                title: 'Data Stored SuccessFully!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            })

        } else {
            alert('Data not created');
        }
    }





    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Category</h1>
                        </div>

                    </div>
                </div>
            </section>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title"> <Button className="btn btn-primary" onClick={handleShow}><i className="fa fa-plus"></i>Add</Button></h3>
                </div>

                <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Action</th>


                            </tr>
                        </thead>
                        <tbody>
                            {
                                category.length > 0 ? category.map((c, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{c.name}</td>
                                            <td><i id={c.id} onClick={handleeditShow} className="fa fa-edit" style={{ color: 'green' }}></i>
                                                <i onClick={e => {
                                                    var r = confirm("Are you sure?");
                                                    if (r == true) {
                                                        return onDelete(e);
                                                    }

                                                }

                                                } id={c.id} className="fa fa-trash" style={{ color: 'red', marginLeft: 20 }}></i>

                                            </td>

                                        </tr>
                                    );
                                }) : <tr><td colSpan="3">No Data Available</td></tr>
                            }


                        </tbody>

                    </table>
                </div>

            </div>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="form-group">
                            <label >Name:</label>
                            <input type="text" className="form-control" autoFocus={true} onChange={e => setName(e.target.value)} placeholder="Enter CategoryName" required></input>
                        </div>
                        <div className="form-group">
                            <Button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</Button>
                        </div>

                    </form >
                </Modal.Body>

            </Modal>


            <Modal show={editshow} onHide={handleeditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label >Category Name:</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required></input>
                        </div>
                        <div className="form-group">
                            <Button type="submit" onClick={handleEditSubmit} className="btn btn-primary">Submit</Button>
                        </div>

                    </form>
                </Modal.Body>

            </Modal>


        </div >

    );
}
