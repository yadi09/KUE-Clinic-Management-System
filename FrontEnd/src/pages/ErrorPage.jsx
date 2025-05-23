import React, { Component } from "react";
import { Link } from "react-router-dom";

export class ErrorPageContainer extends Component {
    render() {
        return (
            <div>
                <section className="page_404">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="col-sm-10 col-sm-offset-1  text-center">
                                    <div className="four_zero_four_bg">
                                        <h1 className="text-center ">404 ERROR</h1>
                                    </div>
                                    <div className="contentBox">
                                        <h3 className="h2">Something Went Wrong..!</h3>
                                        <p>The page Not Available!</p>
                                        <Link to="/" className="link_404">
                                            Go to Home
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ErrorPageContainer;