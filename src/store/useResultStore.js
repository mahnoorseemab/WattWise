import { create } from "zustand"

//store  is an object
const useResultStore = create((set) => ({
    result: null,
    userResult: (result) => set({ result: result })
}))

export default useResultStore