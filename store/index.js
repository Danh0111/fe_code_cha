export const state = () => ({
    dataShow : []
});

export const mutations = {
    SET_DATA_SHOW(state,data) {
        state.dataShow = data
    }
}

export const actions = {
    setDataShow({commit}, {data}){
        commit('SET_DATA_SHOW',data)
    }
}