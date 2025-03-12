import supabase from "./supabase"
export async function getCabins() {

    const { data, error } = await supabase
        .from('cabins')
        .select('*')
    if (error) {
        throw new Error('cabins could not be loaded');

    }
    return data;
}
export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
    if (error) {
        throw new Error('cabin could not be deleted');
    }
    return data;
}
export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.('https://gnhwkbitkhncboiyvuba.supabase.co/storage/v1/object/public/cabin-images')
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
    const imagePath = hasImagePath ? newCabin.image : `https://gnhwkbitkhncboiyvuba.supabase.co/storage/v1/object/public/cabin-images/${imageName}`
    let query = supabase
        .from('cabins')
    if (!id) {
        query = query.insert([
            { ...newCabin, image: imagePath }
        ])
    }
    if (id) {
        query = query.update({ ...newCabin, image: imagePath })
            .eq('id', id)
            .select()
    }
    const { data, error } = await query.select().single();;
    if (error) {
        throw new Error('cabin could not be deleted');
    }
    if (hasImagePath) {
        return data;
    }
    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image)
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)
        throw new Error('cabin could not be created ');
    }
    return data;
}