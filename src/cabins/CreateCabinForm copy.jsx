import styled from "styled-components";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import FileInput from "../ui/FileInput";
import { Textarea } from "../ui/TextArea";
import FormRow from "../ui/FormRow";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../services/apiCabins";
import toast from "react-hot-toast";
const Label = styled.label`
    font-weight:500;
`
const Error = styled.span`
    font-size:1.2rem;
    color:red;
`
export default function CreateCabinForm() {
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: newCabin => createCabin(newCabin),
        onSuccess: () => {
            toast.success('Cabin created')
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
            reset();
        }
    })

    function onSubmit(data) {
        mutate({ ...data, image: data.image[0] });
    }
    function onError(errors) {
        console.log(errors)

    }
    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
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
                        required: 'This field is required'
                    })}
                />
            </FormRow>
            <Button type="reset">Cancel</Button>
            <Button>Add Cabin</Button>
        </Form>
    );
}