import z from "zod";

export const saveDataSchema = z.object({
    collectedPageIndices: z.array(z.number())
})

export type SaveData = z.infer<typeof saveDataSchema>;

export const COOKIE_CONFIG = {
    SAVE_DATA_COOKIE_NAME: 'save-data',
    SAVE_DATA_EXPIRE_TIME: ((1/24)/60) * (1/60) * 5 
} as const;



