import * as React from "react";

export namespace Card {
  export interface Props {
    body: boolean;
    outline: boolean;
    color: string;
  }
  export interface State {}
}

export class Card extends React.Component<Card.Props, Card.State> {
  render() {
    let className = "card";
    if (this.props.outline) {
      let color = this.props.color || "primary";
      className += ` border-${color}`;
    }
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
};
