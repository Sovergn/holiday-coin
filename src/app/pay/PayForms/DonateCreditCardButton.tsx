import * as React from "react";
import { Button } from "reactstrap";
import StripeCheckout, { Token } from "react-stripe-checkout";

export namespace DonateCreditCardButton {
  export interface Props {
    email: string;
    amount: string;
    onSubmit: Function;
  }
  export interface State {}
}

export class DonateCreditCardButton extends React.Component<DonateCreditCardButton.Props, DonateCreditCardButton.State> {
  render() {
    const { email, amount, onSubmit } = this.props;

    if (!Boolean(amount) || !Boolean(email) || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      return <Button disabled>Donate</Button>
    }

    return (
      <StripeCheckout
        stripeKey="pk_test_cQcfj8GqAtWobryPn1Vk6NlA"
        currency="USD"
        name="Donate to Charity"
        description="Donate to charity and receive your Holiday Coins!"
        email={email}
        amount={parseFloat(amount)*100}
        shippingAddress={false}
        billingAddress={false}
        zipCode={false}
        bitcoin={false}
        alipay={false}
        reconfigureOnUpdate={true}
        token={(token: Token) => this.props.onSubmit(token)}
      >
        <Button type="button">Donate</Button>
      </StripeCheckout>
    );
  }
};
