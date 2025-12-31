import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../api/authService.ts';

// 비동기 로그인 액션
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ userId, userPassword }: any, thunkAPI) => {
    try {
      const data = await authService.login(userId, userPassword);
      // 성공 시 로컬 스토리지 저장
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', data.userName);
      return { userId, ...data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const getStorageItem = (key: string) => localStorage.getItem(key);

interface UserState {
  userId: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userId: getStorageItem('userId'),
  userName: getStorageItem('userName'),
  isAuthenticated: !!getStorageItem('accessToken'),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ userId: string; userName: string }>) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.isAuthenticated = true;
    },
    logoutAction: (state) => {
      state.userId = null;
      state.userName = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.error || '로그인에 실패했습니다.';
      });
  },
});

export const { logoutAction } = userSlice.actions;
export default userSlice.reducer;