import { supabase } from '../config/supabaseClient'; // Assuming you have a supabaseClient file

// Get user data by ID
export async function getUserById(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Update user data
export async function updateUser(userId, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
  return data;
}

// Create a new user
export async function createUser(userData) {
  const { data, error } = await supabase
    .from('users')
    .insert(userData);

  if (error) throw error;
  return data;
}

// Delete a user
export async function deleteUser(userId) {
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) throw error;
  return data;
}

// Get all users (with optional pagination)
export async function getAllUsers(page = 1, limit = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .range(from, to);

  if (error) throw error;
  return data;
}

// Get user resume
export async function getUserResume(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('resume_url')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data.resume_url;
}

// Upload user resume
export const uploadResume = async (file) => {
  if (!file || !file.name) {
    throw new Error('Invalid file object');
  }

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append('resume', file, file.name);

  try {
    const response = await fetch('/api/upload-resume', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload resume');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
};


