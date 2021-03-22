export const state = () => ({
    name: '',
  })
  
export const mutations = {
  CHANGE_NAME(state, name) {
  state.name = name;
  },
}