import * as THREE from 'three'

type Texture = THREE.Texture;

export const createArmorMaterial = (albedo?:Texture,normal?:Texture,gstack?:Texture,dyeMap?:Texture)=>
{
    configureTexture(albedo)
    configureTexture(normal)
    configureTexture(gstack)
    configureTexture(dyeMap)

    const mat = new THREE.MeshStandardMaterial({
        map: albedo,
        normalMap: normal,
        roughnessMap: gstack,
        aoMap: gstack,
        metalnessMap: gstack,
        aoMapIntensity:1,
        roughness:1,
        metalness:1,
        normalScale: new THREE.Vector2(1,1)
    })

    return mat;
}

function configureTexture(t?:Texture)
{
    if (t)
    {
        t.flipY = false;
    }
}