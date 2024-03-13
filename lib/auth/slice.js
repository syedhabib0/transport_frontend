import { createSlice } from '@reduxjs/toolkit';

const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    return serializedState ? JSON.parse(serializedState) : null;
  } catch (error) {
    console.error('Error loading authentication state from localStorage:', error);
    return null;
  }
};

const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth', serializedState);
  } catch (error) {
    console.error('Error saving authentication state to localStorage:', error);
  }
};

const initialState = loadAuthState() || {
  access_token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const newState = {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
      saveAuthState(newState);
      return newState;
    },
    clearAuth: (state) => {
      const newState = {
        ...state,
        token: null,
        user: null,
      };
      saveAuthState(newState);
      return newState;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;