import { defineStore } from 'pinia'

import { useDataStore } from './dataStore';

export const useActionStore = defineStore('actionStore', () => {
    const dataStore = useDataStore();

    const addDistance = (dist) => {
        dataStore.distance += dist;
    };

    const buyItem = (itemName, type, locked) => {
        if (type == 1 && locked == false) {
            if (dataStore.groundItems[itemName].price <= dataStore.distance) {
                dataStore.distance -= dataStore.groundItems[itemName].price;
                dataStore.groundItems[itemName].count += 1;

                if(Object.keys(dataStore.groundItems)[Object.keys(dataStore.groundItems).indexOf(itemName) + 1] != undefined){
                    dataStore.groundItems[Object.keys(dataStore.groundItems)[Object.keys(dataStore.groundItems).indexOf(itemName) + 1]].locked = false;
                }              
            }
        }
    };

    return { addDistance, buyItem };
})
