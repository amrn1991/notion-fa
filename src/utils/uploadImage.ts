import { supabase } from "./SupabaseClient"

export const uploadImage = async (file?: File) => {
  try {
    if (!file) {
      throw new Error("یک تصویر انتخاب کنید");
    }

    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = fileName;

    await supabase.storage.from("images").upload(filePath, file);

    return { filePath, fileName }
  } catch (e) {
    alert(e)
  }
}