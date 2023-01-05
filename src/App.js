import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51MMQcGDknvLebi91Ge5BBXH7izgAaCn3vH4tILEWEUAd8RSCQ3pShB4fljMQKz12BErLmUROYl70P3ULLDNFM9We00ung8cWoB"
);
function App() {
  return (
    <div className="">
      <h1>Hello</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;

// Steps of using Strip payment gateway

/* 
  1. Create an account in stripe website and get publisher key
  2. install stripe package
  3. Create Elements wrapper using publisher key
  4. Create checkout form using Card Element,useStripe,useElement
  5. get card elements info and error(if present)
  ------------------------------------------------
  6. get client secret from stripe website and get client secret from backend
  7. store client secret in client site

*/
