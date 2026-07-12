import z from "zod";



export type ArmorPieceType = 'helmet' | 'arms' | 'chest' | 'legs' | 'class';

export type ArmorSet = 'immortal legend';

export const CharacterClassSchema = z.enum(['warlock','hunter','titan'])
export type CharacterClass = z.infer<typeof CharacterClassSchema>;

export type EquipmentType =  'ghost' | 'vehicle' | 'ship' | 'emblem' | 'horn' | 'finisher' | ArmorPieceType;


export interface Item {
    name:string;
    type: EquipmentType;
    modelPath: string;
    texturePaths?: string[];
}

export interface ArmorItem extends Item {
    setName: string;
}