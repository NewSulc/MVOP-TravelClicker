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
            price: 10,
            auto: false,
            locked: false,
            goal: 1000
        },
        "Scooter": {
            name: "Scooter",
            speed: 5,
            count: 0,
            price: 50,
            auto: false,
            locked: true,
            goal: 10000
        },
        "Bike": {
            name: "Bike",
            speed: 25,
            count: 0,
            price: 100,
            auto: false,
            locked: true,
            goal: 50000
        },
        "Motorcycle": {
            name: "Motorcycle",
            speed: 250,
            count: 0,
            price: 1000,
            auto: false,
            locked: true,
            goal: 100000
        },
        "Car": {
            name: "Car",
            speed: 1000,
            count: 0,
            price: 10000,
            auto: false,
            locked: true,
            goal: 500000
        },
        "Train": {
            name: "Train",
            speed: 2500,
            count: 0,
            price: 20000,
            auto: false,
            locked: true,
            goal: 1000000
        }
    });

    const airItems = ref({
        "Parashoot": {
            name: "Parashoot",
            speed: 10000,
            count: 0,
            price: 500000,
            auto: false,
            locked: false,
            goal: 5000000
        },
        "Paraglide": {
            name: "Paraglide",
            speed: 50000,
            count: 0,
            price: 1200000,
            auto: false,
            locked: true,
            goal: 10000000
        },
        "Cesna": {
            name: "Cesna",
            speed: 75000,
            count: 0,
            price: 2500000,
            auto: false,
            locked: true,
            goal: 25000000
        },
        "Boeing": {
            name: "Boeing",
            speed: 150000,
            count: 0,
            price: 7000000,
            auto: false,
            locked: true,
            goal: 100000000
        },
        "SR-71": {
            name: "SR-71",
            speed: 300000,
            count: 0,
            price: 100000000,
            auto: false,
            locked: true,
            goal: 250000000
        }
    });

    const waterItems = ref({
        "Swimsuit": {
            name: "Swimsuit",
            speed: 250000,
            count: 0,
            price: 75000000,
            auto: false,
            locked: false,
            goal: 600000000
        },
        "Surfboard": {
            name: "Surfboard",
            speed: 700000,
            count: 0,
            price: 150000000,
            auto: false,
            locked: true,
            goal: 850000000
        },
        "Water Scooter": {
            name: "Water Scooter",
            speed: 1250000,
            count: 0,
            price: 300000000,
            auto: false,
            locked: true,
            goal: 1500000000
        },
        "Flyboard": {
            name: "Flyboard",
            speed: 2500000,
            count: 0,
            price: 150000000,
            auto: false,
            locked: true,
            goal: 3000000000
        },
        "Submarine": {
            name: "Submarine",
            speed: 5000000,
            count: 0,
            price: 25000000,
            auto: false,
            locked: true,
            goal: 6800000000
        },
        "Speed boat": {
            name: "Speed boat",
            speed: 10000000,
            count: 0,
            price: 100000000,
            auto: false,
            locked: true,
            goal: 10000000000
        },
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