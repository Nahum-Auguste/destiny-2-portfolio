
import Cookies from "js-cookie"
import { COOKIE_CONFIG, saveDataSchema, type SaveData } from "../config/cookies.config"

export function saveSaveDataCookie(saveData: SaveData)
{
    Cookies.set(COOKIE_CONFIG.SAVE_DATA_COOKIE_NAME,JSON.stringify(saveData),{expires:COOKIE_CONFIG.SAVE_DATA_EXPIRE_TIME})
}

export function getSaveData() : SaveData
{
    const sd = Cookies.get(COOKIE_CONFIG.SAVE_DATA_COOKIE_NAME);
    let v = saveDataSchema.safeParse(sd ? JSON.parse(sd) : undefined);

    // if data is invalid, create and save one
    if (!v.success)
    {
        const saveData: SaveData = {
            collectedPageIndices: []
        }
        saveSaveDataCookie(saveData);
        return saveData;
    }

    return v.data;
}



export function saveCollectedPageIndex(idx:number) : SaveData
{
    const saveData = getSaveData();

    if (!saveData.collectedPageIndices.includes(idx))
    {
        saveData.collectedPageIndices.push(idx);
        saveSaveDataCookie(saveData);
    }

    return saveData;
}