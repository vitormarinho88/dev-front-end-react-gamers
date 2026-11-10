import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom"

import stripePromise from '../../Config/stripeConfig.js';
import { CheckoutForm } from "../../components/Stripe/CheckoutForm";


export function Checkout() {
    
  const {
    state: {clientSecret},
  } = useLocation();
    

  if(!clientSecret){
    return <div>Erro , volte e tente novamente</div>
  }


    return(
        <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm />
        </Elements>
    );
}