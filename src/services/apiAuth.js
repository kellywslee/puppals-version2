import supabase from './supabase';

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
};

export const signup = async ({ email, password, confirmPassword }) => {
  // Check if password and confirm password match
  if (password !== confirmPassword) {
    throw new Error('Password and confirm password do not match.');
  }
  // If password and confirm password match, proceed with signup
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  // If signup is successful, log in the user automatically
  if (data) {
    const loginData = await login({ email, password });
    return loginData;
  }

  return data;
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  // add 'beforeunload' event listener to trigger logout when the tab/window is closed
  window.addEventListener('beforeunload', async (event) => {
    event.preventDefault(); // To prevent the default dialog
    await logout();
  });

  // setting up session timeout
  const sessionTimeoutDuration = 1800000000; //1800000ms = 30min
  let sessionTimeout;

  const resetSessionTimeout = () => {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(async () => {
      await logout();
    }, sessionTimeoutDuration);
  };

  resetSessionTimeout();

  window.addEventListener('mousedown', resetSessionTimeout);
  window.addEventListener('mousemove', resetSessionTimeout);
  window.addEventListener('keydown', resetSessionTimeout);
  window.addEventListener('touchstart', resetSessionTimeout);

  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
};

export const updateUser = async ({ email, password }) => {
  let updateData = {};
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  return data;
};

export const resetPassword = async ({ email }) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw new Error(error.message);

  return data;
};

export const deleteUser = async (id) => {
  const { data, error } = await supabase
    .from('profile')
    .update({ deleteRequestReceived: true })
    .eq('id', id)
    .single();

  if (error) throw new Error('User could not be deleted');

  return data;
};
