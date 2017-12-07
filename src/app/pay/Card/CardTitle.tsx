import * as React from "react";

export namespace CardTitle {
  export interface Props {}
  export interface State {}
}

export class CardTitle extends React.Component<CardTitle.Props, CardTitle.State> {
  render() {
    return (
      <h4 className="card-title">
        {this.props.children}
      </h4>
    );
  }
};
