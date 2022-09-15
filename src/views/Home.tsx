import React from "react";
import NavBar from "../components/Bars/NavBar";

export default function (){

    return (
        <div>
            <NavBar />
            <div className="d-flex mt-4 mb-4" style={{flexWrap: "wrap"}}>
                
                <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                    <div className="card bg-success">
                        <div className="card-body d-flex justify-content-start">
                            <i className="bi bi-archive text-white" style={{fontSize: "3rem"}} />
                            <h5 
                                className="card-title text-white ml-3" 
                                style={{
                                    fontSize: "3rem", 
                                    marginTop: "auto", 
                                    marginBottom: "auto"
                                }}
                            >
                                Boxes
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                    <div className="card bg-primary">
                        <div className="card-body d-flex justify-content-start">
                            <i className="bi bi-archive text-white" style={{fontSize: "3rem"}} />
                            <h5 className="card-title text-white ml-3" style={{fontSize: "3rem", marginTop: "auto", marginBottom: "auto"}}>Boxes</h5>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                    <div className="card bg-danger">
                        <div className="card-body d-flex justify-content-start">
                            <i className="bi bi-archive text-white" style={{fontSize: "3rem"}} />
                            <h5 className="card-title text-white ml-3" style={{fontSize: "3rem", marginTop: "auto", marginBottom: "auto"}}>Boxes</h5>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                    <div className="card bg-warning">
                        <div className="card-body d-flex justify-content-start">
                            <i className="bi bi-archive" style={{fontSize: "3rem"}} />
                            <h5 className="card-title ml-3" style={{fontSize: "3rem", marginTop: "auto", marginBottom: "auto"}}>Boxes</h5>
                        </div>
                    </div>
                </div>

            </div>

            <div className="container pb-3">
                <div className="input-group">
                    <input type="text" placeholder="Search Item" className="form-control form-control-lg" />
                </div>
            </div>
        </div>
    );

};