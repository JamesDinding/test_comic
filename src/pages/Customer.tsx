import { FunctionalComponent, h } from "preact";
import Customer from "../components/Profile/Services/Customer";

const CustomerPage: FunctionalComponent = () => {
  return (
    <div className="grow">
      <Customer />
    </div>
  );
};

export default CustomerPage;
