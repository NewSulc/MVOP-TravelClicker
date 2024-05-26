import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', () => {
    const distance = ref(0);

    const autoSpeed = ref(0)

    const groundItems = ref({
        "Shoes": {
            name: "Shoes",
            speed: 1,
            count: 0,
            price: 5,
            auto: false,
            locked: false,
            goal: 1000
        },
        "Scooter": {
            name: "Scooter",
            speed: 10,
            count: 0,
            price: 10,
            auto: false,
            locked: true,
            goal: 10000
        },
        "Bike": {
            name: "Bike",
            speed: 1,
            count: 0,
            price: 25,
            auto: false,
            locked: true,
            goal: 50000
        },
        "Motorcycle": {
            name: "Motorcycle",
            speed: 1,
            count: 0,
            price: 50,
            auto: false,
            locked: true,
            goal: 100000
        },
        "Car": {
            name: "Car",
            speed: 1,
            count: 0,
            price: 100,
            auto: false,
            locked: true,
            goal: 500000
        },
        "Train": {
            name: "Train",
            speed: 1000,
            count: 0,
            price: 250,
            auto: false,
            locked: true,
            goal: 1000000
        }
    });

    const airItems = ref({
        "Parashoot": {
            name: "Parashoot",
            speed: 1,
            count: 0,
            price: 5,
            auto: false,
            locked: false,
            goal: 1000000
        },
        "Paraglide": {
            name: "Paraglide",
            speed: 1,
            count: 0,
            price: 10,
            auto: false,
            locked: true,
            goal: 1000000
        },
        "Cesna": {
            name: "Cesna",
            speed: 1,
            count: 0,
            price: 25,
            auto: false,
            locked: true,
            goal: 1000000
        },
        "Boeing": {
            name: "Boeing",
            speed: 1,
            count: 0,
            price: 50,
            auto: false,
            locked: true,
            goal: 1000000
        }
    });

    const waterItems = ref({
        "Swimsuit": {
            name: "Swimsuit",
            speed: 1,
            count: 0,
            price: 5000,
            auto: false,
            locked: false,
            goal: 1000000
        },
        "Surfboard": {
            name: "Surfboard",
            speed: 1,
            count: 0,
            price: 50000,
            auto: false,
            locked: true,
            goal: 1000000
        },
        "Water Scooter": {
            name: "Water Scooter",
            speed: 1,
            count: 0,
            price: 250000,
            auto: false,
            locked: true,
            goal: 1000000
        }
    });

    const distanceStr = computed(() => {
        if (distance.value < 1000) return `${distance.value}m`;
        else {
            const distVal = String(Math.floor(distance.value / 100));
            return `${distVal.slice(0, distVal.length - 1) + '.' + distVal.slice(distVal.length - 1)}km`;
        };
    });

    const autoSpeedStr = computed(() => {
        if (autoSpeed.value < 1000) return `${autoSpeed.value}m`;
        else {
            const speedVal = String(Math.floor(autoSpeed.value / 100));
            return `${speedVal.slice(0, speedVal.length - 1) + '.' + speedVal.slice(speedVal.length - 1)}km`;
        };
    });

    const settings = ref({
        sound: true,
        music: true
    })

    return { distance, distanceStr, autoSpeed, autoSpeedStr, groundItems, airItems, waterItems, settings };
})