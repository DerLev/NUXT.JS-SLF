export const state = () => ({
    name: '',
    title: '',
    description: '',
    image: '',
  })
  
export const mutations = {
  CHANGE_NAME(state, name) {
    state.name = name;
  },
  CHANGE_TITLE(state, title) {
    state.title = title;
  },
  CHANGE_DESCRIPTION(state, description) {
    state.description = description;
  },
  CHANGE_IMAGE(state, image) {
    state.image = image;
  },
}