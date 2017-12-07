import * as React from "react";
import { Button } from "reactstrap";

export namespace DonateCryptoCurrencyButton {
  export interface Props {
    email: string;
    onSubmit: Function;
  }
  export interface State {}
}

export class DonateCryptoCurrencyButton extends React.Component<DonateCryptoCurrencyButton.Props, DonateCryptoCurrencyButton.State> {
  render() {
    const { email, onSubmit } = this.props;

    if (!Boolean(email) || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      return <Button disabled>Submit for Holiday Coins</Button>
    }

    return (
      <Button type="button" onClick={() => this.props.onSubmit()}>Submit for Holiday Coins</Button>
    );
  }
};
