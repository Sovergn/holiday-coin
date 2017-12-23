import * as React from "react";
import { Form, InputGroup, Input, Label } from "reactstrap";
import CurrencyInput from "react-currency-input";
import * as request from "superagent";
import { Card, CardText, CardTitle } from "../Card";
import { DonateCryptoCurrencyButton } from "./DonateCryptoCurrencyButton";

export enum DonateEthereumFormStatus {
  EDITING,
  EDITING_ERROR,
  SUCCESS
}

export namespace DonateEthereumForm {
  export interface Props {}
  export interface State {
    status: DonateEthereumFormStatus;
    email: string;
    address: string;
    firstName: string;
    lastName: string;
    country: string;
    state: string;
  }
}

export class DonateEthereumForm extends React.Component<DonateEthereumForm.Props, DonateEthereumForm.State> {
  constructor(props) {
    super(props);

    this.state = {
      status: DonateEthereumFormStatus.EDITING,
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

    if (status === DonateEthereumFormStatus.SUCCESS) {
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
        <InputGroup>
          <Label>First Name</Label>
          <Input type="text" id="firstname" name="firstname" value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })} />
        </InputGroup>
        <InputGroup>
          <Label>Last Name</Label>
          <Input type="text" id="lastname" name="lastname" value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} />
        </InputGroup>
        <InputGroup>
          <Label>Country</Label>
          <Input type="text" id="country" name="country" value={this.state.country} onChange={e => this.setState({ country: e.target.value })} />
        </InputGroup>
        <InputGroup>
          <Label>State</Label>
          <Input type="text" id="state" name="state" value={this.state.state} onChange={e => this.setState({ state: e.target.value })} />
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

      this.setState({ status: DonateEthereumFormStatus.SUCCESS });
    } catch(err) {
      console.error(err)
      this.setState({ status: DonateEthereumFormStatus.EDITING_ERROR });
    }
  }
};
