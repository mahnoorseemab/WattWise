import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

//store  is an object
const useResultStore = create(
    persist(
        (set) => ({
            result: null,
            userResult: (data) => set({ result: data }),
            inputs: (tenureAmount) => set({ inputData: tenureAmount })
        }),

        {
            name: "resultStorage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useResultStore