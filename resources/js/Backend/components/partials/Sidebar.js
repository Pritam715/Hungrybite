import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Category from '../pages/category/Category';
import Product from '../pages/products/Product';
import NotFound from '../pages/notfound/NotFound';
import { Image } from 'react-bootstrap';


export default function Sidebar() {



  return (
    <>

  
      <aside className="main-sidebar sidebar-dark-primary elevation-4">

        <a href="index3.html" className="brand-link">
          <Image src="/Backend/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: .8}} />
          <span className="brand-text font-weight-light">HungerBite</span>
        </a>


        <div className="sidebar">

          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <Image src="/Backend/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">Admin</a>
            </div>
          </div>

          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>
                    Dashboard
             
                  </p>
                </Link>
              </li>

              <li className="nav-item ">
                <Link to="/admin/category" className="nav-link">
                  <i className="nav-icon fas fa-th"></i> <p>Category</p>
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/admin/products" className="nav-link">
                  <i className="nav-icon fas fa-inventory"></i> <p>Products</p>
                </Link>
              </li>

            </ul>
          </nav>

        </div>

      </aside>

      <Switch>
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/category" component={Category} />
        <Route path="/admin/products" component={Product} />

      </Switch>

    </>
  );
}
