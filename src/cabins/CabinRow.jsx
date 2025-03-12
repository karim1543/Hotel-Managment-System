
import styled from "styled-components"
import CreateCabinForm from "./CreateCabinForm"
import ConfirmDelete from "../ui/ConfirmDelete"
import { useDeleteCabin } from "./useDeleteCabin"
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2"
import { useCreateCabin } from "./useCreateCabin"
import Modal from "../ui/Modal"
import Table from "../ui/Table"
import Menus from "../ui/Menus"
const TableRow = styled.div`
    display:grid;
    grid-template-columns:0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    background-color: var(--color-grey-50);
    padding: 1.6rem 2.4rem;
    &:not(:last-child){
        border-bottom: 1px solid var(--color-grey-200);
    }
`
const Img = styled.img`
    display: block;
    width:6.4rem;
    aspect-ratio: 3/2;
    object-fit: cover;
    object-position: center;
    transform:scale(1.5) translateX(-7px);

`
const Cabin = styled.div`
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-grey-800);   
    font-family: "Sono";

`
const Price = styled.div`
    font-weight: 500;

`
const Discount = styled.div`  
font-weight: 500;
color: var(--color-green-500);

 `

export default function CabinRow({ cabin }) {

    const { id: cabinID, name, maxCapacity, regularPrice, discount, image, description } = cabin;
    const { isDeleting, deleteCabin } = useDeleteCabin();
    const { isCreating, createCabin } = useCreateCabin();
    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity, regularPrice, discount, image, description
        })
    }
    return (
        <>

            <Table.Row>
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>Fits up to {maxCapacity}</div>
                <Price>${regularPrice}</Price>
                {discount ? <Discount>{discount}</Discount> : <span>-</span>}
                <div>

                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={cabinID} />
                            <Menus.List id={cabinID}>
                                <Modal.Open opens='edit'>

                                    <Menus.Button icon={<HiPencil />}>  Edit</Menus.Button>

                                </Modal.Open>
                                <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack />}>Duplicate</Menus.Button>
                                <Modal.Open opens='delete'>
                                    <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>

                                </Modal.Open>
                            </Menus.List>
                            <Modal.Window name='edit'>
                                <CreateCabinForm cabinToEdit={cabin} />
                            </Modal.Window>
                            <Modal.Window name='delete'>
                                <ConfirmDelete
                                    resource='cabins'
                                    disabled={isDeleting}
                                    onConfirm={() => deleteCabin(cabinID)} />
                            </Modal.Window>

                        </Menus.Menu>
                    </Modal>
                </div>

            </Table.Row>


        </>
    );
}