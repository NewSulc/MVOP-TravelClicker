import { defineStore } from 'pinia'

import { useDataStore } from './dataStore';

export const useSaveStore = defineStore('saveStore', () => {
    const dataStore = useDataStore();

    const saveDistance = () => {
        localStorage.setItem("distance", dataStore.distance)
    };

    const saveGroundItems = () => {
        localStorage.setItem("groundItems", dataStore.groundItems)
    };

    const saveWaterItems = () => {
        localStorage.setItem("waterItems", dataStore.waterItems)
    };

    const saveAirItems = () => {
        localStorage.setItem("airItems", dataStore.airItems)
    };

    const loadDistance = () => {
        if(localStorage.getItem("distance") != null) dataStore.distance = localStorage.getItem("distance");
    }

    const loadGroundItems = () => {
        if(localStorage.getItem("groundItems") != null) dataStore.airItems = localStorage.getItem("groundItems")
    };

    const loadWaterItems = () => {
        if(localStorage.getItem("waterItems") != null) dataStore.airItems = localStorage.getItem("waterItems")
    };

    const loadAirItems = () => {
        if(localStorage.getItem("airItems") != null) dataStore.airItems = localStorage.getItem("airItems")
    };

    return {
        saveDistance,
        saveGroundItems,
        saveWaterItems,
        saveAirItems,
        loadDistance,
        loadGroundItems,
        loadAirItems,
        loadWaterItems
    };
})
