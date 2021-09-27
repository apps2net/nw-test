
import React from "react";
import {document, render, screen, cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer'
import '@testing-library/jest-dom'
import Payments from '../Payments';

/**
 * @jest-environment jsdom
 */


describe('Payments Table Test', () => {

	const paymentData = {
		"results": [{ "paymentAmount": "558.52", "paymentCurrency": "GBP", "paymentType": "FASTER", "paymentDate": "24-Sep-2021", "paymentStatus": "P", 
		"toAccount": { "accountName": "Investment Account", "sortCode": "381692", "accountNumber": "63385533" }, 
		"fromAccount": { "accountName": "Checking Account", "sortCode": "521698", "accountNumber": "09189790" } }, 
		{ "paymentAmount": "157.79", "paymentCurrency": "GBP", "paymentType": "FASTER", "paymentDate": "24-Sep-2021", "paymentStatus": "C", 
		"toAccount": { "accountName": "Investment Account", "sortCode": "374903", "accountNumber": "55339636" }, "fromAccount": { "accountName": "Credit Card Account", "sortCode": "775809", "accountNumber": "19862324" } }
		], "metaData": { "hasMoreElements": true, "nextPageIndex": "qJGSEcKL" }
	};

	const controlFunc = (val) => {
        console.log(val)
    }


	// Applies only to tests in this describe block
	beforeEach(() => {
		return;
	});

	afterEach(() => {
		cleanup();
	})

	test(' has a valid snapshot', () => { 
		const component = renderer.create( <Payments
            payments={paymentData}
            isLoading={false}
            paymentStatus={'1'}
            controlFunc={controlFunc}
            statusControlFunc={controlFunc} /> ); 
		let tree = component.toJSON(); 
		expect( tree).toMatchSnapshot(); 
	});


	test('should render Payments component', () => {
		render(
			<Payments
            payments={paymentData}
            isLoading={false}
            paymentStatus={'1'}
            controlFunc={controlFunc}
            statusControlFunc={controlFunc} />				
			)

			/*  Check the load more button is there */
			expect(screen.getByText('Load more')).toBeInTheDocument();
			/* Check the account number is listed */
			expect(screen.getByText(/55339636/)).toBeInTheDocument();
			/* Check for two rows plus the header */
			expect(screen.getAllByRole('row')).toHaveLength(3)
	});

});