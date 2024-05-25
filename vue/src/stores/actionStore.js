import { defineStore } from 'pinia'

import { useDataStore } from './dataStore';
import { useSaveStore } from './saveStore';

export const useActionStore = defineStore('actionStore', () => {
    const dataStore = useDataStore();
    const saveStore = useSaveStore();

    const addDistance = (dist) => {
        dataStore.distance = dataStore.distance + dist;
    };

    const buyItem = (itemName, type, locked) => {
        if (type == 1 && locked == false) {
            if (dataStore.groundItems[itemName].price <= dataStore.distance) {
                dataStore.distance -= dataStore.groundItems[itemName].price;
                dataStore.groundItems[itemName].count += 1;

                const nextItem = dataStore.groundItems[Object.keys(dataStore.groundItems)[Object.keys(dataStore.groundItems).indexOf(itemName) + 1]]
                if (nextItem != undefined && nextItem.locked && dataStore.groundItems[itemName].count >= 5) nextItem.locked = false;

                saveStore.saveGroundItems();
            }
        }
        else if(type == 2 && locked == false) {
            if (dataStore.airItems[itemName].price <= dataStore.distance) {
                dataStore.distance -= dataStore.airItems[itemName].price;
                dataStore.airItems[itemName].count += 1;

                const nextItem = dataStore.airItems[Object.keys(dataStore.airItems)[Object.keys(dataStore.airItems).indexOf(itemName) + 1]]
                if (nextItem != undefined && nextItem.locked && dataStore.airItems[itemName].count >= 5) nextItem.locked = false;

                saveStore.saveAirItems();
            }
        }
        else {
            if (dataStore.waterItems[itemName].price <= dataStore.distance) {
                dataStore.distance -= dataStore.waterItems[itemName].price;
                dataStore.waterItems[itemName].count += 1;

                const nextItem = dataStore.waterItems[Object.keys(dataStore.waterItems)[Object.keys(dataStore.waterItems).indexOf(itemName) + 1]]
                if (nextItem != undefined && nextItem.locked && dataStore.waterItems[itemName].count >= 5) nextItem.locked = false;

                saveStore.saveWaterItems();
            }
        }
    };

    return { addDistance, buyItem };
})
