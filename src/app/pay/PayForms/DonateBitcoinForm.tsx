import * as React from "react";
import { Form, InputGroup, Input, Label } from "reactstrap";
import CurrencyInput from "react-currency-input";
import * as request from "superagent";
import { Card, CardText, CardTitle } from "../Card";
import { DonateCryptoCurrencyButton } from "./DonateCryptoCurrencyButton";

export enum DonateBitcoinFormStatus {
  EDITING,
  EDITING_ERROR,
  SUCCESS
}

export namespace DonateBitcoinForm {
  export interface Props {}
  export interface State {
    status: DonateBitcoinFormStatus;
    email: string;
    address: string;
    firstName: string;
    lastName: string;
    country: string;
    state: string;
  }
}

export class DonateBitcoinForm extends React.Component<DonateBitcoinForm.Props, DonateBitcoinForm.State> {
  constructor(props) {
    super(props);

    this.state = {
      status: DonateBitcoinFormStatus.EDITING,
      email: "",
      address: "",
      firstName: "",
      lastName: "",
      country: "",
      state: ""
    };
  }

  render() {
    const { status } = this.state;

    if (status === DonateBitcoinFormStatus.SUCCESS) {
      return (
        <Card body outline color="success">
          <CardTitle>Donation processing!</CardTitle>
          <CardText>
          Your address claim has been accepted and is being processed.
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
          <Label>Address</Label>
          <Input type="text" name="address" id="address" value={this.state.address} onChange={e => this.setState({ address: e.target.value })} placeholder="Example: 1289af838871cbd1fa" />
        </InputGroup>
        <DonateCryptoCurrencyButton email={this.state.email} onSubmit={this.submit} />
      </Form>
    );
  }

  handleOnSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  submit = async () => {
    const { status, ...form } = this.state;

    try {
      await new Promise((resolve, reject) => {
        request.post("/btcclaim").send(form).end((err, response) => {
          if (err) return reject(err);
          return resolve(response);
        });
      });

      this.setState({ status: DonateBitcoinFormStatus.SUCCESS });
    } catch(err) {
      console.error(err)
      this.setState({ status: DonateBitcoinFormStatus.EDITING_ERROR });
    }
  }
};
