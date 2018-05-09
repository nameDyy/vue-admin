// 异步操作需要写actions
export const increment = ({commit}) => {
    commit('INCREMENT')
}
export const decrement = ({commit}) => {
    commit('DECREMENT')
}