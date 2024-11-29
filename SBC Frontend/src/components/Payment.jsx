import React, { useRef, useEffect } from "react";
import styled from 'styled-components';
import Swal from 'sweetalert2';

const PaymentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const PaypalButtonContainer = styled.div`
  width: 300px;
`;

export default function Payment() {
  const paypal = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=AQzQBlc3yOsbqmBzPaL0jLWtQ6rVl6VwU_E8Phn8ag2CxbgqtJDR6O5-DKlhpNoH_ONgMGHF_ykcp7WH&currency=CAD`;
    script.addEventListener("load", () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: "Cool looking table",
                  amount: {
                    currency_code: "CAD",
                    value: 650.0,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            Swal.fire({
              title: 'Payment Successful',
              text: 'Thank you for your purchase!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          },
          onError: (err) => {
            console.log(err);
            Swal.fire({
              title: 'Payment Error',
              text: 'There was an error processing your payment.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          },
        })
        .render(paypal.current);
    });
    document.body.appendChild(script);
  }, []);

  return (
    <PaymentContainer>
      <PaypalButtonContainer ref={paypal}></PaypalButtonContainer>
    </PaymentContainer>
  );
}