import { supabase } from "../config/supabaseClient"; // Assuming you have a supabaseClient file

// Get user data by ID
export async function getUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}

// Update user data
export async function updateUser(userId, updates) {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId);

  if (error) throw error;
  return data;
}

// Create a new user
export async function createUser(userData) {
  const { data, error } = await supabase.from("users").insert(userData);

  if (error) throw error;
  return data;
}

// Delete a user
export async function deleteUser(userId) {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (error) throw error;
  return data;
}

// Get all users (with optional pagination)
export async function getAllUsers(page = 1, limit = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .range(from, to);

  if (error) throw error;
  return data;
}

// Get user resume
export async function getUserResume(userId) {
  const { data, error } = await supabase.storage
    .from('resumes')
    .createSignedUrl(`${userId}.pdf`, 60); // Assumes PDF format

  if (error) throw error;
  return data.signedUrl;
}

// Upload user resume
export const uploadResume = async (file, userId) => {
  if (!file || !file.name) {
    throw new Error("Invalid file object");
  }

  try {
    // Use userId for file name, keeping the original extension
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;

    // Check if a resume already exists
    const { data: existingFile, error: existingError } = await supabase.storage
      .from('resumes')
      .list('', { prefix: userId });

    if (existingError) throw existingError;

    // If a file exists, remove it
    if (existingFile.length > 0) {
      const { error: removeError } = await supabase.storage
        .from('resumes')
        .remove([existingFile[0].name]);

      if (removeError) throw removeError;
    }

    // Upload new file to Supabase storage
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, file);

    if (error) throw error;

    // Get public URL for the uploaded file
    const { publicURL, error: urlError } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);

    if (urlError) throw urlError;

    return { fileName, publicURL };
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
};
