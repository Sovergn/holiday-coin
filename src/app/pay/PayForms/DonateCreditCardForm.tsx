import * as React from "react";
import { Form, InputGroup, Input, Label } from "reactstrap";
import { Token } from "react-stripe-checkout";
import CurrencyInput from "react-currency-input";
import * as request from "superagent";
import { Card, CardText, CardTitle } from "../Card";
import CharityInput from "../CharityInput";
import { DonateCreditCardButton } from "./DonateCreditCardButton";

export enum DonateCreditCardFormStatus {
  EDITING,
  EDITING_ERROR,
  SUCCESS
}

export namespace DonateCreditCardForm {
  export interface Props {}
  export interface State {
    status: DonateCreditCardFormStatus;
    email: string;
    amount: string;
    vote: string;
  }
}

export class DonateCreditCardForm extends React.Component<DonateCreditCardForm.Props, DonateCreditCardForm.State> {
  constructor(props) {
    super(props);

    this.state = {
      status: DonateCreditCardFormStatus.EDITING,
      email: "",
      amount: "",
      vote: "any"
    };
  }

  render() {
    const { status } = this.state;

    if (status === DonateCreditCardFormStatus.SUCCESS) {
      return (
        <Card body outline color="success">
          <CardTitle>Donation processing!</CardTitle>
          <CardText>
          Your donation has been accepted and is being processed.
          Please check your email for instructions on how to receive your Holiday Coins.
          </CardText>
        </Card>
      );
    }

    return (
      <Form className="donation-form" onSubmit={this.handleOnSubmit}>
        <InputGroup>
          <Label>Email</Label>
          <Input type="email" id="email" name="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
        </InputGroup>
        <InputGroup>
          <Label>Donation Amount</Label>
          <CurrencyInput className="form-control" value={this.state.amount} onChangeEvent={e => this.setState({ amount: e.target.value })} />
        </InputGroup>
        <CharityInput name="charity" id="charity" value={this.state.vote} onChange={e => this.setState({ vote: e.target.value })} />
        <DonateCreditCardButton email={this.state.email} amount={this.state.amount} onSubmit={this.submit} />
      </Form>
    );
  }

  handleOnSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  submit = async (token: Token) => {
    const info = this.state;

    try {
      await new Promise((resolve, reject) => {
        request.post("/ccdonate").send({
          ...info,
          token: token.id
        }).end((err, response) => {
          if (err) return reject(err);
          return resolve(response);
        });
      });

      this.setState({ status: DonateCreditCardFormStatus.SUCCESS });
    } catch(err) {
      console.error(err)
      this.setState({ status: DonateCreditCardFormStatus.EDITING_ERROR });
    }
  }
};
