export default ({ app, store }, inject) => {
  inject('notification', {
    showMessage ({ content = '', color = 'primary' }) {
      store.commit('snackbar/showMessage', { content, color })
    }
  })
}