import React, { useEffect, useState } from "react";
import axios from "axios";
import Payments from "./Payments";

export default function PaymentsContainer() {

    const myHeaders = new Headers({
        "Content-Type": "application/json",
    });

    /*  Set up some hooks to store state */
    const [paymentData, setPaymentData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [nextPageIndex, setNextPageIndex] = useState('')
    const [paymentStatus, setPaymentStatus] = useState('1');

    /* Handle the payment type radio button click and save to state */
    const handlePaymentTypeClicked = (val) => {
        setPaymentStatus(val)
    }

    /* Handle the load more button click and save to state */
    const handleLoadMoreClick = (val) => {
        setNextPageIndex(val);
    }

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        /* Check whether a page has been requested, if so add the param to the url */
        let page = nextPageIndex ? `?pageIndex=${nextPageIndex}` : '';
        let url = 'http://localhost:9001/api/payments' + page; 
        
        const fetchData = async () => {
            try {
                const response = await axios.get(url, { myHeaders })
                setPaymentData(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsError(true)
            }
        }
        
        fetchData();
    }, [nextPageIndex]); // Only fetches data if the page index changes

    if (isError) {
        return <div>Something went wrong ...</div>
    }

    if (isLoading) {
        return <div>Loading ...</div>
    } else {
        return <Payments
            payments={paymentData}
            isLoading={isLoading}
            paymentStatus={paymentStatus}
            controlFunc={handleLoadMoreClick}
            statusControlFunc={handlePaymentTypeClicked} />
    }

}