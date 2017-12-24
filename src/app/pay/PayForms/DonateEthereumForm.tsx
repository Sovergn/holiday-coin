import * as React from "react";
import { Form, InputGroup, Input, Label } from "reactstrap";
import CurrencyInput from "react-currency-input";
import * as request from "superagent";
import { Card, CardText, CardTitle } from "../Card";
import CharityInput from "../CharityInput";
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
    vote: string;
  }
}

export class DonateEthereumForm extends React.Component<DonateEthereumForm.Props, DonateEthereumForm.State> {
  constructor(props) {
    super(props);

    this.state = {
      status: DonateEthereumFormStatus.EDITING,
      email: "",
      address: "",
      vote: "any"
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
        <CharityInput name="charity" id="charity" value={this.state.vote} onChange={e => this.setState({ vote: e.target.value })} />
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
        request.post("/ethclaim").send(form).end((err, response) => {
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
