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
              <div className="six columns">
                <p>Donations are accepted by credit card. Simply fill out the form to the right and click "Donate" and you'll be prompted with directions for payment.</p>
                <p>After donating, you'll be assigned an address with Holiday Coin based on the amount you've donated.</p>
                <p>Currently, you'll be rewarded 1 Holiday Coin for every dollar (USD) you donate.</p>
                <br />
                <br />
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
                <img src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=1BEX4AfyY53mWeFfhbJA1uE5nBa8YbRhjh" className="qr-code" />
                <small>0x1BEX4AfyY53mWeFfhbJA1uE5nBa8YbRhjh</small>
                <br />
                <br />
                <p className="text-left">Send bitcoin to the address above and you'll be awarded Holiday Coin with a new address. You can claim that address by filling out the form to the right.</p>
                <br />
                <br />
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
                <img src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=b0c0cafc9bc1d9036fa43b5826cb7d3cfa9437cc" className="qr-code" />
                <small>0xb0c0cafc9bc1d9036fa43b5826cb7d3cfa9437cc</small>
                <br />
                <br />
                <p className="text-left">Send ether to address above and you'll be awarded Holiday Coin at the address you've sent from. It is a standard ERC20 token, so you can use your favorite ERC20 wallet to manage it.</p>
                <br />
                <br />
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
