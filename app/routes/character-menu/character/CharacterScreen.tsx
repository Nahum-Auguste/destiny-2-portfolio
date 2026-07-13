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
                if (parentName.toLowerCase()==="meshes")
                {
                    acc[className][setName].meshPaths.push("/" + (path.join(CHARACTER_CONFIG.armorPath,className,setName,parentName,entry.name).replace(/\\/g,"/")));
                }
                else if (parentName.toLowerCase()==="textures")
                {
                    acc[className][setName].texturePaths.push("/" + (path.join(CHARACTER_CONFIG.armorPath,className,setName,parentName,entry.name).replace(/\\/g,"/")));
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

type ItemsPackage<T extends Item> = {
    equipped: T | undefined,
    unequipped: T[]
}

function getItemsByTypeFromArmorPathsPackage(classType:CharacterClass,armorType:ArmorPieceType, data: ArmorModelsPathsPackage) : ArmorItem[]
{
    const items: ArmorItem[] = []

    Object.keys(data[classType]).forEach((setName)=>{
        const info = data[classType][setName];

        const armorPath =  info.meshPaths.find((p)=>p.toLowerCase().includes(armorType))
        if (armorPath)
        {
            const meshPaths = [];

            switch(armorType)
            {
                case "arms":
                    const upperArmsPath = info.meshPaths.find((p)=>p.toLowerCase().includes('upper'));
                    const foreArmsPath = info.meshPaths.find((p)=>p.toLowerCase().includes('fore'));
                    const handsPath = info.meshPaths.find((p)=>p.toLowerCase().includes('hands'))
                    if (upperArmsPath && foreArmsPath && handsPath)
                    {
                        meshPaths.push(upperArmsPath,foreArmsPath,handsPath);
                    }
                    break;
                case "chest":
                    meshPaths.push(armorPath);
                    if (classType==="warlock")
                    {
                        const skirtPath = info.meshPaths.find((p)=>p.toLowerCase().includes('skirt'))

                        if (skirtPath)
                        {
                            meshPaths.push(skirtPath);
                        }
                    }
                    break;
                case "helmet":
                    meshPaths.push(armorPath);
                    const neckPath = info.meshPaths.find((p)=>p.toLowerCase().includes('neck'))

                    if (neckPath)
                    {
                        meshPaths.push(neckPath);
                    }
                    
                    break;
                default:
                    meshPaths.push(armorPath);
                    break;
            }

            if (!meshPaths.length){return}

            items.push({
                name:setName.replace("-"," ") + " " + armorType,
                meshPaths,
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

    // console.log(data);
    

    const [helmetItems, setHelmetItems] = useState({
        equipped:undefined,
        unequipped:getItemsByTypeFromArmorPathsPackage(classType,"helmet",data)
    });
    const [armItems, setArmItems] = useState({
        equipped:undefined,
        unequipped:getItemsByTypeFromArmorPathsPackage(classType,"arms",data)
    });
    const [chestItems, setChestItems] = useState({
        equipped:undefined,
        unequipped:getItemsByTypeFromArmorPathsPackage(classType,"chest",data)
    });
    const [legItems, setLegItems] = useState({
        equipped:undefined,
        unequipped:getItemsByTypeFromArmorPathsPackage(classType,"legs",data)
    });
    const [classItems, setClassItems] = useState({
        equipped:undefined,
        unequipped:getItemsByTypeFromArmorPathsPackage(classType,"class",data)
    });

    // const [helmet,setHelmet] = useState<ArmorItem>();
    // const [arms,setArms] = useState<ArmorItem>();
    // const [chest,setChest] = useState<ArmorItem>();
    // const [legs,setLegs] = useState<ArmorItem>();
    // const [classItem,setClassItem] = useState<ArmorItem>();

    // console.log("armitrems",armItems);
    

    const equipItem = <T extends Item>(idx:number, items:ItemsPackage<T>, setItems:React.Dispatch<React.SetStateAction<any>>)=> {
        if (idx<0 || idx >= items.unequipped.length) {return}
        const newEquipped = items.unequipped[idx];

       
        

        if (setItems)
        {
            setItems((items:ItemsPackage<T>):ItemsPackage<T>=>{

                const oldEquipped = items.equipped;

                const newUnequippedItems = [...items.unequipped];
                newUnequippedItems.splice(idx,1);
                

                if (oldEquipped)
                {
                    newUnequippedItems.push(oldEquipped); 
                }

                const newPack = {
                    equipped:newEquipped,
                    unequipped: newUnequippedItems
                };

                // equip item
                return newPack
            })
        }
        
    }

    
    useEffect(()=>{
        if (!helmetItems.equipped && helmetItems.unequipped.length)
        {
            equipItem(0,helmetItems,setHelmetItems);
        }
        if (!armItems.equipped && armItems.unequipped.length)
        {
            equipItem(0,armItems,setArmItems);
        }
        if (!chestItems.equipped && chestItems.unequipped.length)
        {
            equipItem(0,chestItems,setChestItems);
        }
        if (!legItems.equipped && legItems.unequipped.length)
        {
            equipItem(0,legItems,setLegItems);
        }
        if (!classItems.equipped && classItems.unequipped.length)
        {
            equipItem(0,classItems,setClassItems);
        }
    },[])

    useEffect(()=>{
        // console.log(legItems);
        
    },[legItems])
    
    

    return (
        <div className="w-full h-full relative z-0">
           <div className="absolute z-[-1] w-full h-full ">
                <CharacterCanvas helmet={helmetItems.equipped} arms={armItems.equipped} chest={chestItems.equipped} legs={legItems.equipped} classItem={classItems.equipped}/>
           </div>
            <div style={{padding: `120px ${slotSize * 4.5}px`, gap: slotSize*.3, pointerEvents:'none'}} className={styles.equipmentSelectBlocksContainer}>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock  equippedItem={helmetItems.equipped} slotSize={slotSize} items={helmetItems.unequipped} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock equippedItem={armItems.equipped} slotSize={slotSize}  items={armItems.unequipped} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock equippedItem={chestItems.equipped} slotSize={slotSize}  items={chestItems.unequipped} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock equipItem={(idx:number)=>{equipItem(idx,legItems,setLegItems)}} equippedItem={legItems.equipped} slotSize={slotSize}  items={legItems.unequipped} direction="right"/>
                </div>
                <div className={styles.equipmentRow}>
                    <EquipmentSelectBlock slotSize={slotSize} items={[]} direction="left"/>
                    <EquipmentSelectBlock equippedItem={classItems.equipped} slotSize={slotSize}  items={classItems.unequipped} direction="right"/>
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