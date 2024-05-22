import { defineStore } from 'pinia'

import { useDataStore } from './dataStore';

export const useSaveStore = defineStore('saveStore', () => {
    const dataStore = useDataStore();

    const saveDistance = () => {
        localStorage.setItem("distance", dataStore.distance)
    };

    const saveGroundItems = () => {
        localStorage.setItem("groundItems", JSON.stringify(dataStore.groundItems))
    };

    const saveWaterItems = () => {
        localStorage.setItem("waterItems", JSON.stringify(dataStore.waterItems))
    };

    const saveAirItems = () => {
        localStorage.setItem("airItems", JSON.stringify(dataStore.airItems))
    };

    const loadDistance = () => {
        if(localStorage.getItem("distance") != null) dataStore.distance = Number(localStorage.getItem("distance"));
    }

    const loadGroundItems = () => {
        if(localStorage.getItem("groundItems") != null) dataStore.groundItems = JSON.parse(localStorage.getItem("groundItems"))
    };

    const loadWaterItems = () => {
        if(localStorage.getItem("waterItems") != null) dataStore.waterItems = JSON.parse(localStorage.getItem("waterItems"))
    };

    const loadAirItems = () => {
        if(localStorage.getItem("airItems") != null) dataStore.airItems = JSON.parse(localStorage.getItem("airItems"))
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
