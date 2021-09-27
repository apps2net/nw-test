import React from "react"
import PropTypes from 'prop-types';
import { Table, ButtonGroup, Button, ToggleButton } from "react-bootstrap";

const Payments = (props) => {

    const { payments, isLoading, paymentStatus, controlFunc, statusControlFunc } = props;

    const radios = [
        { value: '1', name: 'All' },
        { value: 'A', name: 'Approved' },
        { value: 'C', name: 'Cancelled' },
        { value: 'P', name: 'Pending' },
    ];

    /* Converts above array to an object for mapping status code to display string */
    function objectify(array) {
        return array.reduce(function(result, currentArray) {
            result[currentArray.value] = currentArray.name;
            return result;
        }, {});
    }
    
    const paymentStatusObj = (objectify(radios));
    
    /* Define a style for the heading - just an alternative to using app.css*/
    const h1Style = {
        color: 'blue',
        fontSize: '2rem'
        
      };

    return (
        <React.Fragment>
            <div role="main">
            <h1 style={h1Style}>Payment Listing</h1>
            <div>
                <ButtonGroup className="mb-2">
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={radio.value}
                            checked={paymentStatus === radio.value}
                            onChange={(e) => statusControlFunc(e.currentTarget.value)}
                        >
                            {radio.name}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </div>
            <div>
                <Table id="payments-table" data-testid="payments-table" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Type</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.results && (
                            payments.results.map((payment, index) => {
                                if (paymentStatus === '1' || payment.paymentStatus === paymentStatus) {
                                    return (
                                        <tr key={"payment-" + index} data-testid="payments-row">
                                            <td>{payment.paymentAmount}</td>
                                            <td>{payment.paymentCurrency}</td>
                                            <td>{payment.paymentDate}</td>
                                            <td>{paymentStatusObj[payment.paymentStatus]}</td>
                                            <td>{payment.paymentType}</td>
                                            <td>{payment.fromAccount.accountName}<br />{payment.fromAccount.accountNumber} - {payment.fromAccount.sortCode}</td>
                                            <td>{payment.toAccount.accountName}<br />{payment.toAccount.accountNumber} - {payment.toAccount.sortCode}</td>
                                        </tr>
                                    )
                                }
                            }
                            )
                        )}
                    </tbody>
                </Table>
                <div>
                <Button
                    variant="primary"
                    disabled={isLoading||!payments.metaData.hasMoreElements}
                    onClick={!isLoading ? () => controlFunc(payments.metaData.nextPageIndex) : null}
                >
                    {isLoading ? 'Loading…' : 'Load more'}
                </Button>
                </div>
            </div>
            </div>
        </React.Fragment>

    );
}

Payments.propTypes = {
    payments: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    paymentStatus: PropTypes.string.isRequired,
    controlFunc: PropTypes.func.isRequired,
    statusControlFunc: PropTypes.func.isRequired
};

Payments.defaultProps = {
    isLoading: false,
    paymentStatus: '1'
}

export default Payments