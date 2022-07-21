import React, { useEffect, useState } from "react";
import ModalContribute from "../Contribute/Contribute";
import { BookContext } from '../../Context/BookContext';
import { useParams } from "react-router-dom";
import axios from "axios";

import { useMoralis } from "react-moralis";


function BookDetail() {

    const params = useParams();
    const { isAuthenticated, isInitialized } = useMoralis()

    const bookContext = React.useContext(BookContext);
    const { getBookDetails, bookDetails, data, Image, pdf } = bookContext;
    const [bookData,setBookData]=useState([]);


    useEffect(()=>{
        var array=[];
        const dd =   data && data.map((e)=>{
          if(e.category == "Book"){ 
            array.push(e); 
          }
      });
      setBookData(array); 
     
    },[data]) 

    useEffect(() => {
        getBookDetails(params)
    }, [isAuthenticated, isInitialized])


   console.log(bookDetails.walletAddress); 

   
    return (
        <>
            <div className="container-fluid row">
                <div className="col-12 book-details-tag">
                    <h3>{bookDetails.name}</h3>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-4 particular-book-img">
                            <img src={bookDetails.coverPicture}></img>
                        </div>
                        <div className="col-4">
                            <p className="particular-book-text" >{bookDetails.description}   </p>
                        </div>
                      {/* { 
                           bookData && bookData.map((e) => {

   return   ( */}
                        <div className="col-4 view-and-download-btn">
                        <div className="row view-btn-row">
                        <a href={bookDetails.website}>  
                            <button className="btn btn-info my-2 viewonline-btn my-sm-0 offset-4" type="submit">View Website</button>
                            </a>
                        </div>

                        <div className="row view-btn-row">
                        <a href={pdf}>  
                            <button className="btn btn-info my-2 viewonline-btn my-sm-0 offset-4" type="submit">View File</button>
                            </a>


                        </div>
                    </div>
                    {/* )
                        }) */}
            {/* } */}

                        <div className="under-line col-12"></div>
                        <div className="col-12">
                            <ModalContribute walletAddress={bookDetails.walletAddress}></ModalContribute>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default BookDetail