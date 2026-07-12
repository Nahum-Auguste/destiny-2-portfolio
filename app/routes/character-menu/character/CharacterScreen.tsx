import EquipmentSelectBlock from "./EquipmentSelectBlock/EquipmentSelectBlock";
import styles from "./CharacterScreen.module.css"
import { Canvas } from "@react-three/fiber";
import Character from "./Character/Character";
import { CharacterClassSchema, type ArmorItem, type ArmorPieceType, type CharacterClass, type Item } from "./character.types";
import { useFetcher, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { useEffect, useState } from "react";
import path from "path"
import fs from "fs/promises"
import { CHARACTER_CONFIG } from "../../../../config/character.config";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import CharacterCanvas from "./Character/CharacterCanvas";
// import { PointLight } from "three";


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
                meshPath:armorPath,
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

    const [helmetItems, setHelmetItems] = useState(getItemsByTypeFromArmorPathsPackage(classType,"helmet",data));
    const [armItems, setArmItems] = useState(getItemsByTypeFromArmorPathsPackage(classType,"arms",data));
    const [chestItems, setChestItems] = useState(getItemsByTypeFromArmorPathsPackage(classType,"chest",data));
    const [legItems, setLegItems] = useState(getItemsByTypeFromArmorPathsPackage(classType,"legs",data));
    const [classItems, setClassItems] = useState(getItemsByTypeFromArmorPathsPackage(classType,"class",data));

    const [helmet,setHelmet] = useState<ArmorItem>();
    const [arms,setArms] = useState<ArmorItem>();
    const [chest,setChest] = useState<ArmorItem>();
    const [legs,setLegs] = useState<ArmorItem>();
    const [classItem,setClassItem] = useState<ArmorItem>();

    const equipItem = (idx:number, items:Item[], setItems:React.Dispatch<React.SetStateAction<any>>, setEquippedItem: React.Dispatch<React.SetStateAction<any>>)=> {
        if (idx<0 || idx >= items.length) {return}
        const newItem = items[idx];

        if (setEquippedItem)
        {
            setEquippedItem((oi : Item)=>{
                setItems((l: Item[])=>{
                    // remove equipped item from unequipped items
                    const list = l.filter((item,i)=>{
                        return i!=idx
                    });

                    // add old equipped item to unequipped items
                    if (oi)
                    {
                        list.push(oi);
                    }

                    return list;
                })

                // equip item
                return newItem;
            })
        }
        
    }

    
    useEffect(()=>{
        if (!helmet && helmetItems.length)
        {
            equipItem(0,helmetItems,setHelmetItems,setHelmet);
        }
        if (!arms && armItems.length)
        {
            equipItem(0,armItems,setArmItems,setArms);
        }
        if (!chest && chestItems.length)
        {
            equipItem(0,chestItems,setChestItems,setChest);
        }
        if (!legs && legItems.length)
        {
            equipItem(0,legItems,setLegItems,setLegs);
        }
        if (!classItem && classItems.length)
        {
            equipItem(0,classItems,setClassItems,setClassItem);
        }
    })
    

    return (
        <div className="w-full h-full relative z-0">
           <div className="absolute z-[-1] w-full h-full bg-gray-800/50">
                <CharacterCanvas helmet={helmet} arms={arms} chest={chest} legs={legs} classItem={classItem}/>
           </div>
            <div style={{padding: `120px ${slotSize * 4.5}px`, gap: slotSize*.3, pointerEvents:'none'}} className={styles.equipmentSelectBlocksContainer}>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock equippedItem={helmet} slotSize={slotSize} items={helmetItems} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock equippedItem={arms} slotSize={slotSize}  items={armItems} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock equippedItem={chest} slotSize={slotSize}  items={chestItems} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock equippedItem={legs} slotSize={slotSize}  items={legItems} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock equippedItem={classItem} slotSize={slotSize}  items={classItems} direction="right"/>
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