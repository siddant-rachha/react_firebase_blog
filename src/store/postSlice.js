import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  title:"",
  postText:"",
  author:"",
  time:""
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setTitle: (state, action) => {
        const {title} = action.payload
        if (title!=undefined) state.title = title
    },
    setPostText: (state, action) => {
        const {postText} = action.payload
        if (postText!=undefined) state.postText = postText
    },
    setAuthor: (state, action) => {
        if (action.payload!=undefined) state.author = {...action.payload}
    },
    setTime: (state, action) => {
        const {time} = action.payload
        if (time!=undefined) state.time = time
    }

  },
})

// Action creators are generated for each case reducer function
export const postActions =  postSlice.actions

export const postSliceReducers =  postSlice.reducer