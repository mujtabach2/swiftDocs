import supabase  from "../config/supabaseClient"; // Assuming you have a supabaseClient file

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
export const getUserResume = async (userId) => {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;
  return data;
};

// Upload user resume
export const uploadResume = async (file, userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Read file as ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  // Convert ArrayBuffer to Base64
  const base64String = btoa(
    new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
  );

  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id: userId,
      file_name: file.name,
      content: base64String,
    });

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data;
};
