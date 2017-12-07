import * as React from "react";

export namespace CardText {
  export interface Props {}
  export interface State {}
}

export class CardText extends React.Component<CardText.Props, CardText.State> {
  render() {
    return (
      <p className="card-text">
        {this.props.children}
      </p>
    );
  }
};
