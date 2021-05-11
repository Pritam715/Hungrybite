import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { retrive, create, BASE_URL } from '../../config/service';
import { Toast } from '../../custom/toast';
export default function Product() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editshow, seteditShow] = useState(false);
    const handleeditClose = () => seteditShow(false);
    const handleeditShow = (e) => {
        editProduct(e.target.id);
        seteditShow(true);
    };




    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [short_description, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [category_id, setCategoryId] = useState('');

    const [product_id, setProductId] = useState('');
    // const [image, setImage] = useState({ preview: "", raw: "" });
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');

    const [category, setCategory] = useState('');

    const [product, setProduct] = useState([]);

    const onDelete = (e) => {
        deleteProduct(e.target.id);
    }


    //Category
    const getCategory = async () => {
        let response = await retrive('/category/index');
        setCategory(response.data.category);
    }



    const getProduct = async () => {
        let response = await retrive('/product/index');
        setProduct(response.data.product);
    }


    //Delete
    const deleteProduct = async (id) => {
        let response = await retrive(`/product/${id}/delete`);
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
            getProduct();
        } else {
            alert('Data not Deleted');
        }
    }
    //edit
    const editProduct = async (id) => {
        setProductId(id);
        let response = await retrive(`/product/${id}/edit`);
        console.log(response);
        setName(response.data.product.name);
        setPrice(response.data.product.price);
        setDescription(response.data.product.description);
        setShortDescription(response.data.product.short_description);
        setCategoryId(response.data.product.category_id);
        setImage(response.data.image);

    }
    useEffect(() => {
        getProduct();
        getCategory();



    }, []);

    const handleImage = e => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (e) => {
                setPreview(e.target.result);
                setImage(e.target.result);
            };

        }
    };
    // const handleImage = e => {
    //     if (e.target.files[0]) {
    //         setImage(e.target.files[0]);
    //     }
    // };

    const handleSubmit = async e => {
        e.preventDefault();

        console.log(image);


        const data = {
            'name': name,
            'category_id': category_id,
            'price': price,
            'short_description': short_description,
            'description': description,
            'image': image,

        }
        console.log(data);
        // window.localStorage.removeItem("user-info");
        // window.localStorage.removeItem("token");

        let response = await create('/product/store', data);
        console.log(response);
        // console.log(response.data);
        if (response.data.message === 'success') {
            getProduct();
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
            Toast.fire({
                icon: 'warning',
                title: 'Data Stored Failed!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            });
        }
    }



    //Edit Submit

    const handleEditSubmit = async e => {
        e.preventDefault();

        console.log(image);


        const data = {
            'name': name,
            'category_id': category_id,
            'price': price,
            'short_description': short_description,
            'description': description,
            'image': image,

        }
        console.log(data);
        // window.localStorage.removeItem("user-info");
        // window.localStorage.removeItem("token");

        let response = await create(`/product/${product_id}/update`, data);
        console.log(response);
        // console.log(response.data);
        if (response.data.message === 'success') {
            getProduct();
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
            Toast.fire({
                icon: 'warning',
                title: 'Data Stored Failed!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            });
        }
    }



    return (
        <div className="content-wrapper">

            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Products</h1>
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
                                <th>Image</th>
                                <th>Price</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.length > 0 ? product.map((p, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{p.name}</td>
                                            <td><img src={`/Images/Products/${p.image}`} width={100}></img></td>
                                            <td>{p.price}</td>
                                            <td td > <i id={p.id} onClick={handleeditShow} className="fa fa-edit" style={{ color: 'green' }}></i>
                                                <i onClick={e => {
                                                    var r = confirm("Are you sure?");
                                                    if (r == true) {
                                                        return onDelete(e);
                                                    }

                                                }

                                                } id={p.id} className="fa fa-trash" style={{ color: 'red', marginLeft: 20 }}></i>

                                            </td>

                                        </tr>
                                    );
                                }) : <tr><td colSpan="5">No Data Available</td></tr>
                            }



                        </tbody>

                    </table>
                </div>

            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Product Name:</label>
                                    <input type="text" className="form-control" autoFocus={true} onChange={e => setName(e.target.value)} placeholder="Enter Product Name" required></input>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Product Category:</label>
                                    <select className="form-control" onChange={e => setCategoryId(e.target.options[e.target.selectedIndex].value)}>

                                        <option value="0" selected={true} disabled>Select Category Name</option>
                                        {
                                            category.length > 0 ? category.map((category, index) => {

                                                return (

                                                    <option value={category.id} key={index}>{category.name}</option>
                                                );

                                            }) : <option value="0">Category</option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Short Description:</label>
                                    <textarea className="form-control" onChange={e => setShortDescription(e.target.value)} rows={2} ></textarea>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea className="form-control" onChange={e => setDescription(e.target.value)} rows={5} ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Product Price:</label>
                                    <input type="integer" className="form-control" autoFocus={true} onChange={e => setPrice(e.target.value)} placeholder="Enter Product Name" required></input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Image:</label>
                                    <input type="file" className="form-control" autoFocus={true} onChange={handleImage} placeholder="Enter Product Name" required></input>
                                </div>
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <Button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</Button>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    {preview &&
                                        <img src={preview} alt="dummy" width="50" height="50" />}
                                </div>
                            </div>
                        </div>


                    </form >
                </Modal.Body>

            </Modal>



            <Modal show={editshow} onHide={handleeditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Product Name:</label>
                                    <input type="text" className="form-control" autoFocus={true} value={name} onChange={e => setName(e.target.value)}></input>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Product Category:</label>
                                    <select className="form-control" value={category_id} onChange={e => setCategoryId(e.target.options[e.target.selectedIndex].value)}>

                                        <option value="0" selected={true} disabled>Select Category Name</option>
                                        {
                                            category.length > 0 ? category.map((category, index) => {

                                                return (

                                                    <option value={category.id} key={index} > { category.name}</option>
                                                );

                                            }) : <option value="0">Category</option>
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Short Description:</label>
                                    <textarea className="form-control" value={short_description} onChange={e => setShortDescription(e.target.value)} rows={2} ></textarea>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} rows={5} ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Product Price:</label>
                                    <input type="integer" className="form-control" value={price} autoFocus={true} onChange={e => setPrice(e.target.value)} placeholder="Enter Product Name" ></input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Image:</label>
                                    <input type="file" className="form-control" autoFocus={true} onChange={handleImage} ></input>
                                </div>
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <Button type="submit" onClick={handleEditSubmit} className="btn btn-primary">Submit</Button>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    {preview &&
                                        <img src={preview} alt="dummy" width="50" height="50" />}
                                </div>
                            </div>
                        </div>


                    </form >
                </Modal.Body>

            </Modal>






        </div >



    )
}
