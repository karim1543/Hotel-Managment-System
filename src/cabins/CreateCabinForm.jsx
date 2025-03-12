import styled from "styled-components";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FileInput from "../ui/FileInput";
import { Textarea } from "../ui/TextArea";
import FormRow from "../ui/FormRow";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
const Label = styled.label`
    font-weight:500;
`
const Error = styled.span`
    font-size:1.2rem;
    color:red;
`
export default function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);
    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const { errors } = formState;
    const { isCreating, createCabin } = useCreateCabin();

    const { isEditing, editCabin } = useEditCabin();
    const isWorking = isCreating || isEditing

    function onSubmit(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0]
        if (isEditSession) {
            editCabin({ newCabinData: { ...data, image: image }, id: editId }, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.()
                }
            });
        }
        else {
            createCabin({ ...data, image: image }, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.()
                }
            });
        }

    }
    function onError(errors) {
        console.log(errors)

    }
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input type="text" id="name" {...register('name', {
                    required: 'This field is required'
                })}
                />
                {errors?.name?.message && <Error>{errors.name.message}</Error>}
            </FormRow>
            <FormRow>
                <Label htmlFor="maxCapacity">Max Capacity</Label>
                <Input type="number" id="maxCapacity" {...register('maxCapacity', {
                    required: 'This field is required',
                    min: {
                        value: 1,
                        message: "capacity must be at least 1"
                    }
                })} />
            </FormRow>
            <FormRow>
                <Label htmlFor="regularPrice">Regular Price:</Label>
                <Input type="number" id="regularPrice"  {...register('regularPrice', {
                    required: 'This field is required',
                    min: {
                        value: 1,
                        message: "capacity must be at least 1"
                    }
                })} />
            </FormRow>
            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input type="number" id="discount" {...register('discount', {
                    required: 'This field is required',
                    validate: value => value <= getValues().regularPrice || 'Discount must be less than regular price'
                })} />
            </FormRow>
            <FormRow>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...register('description', {
                    required: 'This field is required'
                })} />
            </FormRow>
            <FormRow>
                <Label htmlFor="image">photo</Label>
                <FileInput accept="image"
                    id="image"

                    {...register('image', {
                        required: isEditSession ? false : 'This field is required'
                    })}
                />
            </FormRow>
            <Button type="reset" onClick={() => onCloseModal?.()}>Cancel</Button>
            <Button disabled={isWorking}>{!isEditSession ? 'Add Cabin' : 'Edit Cabin'}</Button>
        </Form>
    );
}