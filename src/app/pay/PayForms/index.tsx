import * as React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import BitcoinQRCode from "react-bitcoin-qr";
import { DonateCreditCardForm } from "./DonateCreditCardForm";
import { DonateBitcoinForm } from "./DonateBitcoinForm";
import { DonateEthereumForm } from "./DonateEthereumForm";

export enum PayFormsTab {
  CC,
  BITCOIN,
  ETHEREUM
}

export namespace PayForms {
  export interface Props {}
  export interface State {
    tab: PayFormsTab;
  }
}

export class PayForms extends React.Component<PayForms.Props, PayForms.State> {
  constructor(props) {
    super(props);

    this.state = {
      tab: PayFormsTab.CC
    };
  }

  render() {
    return (
      <div className="container">
        <Nav tabs>
          <NavItem>
            <NavLink className={this.state.tab == PayFormsTab.CC ? "active" : null} onClick={() => this.setState({ tab: PayFormsTab.CC })}>Credit Card</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={this.state.tab == PayFormsTab.BITCOIN ? "active" : null} onClick={() => this.setState({ tab: PayFormsTab.BITCOIN })}>Bitcoin</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={this.state.tab == PayFormsTab.ETHEREUM ? "active" : null} onClick={() => this.setState({ tab: PayFormsTab.ETHEREUM })}>Ethereum</NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.tab}>
          <TabPane tabId={PayFormsTab.CC}>
            <div className="fifteen columns">
              <div className="six columns text-center">
                <p>Donations accepted by credit card</p>
              </div>
              <div className="eight columns">
                <DonateCreditCardForm />
              </div>
            </div>
            <div className="clear"></div>
          </TabPane>
          <TabPane tabId={PayFormsTab.BITCOIN}>
            <div className="fifteen columns">
              <div className="six columns text-center">
                <p>Donations accepted by Bitcoin at <small>22kQMUkB9QJu9X5JP9H9M2qMUmrGtDakkV</small></p>
                <img src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=22kQMUkB9QJu9X5JP9H9M2qMUmrGtDakkV" className="qr-code" />
              </div>
              <div className="eight columns">
                <DonateBitcoinForm />
              </div>
            </div>
            <div className="clear"></div>
          </TabPane>
          <TabPane tabId={PayFormsTab.ETHEREUM}>
            <div className="fifteen columns">
              <div className="six columns text-center">
                <p>Donations accepted by Ethereum at <small>0xbf3b83ca2341b159a0e183450e914f0e04890977</small></p>
                <img src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=bf3b83ca2341b159a0e183450e914f0e04890977" className="qr-code" />
              </div>
              <div className="eight columns">
                <DonateEthereumForm />
              </div>
            </div>
            <div className="clear"></div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
};
