import EquipmentSelectBlock from "./EquipmentSelectBlock/EquipmentSelectBlock";
import styles from "./CharacterScreen.module.css"
import { Canvas } from "@react-three/fiber";
import Character from "./Character/Character";
import { CharacterClassSchema, type ArmorItem, type ArmorPieceType, type CharacterClass, type Item } from "./character.types";
import { useFetcher, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { useEffect } from "react";
import path from "path"
import fs from "fs/promises"
import { CHARACTER_CONFIG } from "../../../../config/character.config";


const slotSize = 70;

type ArmorSetData = {
    meshPaths: string[];
    texturePaths: string[];
}

type ArmorModelsPathsPackage = Record<CharacterClass,Record<string,ArmorSetData>>;

export async function loader({request}:LoaderFunctionArgs) : Promise<ArmorModelsPathsPackage> {

    const setsDir = path.join(process.cwd(),"public",CHARACTER_CONFIG.armorPath);

    const data = (await fs.readdir(setsDir,{recursive: true, withFileTypes:true})).reduce((acc, entry)=>{
        if (entry.isFile())
        {
            const parentName = path.basename(entry.parentPath);
            const setPath = path.dirname(entry.parentPath);
            const classPath = path.dirname(setPath);
            const classType = path.basename(classPath);
            const validatedClass = CharacterClassSchema.safeParse(classType);

            if (validatedClass.success)
            {
                const className = validatedClass.data;
                if (!(classType in acc))
                {
                    acc[className] = {}
                }

                const setName = path.basename(setPath)
                
                if (!(setName in acc[className]))
                {
                    acc[className][setName] = {
                        meshPaths: [],
                        texturePaths: []
                    }
                }
                if (parentName.toLowerCase()==="meshes" || parentName.toLowerCase()==="textures")
                {
                    acc[className][setName].meshPaths.push("/" + (path.join(CHARACTER_CONFIG.armorPath,className,setName,parentName,entry.name).replace(/\\/g,"/")));
                }
                else 
                {
                    console.error("Error: armor file is not in a meshes or textures directory.");
                }
                
            }
            else {
                console.error("Error: armor mesh file is not in a d2 class directory.")
            }
            
        }


        return acc;
    }, {} as ArmorModelsPathsPackage)

    return data;
}

function getItemsByTypeFromArmorPathsPackage(classType:CharacterClass,armorType:ArmorPieceType, data: ArmorModelsPathsPackage) : ArmorItem[]
{
    const items: ArmorItem[] = []

    Object.keys(data[classType]).forEach((setName)=>{
        const info = data[classType][setName];

        const armorPath =  info.meshPaths.find((p)=>p.toLowerCase().includes(armorType))
        if (armorPath)
        {
            items.push({
                name:setName.replace("-"," ") + " " + armorType,
                modelPath:armorPath,
                type:armorType,
                setName:setName,
                texturePaths:info.texturePaths
            })
        }
    })

    return items;
}

export default function CharacterScreen()
{
    const classType: CharacterClass = "warlock";
    const data = useLoaderData<typeof loader>();

    const helmetItems: ArmorItem[] = getItemsByTypeFromArmorPathsPackage(classType,"helmet",data);
     
    
    console.log(helmetItems);
    

    return (
        <div className="w-full h-full relative z-0">
           <div className="absolute z-[-1] w-full h-full bg-gray-800/50">
                <Canvas>
                    <Character/>
                </Canvas>
           </div>
            <div style={{padding: `120px ${slotSize * 4.5}px`, gap: slotSize*.3}} className={styles.equipmentSelectBlocksContainer}>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} initialItems={[]} direction="left"/>
                    <EquipmentSelectBlock slotSize={slotSize} initialItems={helmetItems} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} initialItems={[]} direction="left"/>
                    <EquipmentSelectBlock slotSize={slotSize}  initialItems={[]} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} initialItems={[]} direction="left"/>
                    <EquipmentSelectBlock slotSize={slotSize}  initialItems={[]} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} initialItems={[]} direction="left"/>
                    <EquipmentSelectBlock slotSize={slotSize}  initialItems={[]} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} initialItems={[]} direction="left"/>
                    <EquipmentSelectBlock slotSize={slotSize}  initialItems={[]} direction="right"/>
                </div>
            </div>
        </div>
    )
}

function getModelFilePathsForClass()
{
    // const dir = process.cwd();
    // console.log(dir);
    
    
}