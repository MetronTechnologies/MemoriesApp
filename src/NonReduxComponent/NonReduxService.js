import {getItems, createItem, deleteItem, updateItem, getItem, likeItem} from "../ServiceAPI/API";

async function getImages() {
  try {
    const { data } = await getItems();
    return data;
  } catch (error) {
    console.log(error);
  }
}


async function createImage(todo) {
  try {
    const { data } = await createItem(todo);
    return data;
  } catch (error) {
    console.log(error);
  }
}


async function deleteImage(id) {
  try {
    await deleteItem(id);
  } catch (error) {
    console.log(error);
  }
}


async function getImage(id) {
    try{
        const {data} = await getItem(id);
        return data;
    }
    catch(error) {
        console.log(error)
    }
}


async function updateImage(id, updates) {
    try{
        const {data} = await updateItem(id, updates);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}

async function likeImage(id) {
    try{
        const {data} = await likeItem(id);
        return data
    }
    catch (e) {
        console.log(e);
    }
}





export { getImages, createImage, deleteImage, updateImage, getImage, likeImage};


