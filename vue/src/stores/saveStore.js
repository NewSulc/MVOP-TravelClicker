import { defineStore } from 'pinia'

import { useDataStore } from './dataStore';

export const useSaveStore = defineStore('saveStore', () => {
    const dataStore = useDataStore();

    const saveDistance = () => {
        localStorage.setItem("distance", dataStore.distance)
    };

    const saveAutoSpeed = () => {
        localStorage.setItem("autoSpeed", dataStore.autoSpeed)
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

    const saveSettings = () => {
        localStorage.setItem("settings", JSON.stringify(dataStore.settings))
    };

    const saveLastAction = () => {
        localStorage.setItem("lastAction", Math.ceil(Date.now() / 1000))
    };

    const loadDistance = () => {
        if (localStorage.getItem("distance") != null) {
            dataStore.distance = Number(localStorage.getItem("distance"));
        }
        else dataStore.distance = 0;
    }

    const loadAutoSpeed = () => {
        if (localStorage.getItem("autoSpeed") != null) dataStore.autoSpeed = Number(localStorage.getItem("autoSpeed"))
    }

    const loadGroundItems = () => {
        if (localStorage.getItem("groundItems") != null) dataStore.groundItems = JSON.parse(localStorage.getItem("groundItems"))
    };

    const loadWaterItems = () => {
        if (localStorage.getItem("waterItems") != null) dataStore.waterItems = JSON.parse(localStorage.getItem("waterItems"))
    };

    const loadAirItems = () => {
        if (localStorage.getItem("airItems") != null) dataStore.airItems = JSON.parse(localStorage.getItem("airItems"))
    };

    const loadSettings = () => {
        if (localStorage.getItem("settings") != null) dataStore.settings = JSON.parse(localStorage.getItem("settings"))
    };

    return {
        saveDistance,
        saveAutoSpeed,
        saveGroundItems,
        saveWaterItems,
        saveAirItems,
        saveSettings,
        saveLastAction,
        loadDistance,
        loadAutoSpeed,
        loadGroundItems,
        loadAirItems,
        loadWaterItems,
        loadSettings
    };
})
