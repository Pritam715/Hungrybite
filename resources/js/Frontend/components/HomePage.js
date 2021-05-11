// import { indexOf } from 'lodash-es';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Image } from 'react-bootstrap';
import { retriveData, FRONT_URL } from '../../Backend/components/config/service';
import { Toast } from '../../Backend/components/custom/toast';
export default function HomePage() {



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        getMenuData(e.target.id);
        setShow(true);
    }

    const [categories, setCategory] = useState([]);
    const [menu, setGetMenu] = useState([]);
    const [menudata, setGetMenuData] = useState([]);
    const [categoryId, setGetCategoryId] = useState('');


    const [product_id, setProductId] = useState('');
    const [product_name, setProductName] = useState('');
    const [product_category_id, setProductCategoryId] = useState('');
    const [product_short_description, setProductShortDescription] = useState('');
    const [product_description, setProductDescription] = useState('');
    const [product_price, setProductPrice] = useState('');
    const [product_image, setProductImage] = useState('');
    const [product_slug, setProductSlug] = useState('');

    const [quantity, setQuantity] = useState(1);

    const [cartdata, setCartData] = useState([]);

    //
    const getCategoryId = (e) => {
        getMenu(e.target.id);
    }



    //getAllMenu
    // const getAllMenu = async () => {

    //     let response = await retriveData('/all-menu');
    //     console.log(response);
    //     setGetAllMenu(response.data.allmenu);
    // }

    //getMenu
    const getMenu = async (id) => {
        setGetCategoryId(id);
        let response = await retriveData(`/get/${id}/menu`);
        console.log(response);
        setGetMenu(response.data.menu);
    }


    //getMenuData
    const getMenuData = async (id) => {
        // setGetCategoryId(id);
        let response = await retriveData(`/menu/${id}/data`);
        // console.log(response);
        setProductId(response.data.menudata.id);
        setProductName(response.data.menudata.name);
        setProductSlug(response.data.menudata.slug);
        setProductCategoryId(response.data.menudata.category_id);
        setProductShortDescription(response.data.menudata.short_description)
        setProductDescription(response.data.menudata.description)
        setProductPrice(response.data.menudata.price)
        setProductImage(response.data.menudata.image)
    }

    const getCategory = async () => {
        let response = await retriveData('/category');
        // console.log(response);
        setCategory(response.data.category);
    }
    useEffect(() => {
        getCategory();
        getMenu(0);


    }, []);
    useEffect(() => {        //getting list of employees who should be selected
        console.log(cartdata);//this will output 2 on the next component render 
    }, [cartdata]);


    //Quantity Increment and Decrement
    const increment = () => {

        quantity <= 4 ?
            setQuantity(quantity => quantity + 1)
            :
            setQuantity(quantity);

    }

    const decrement = () => {

        quantity >= 2 ?
            setQuantity(quantity => quantity - 1)
            :
            setQuantity(quantity);

    }

    //Add To Cart
    const handleSubmit = async e => {
        e.preventDefault();
        setCartData(prevItems => [...prevItems, {
            product_id: product_id,
            product_name: product_name,
            product_price: product_price,
            product_category_id: product_category_id,
            product_description: product_description,
            product_slug: product_slug,
            product_quantity: quantity,

        }]);





        // const cartdata = [];
        // cartdata.push(data),
        // window.localStorage.removeItem("user-info");
        // window.localStorage.removeItem("token");

        const cart = localStorage.setItem("cart-info", JSON.stringify(cartdata));
        // const cart = JSON.parse(localStorage.getItem('cart-info'));
        // console.log(cart);

        // localStorage.setItem("cart-quantity-info", JSON.stringify(quantity));

        if (cartdata) {
            handleClose();
            Toast.fire({
                icon: 'success',
                title: 'Added to Cart SuccessFully!',
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






    const details =
    {
        height: 200,
        backgroundColor: 'white',



    }



    return (
        <div>

            <div id="slides" className="cover-slides">
                <ul className="slides-container">
                    <li className="text-left">
                        <img src="Frontend/images/slider-01.jpg" alt="" />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="m-b-20"><strong>Welcome To <br></br> Live Dinner Restaurant</strong></h1>
                                    <p className="m-b-40">See how your users experience your website in realtime or view  <br></br>
							trends to see any changes in performance over time.</p>
                                    <p><a className="btn btn-lg btn-circle btn-outline-new-white" href="#">Reservation</a></p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="text-left">
                        <img src="Frontend/images/slider-02.jpg" alt="" />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="m-b-20"><strong>Welcome To <br></br> Live Dinner Restaurant</strong></h1>
                                    <p className="m-b-40">See how your users experience your website in realtime or view  <br></br>
							trends to see any changes in performance over time.</p>
                                    <p><a className="btn btn-lg btn-circle btn-outline-new-white" href="#">Reservation</a></p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="text-left">
                        <img src="Frontend/images/slider-03.jpg" alt="" />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h1 className="m-b-20"><strong>Welcome To <br></br> Yamifood Restaurant</strong></h1>
                                    <p className="m-b-40">See how your users experience your website in realtime or view  <br></br>
							trends to see any changes in performance over time.</p>
                                    <p><a className="btn btn-lg btn-circle btn-outline-new-white" href="#">Reservation</a></p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className="slides-navigation">
                    <a href="#" className="next"><i className="fa fa-angle-right" aria-hidden="true"></i></a>
                    <a href="#" className="prev"><i className="fa fa-angle-left" aria-hidden="true"></i></a>
                </div>
            </div>


            <div className="about-section-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 text-center">
                            <div className="inner-column">
                                <h1>Welcome To <span>Live Dinner Restaurant</span></h1>
                                <h4>Little Story</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor suscipit feugiat. Ut at pellentesque ante, sed convallis arcu. Nullam facilisis, eros in eleifend luctus, odio ante sodales augue, eget lacinia lectus erat et sem. </p>
                                <p>Sed semper orci sit amet porta placerat. Etiam quis finibus eros. Sed aliquam metus lorem, a pellentesque tellus pretium a. Nulla placerat elit in justo vestibulum, et maximus sem pulvinar.</p>
                                <a className="btn btn-lg btn-circle btn-outline-new-white" href="#">Reservation</a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <img src="Frontend/images/about-img.jpg" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="qt-box qt-background">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ml-auto mr-auto text-center">
                            <p className="lead ">
                                " If you're not the one cooking, stay out of the way and compliment the chef. "
					</p>
                            <span className="lead">Michael Strahan</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="menu-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-title text-center">
                                <h2>Special Menu</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            </div>
                        </div>
                    </div>

                    <div className="row inner-menu-box">
                        <div className="col-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <span className={"nav-link " + (categoryId == 0 ? 'active' : '')} id={0} onClick={e => getCategoryId(e)}>All</span>
                                {
                                    categories.length > 0 ? categories.map((c, index) => {

                                        return (
                                            <span className={"nav-link " + (categoryId == c.id ? 'active' : '')} key={index} id={c.id} onClick={e => getCategoryId(e)}>{c.name}</span>

                                        );
                                    })
                                        : <p></p>
                                }
                            </div>
                        </div>

                        <div className="col-9">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                    <div className="row">







                                        {
                                            menu.length > 0 ? menu.map((m, index) => {

                                                return (
                                                    <div className="col-lg-4 col-md-6 special-grid drinks" key={index}>
                                                        <div className="gallery-single fix">
                                                            <Image src={`/Images/Products/${m.image}`} className="img-fluid" alt="Image" />
                                                            <div className="why-text">
                                                                <h4>{m.name}</h4>
                                                                <p></p>

                                                                <h5>Rs:{m.price}</h5>
                                                                <span className="form-control btn" id={m.id} onClick={handleShow} style={{ backgroundColor: '#d65106', color: 'white', borderRadius: 10, justifyContent: 'center', border: 'black', cursor: 'pointer' }}>View</span>










                                                            </div>
                                                        </div>
                                                    </div>


                                                );
                                            })
                                                : <p></p>
                                        }



                                        <Modal show={show} onHide={handleClose}>

                                            <Modal.Body style={{ height: 600 }}>
                                                <div className="image">
                                                    <Image src={`/Images/Products/${product_image}`} style={{ width: '100%', height: 300 }} />
                                                    <div style={details}>
                                                        <div style={{ padding: 10 }}>
                                                            <h2 style={{ color: '#d65106', fontWeight: 'bold' }}>{product_name}</h2>

                                                            <p>{product_description}</p>
                                                            <hr></hr>
                                                            <p style={{ color: '#d65106' }}>Rs: <strong>{product_price}</strong></p>
                                                            <hr></hr>
                                                            <div className="row">
                                                                <form>
                                                                    <div className="col-md-12" style={{ display: 'flex' }}>
                                                                        <div className="form-group" style={{ color: '#d65106' }}>
                                                                            <label><strong>Quantity: </strong>  </label>
                                                                            <span style={{ padding: 8 }}> <i className="fa fa-plus" onClick={increment}></i></span>
                                                                            <input type="number" min={1} max={5} value={quantity} onChange={e => setQuantity(e.target.value)} style={{ width: 40 }}></input>
                                                                            <input type="hidden" value={product_id} onChange={e => setProductId(e.target.value)}></input>
                                                                            <input type="hidden" value={product_name} onChange={e => setProductName(e.target.value)}></input>
                                                                            <input type="hidden" value={product_slug} onChange={e => setProductSlug(e.target.value)}></input>
                                                                            <input type="hidden" value={product_price} onChange={e => setProductPrice(e.target.value)}></input>
                                                                            <input type="hidden" value={product_description} onChange={e => setProductDescription(e.target.value)}></input>
                                                                            <input type="hidden" value={product_category_id} onChange={e => setProductCategoryId(e.target.value)}></input>



                                                                            <span style={{ padding: 8 }}><i className="fa fa-minus" onClick={decrement}></i></span>

                                                                        </div>
                                                                        <div className="form-group" style={{ marginLeft: 150 }}>
                                                                            <Button className="btn-md" type="submit" style={{ backgroundColor: '#d65106', border: 'black', justifyItems: 'end' }} onClick={handleSubmit}  ><i className="fa fa-plus"> Cart </i></Button>

                                                                        </div>


                                                                    </div>

                                                                </form>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                            </Modal.Body>

                                        </Modal>












                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="gallery-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-title text-center">
                                <h2>Gallery</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            </div>
                        </div>
                    </div>
                    <div className="tz-gallery">
                        <div className="row">
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-01.jpg">
                                    <img className="img-fluid" src="Frontend/images/gallery-img-01.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-02.jpg">
                                    <img className="img-fluid" src="Frontend/images/gallery-img-02.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-03.jpg">
                                    <img className="img-fluid" src="Frontend/images/gallery-img-03.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-04.jpg">
                                    <img className="img-fluid" src="Frontend/images/gallery-img-04.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-05.jpg">
                                    <img className="img-fluid" src="Frontend/images/gallery-img-05.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-4 col-lg-4">
                                <a className="lightbox" href="images/gallery-img-06.jpg">
                                    <img className="img-fluid" src="Frontend/images/gallery-img-06.jpg" alt="Gallery Images" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="customer-reviews-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading-title text-center">
                                <h2>Customer Reviews</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 mr-auto ml-auto text-center">
                            <div id="reviews" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner mt-4">
                                    <div className="carousel-item text-center active">
                                        <div className="img-box p-1 border rounded-circle m-auto">
                                            <img className="d-block w-100 rounded-circle" src="Frontend/images/quotations-button.png" alt="" />
                                        </div>
                                        <h5 className="mt-4 mb-0"><strong className="text-warning text-uppercase">Paul Mitchel</strong></h5>
                                        <h6 className="text-dark m-0">Web Developer</h6>
                                        <p className="m-0 pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
                                    </div>
                                    <div className="carousel-item text-center">
                                        <div className="img-box p-1 border rounded-circle m-auto">
                                            <img className="d-block w-100 rounded-circle" src="Frontend/images/quotations-button.png" alt="" />
                                        </div>
                                        <h5 className="mt-4 mb-0"><strong className="text-warning text-uppercase">Steve Fonsi</strong></h5>
                                        <h6 className="text-dark m-0">Web Designer</h6>
                                        <p className="m-0 pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
                                    </div>
                                    <div className="carousel-item text-center">
                                        <div className="img-box p-1 border rounded-circle m-auto">
                                            <img className="d-block w-100 rounded-circle" src="Frontend/images/quotations-button.png" alt="" />
                                        </div>
                                        <h5 className="mt-4 mb-0"><strong className="text-warning text-uppercase">Daniel vebar</strong></h5>
                                        <h6 className="text-dark m-0">Seo Analyst</h6>
                                        <p className="m-0 pt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#reviews" role="button" data-slide="prev">
                                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#reviews" role="button" data-slide="next">
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="contact-imfo-box">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 arrow-right">
                            <i className="fa fa-volume-control-phone"></i>
                            <div className="overflow-hidden">
                                <h4>Phone</h4>
                                <p className="lead">
                                    +01 123-456-4590
						</p>
                            </div>
                        </div>
                        <div className="col-md-4 arrow-right">
                            <i className="fa fa-envelope"></i>
                            <div className="overflow-hidden">
                                <h4>Email</h4>
                                <p className="lead">
                                    yourmail@gmail.com
						</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <i className="fa fa-map-marker"></i>
                            <div className="overflow-hidden">
                                <h4>Location</h4>
                                <p className="lead">
                                    800, Lorem Street, US
						</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div >


    )
}
