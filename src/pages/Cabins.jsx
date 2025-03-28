
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import CabinTable from "../cabins/CabinTable";
import AddCabin from "../cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
function Cabins() {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
