import SortBy from "../ui/SortyBy";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../ui/Table";
import Menus from "../ui/Menus";
import { useSearchParams } from "react-router-dom";
const TableHeader = styled.header`
    display:grid;
    grid-template-columns:0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    background-color: var(--color-grey-50);
    padding: 1.6rem 2.4rem;
    border-radius: var(--border-radius-sm);
    margin-bottom: 2.4rem;
    font-size: 1.4rem;
    font-weight: 500;
`

export default function CabinTable() {
    const { isLoading, cabins, error } = useCabins();
    const [searchParams, setSearchParams] = useSearchParams();
    if (isLoading) {
        return <Spinner />
    }
    if (error) {
        return <div>Something went wrong</div>
    }
    //filtering:
    const filterValue = searchParams.get('discount') || 'all';
    let filteredCabins;
    if (filterValue === 'all') filteredCabins = cabins;
    if (filterValue === 'no-discount') filteredCabins = cabins.filter(cabin => cabin.discount === 0);
    if (filterValue === 'with-discount') filteredCabins = cabins.filter(cabin => cabin.discount > 0);
    //sorting:
    const sortBy = searchParams.get('sortBy') || 'name-asc';
    const [field, direction] = sortBy.split('-');
    const modifier = direction === 'asc' ? 1 : -1;
    const sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);
    return (
        <Menus>
            <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
                <TableHeader role="row" >
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </TableHeader>
                <Table.Body data={sortedCabins}
                    render={(cabin) => (<CabinRow key={cabin.id} cabin={cabin} />)}
                />

            </Table>
        </Menus>
    );
}