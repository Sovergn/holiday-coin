import * as React from "react";
import { InputGroup, Input, Label } from "reactstrap";

export default class DonateBitcoinForm extends React.Component<{ [prop: string]: any }, {}> {
  render() {
    return (
      <InputGroup>
        <Label>Charity</Label>
        <Input {...this.props} type="select">
        <option value="any">Any</option>
          <option value="american red cross">American Red Cross</option>
          <option value="danish refugee council">Danish Refugee Council</option>
          <option value="leukemia & lymphoma society">Leukemia &amp; Lymphoma Society</option>
          <option value="the hunger project">The Hunger Project</option>
          <option value="unicef">UNICEF</option>
          <option value="proliteracy worldwide">ProLiteracy Worldwide</option>
          <option value="childrens health fund">Children's Health Fund</option>
          <option value="brac">BRAC</option>
          <option value="catholic relief services">Catholic Relief Services</option>
          <option value="habitat for humanity">Habitat For Humanity</option>
          <option value="parkinsons foundation">Parkinson's Foundation</option>
        </Input>
      </InputGroup>
    );
  }
};
