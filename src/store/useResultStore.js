import { create } from "zustand"

//store  is an object
const useResultStore = create((set) => ({
    result: null,
    userResult: (data) => set({ result: data })
}))

export default useResultStore