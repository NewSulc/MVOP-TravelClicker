import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', () => {
    const distance = ref(0);

    const groundItems = ref({
        "Shoes": {
            name: "Shoes",
            speed: 1,
            count: 0,
            price: 5,
            auto: false,
            locked: false
        },
        "Scooter": {
            name: "Scooter",
            speed: 1,
            count: 0,
            price: 10,
            auto: false,
            locked: true
        },
        "Bike": {
            name: "Bike",
            speed: 1,
            count: 0,
            price: 25,
            auto: false,
            locked: true
        },
        "Motorcycle": {
            name: "Motorcycle",
            speed: 1,
            count: 0,
            price: 50,
            auto: false,
            locked: true
        },
        "Car": {
            name: "Car",
            speed: 1,
            count: 0,
            price: 100,
            auto: false,
            locked: true
        },
        "Train": {
            name: "Train",
            speed: 1000,
            count: 0,
            price: 250,
            auto: false,
            locked: true
        }
    });

    const distanceStr = computed(() => {
        if (distance.value < 1000) return `${distance.value}m`;
        else {
            const distVal = String(Math.floor(distance.value / 100));
            return `${distVal.slice(0, distVal.length - 1) + '.' + distVal.slice(distVal.length - 1)}km`;
        };
    });

    return { distance, distanceStr, groundItems };
})
