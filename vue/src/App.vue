<script setup>
import { ref, computed } from 'vue';
import { onMounted, onBeforeMount } from 'vue';

const loaded = ref(false);
const started = ref(false);

import { useDataStore } from '@/stores/dataStore';
import { useActionStore } from '@/stores/actionStore';
import { useSaveStore } from '@/stores/saveStore';

const dataStore = useDataStore();
const actionStore = useActionStore();
const saveStore = useSaveStore();

const timeDifference = ref(0);
const offlineDistance = ref(0);

onMounted(() => {
    if (dataStore.autoSpeed == 0 || Math.ceil(Date.now() / 1000) - Number(localStorage.getItem("lastAction")) < 60) {
        loaded.value = true;
        started.value = true;
    }

    if (Number(localStorage.getItem("lastAction")) != 0 && dataStore.autoSpeed != 0) {
        timeDifference.value = Math.ceil(Date.now() / 1000) - Number(localStorage.getItem("lastAction"));
        saveStore.saveLastAction();
        if (timeDifference.value > 7200) timeDifference.value = 7200;
        actionStore.addDistance(Math.ceil(timeDifference.value * dataStore.autoSpeed * 0.1));
        offlineDistance.value = Math.ceil(timeDifference.value * dataStore.autoSpeed);
    }

    saveStore.saveDistance();
    loaded.value = true;
    loadAutoClicker();
});

const timeOffline = computed(() => {
    const hours = Math.floor(timeDifference.value / 3600);
    const minutes = Math.floor((timeDifference.value % 3600) / 60);
    return `${hours}:${minutes}h`;
});

function loadAutoClicker() {
    setTimeout(loadAutoClicker, 1000);
    if (loaded.value && started.value && dataStore.autoSpeed != 0) {
        saveStore.saveLastAction();
        actionStore.addDistance(dataStore.autoSpeed);
        saveStore.saveDistance();
    }
}

onBeforeMount(() => {
    saveStore.loadDistance();
    saveStore.loadAirItems();
    saveStore.loadGroundItems();
    saveStore.loadWaterItems();
    saveStore.loadSettings();

    let newAutoSpeed = 0;

    Object.keys(dataStore.groundItems).forEach(key => {
        if(dataStore.groundItems[key].auto) newAutoSpeed += (dataStore.groundItems[key].count * dataStore.groundItems[key].speed)
    });

    Object.keys(dataStore.airItems).forEach(key => {
        if(dataStore.airItems[key].auto) newAutoSpeed += (dataStore.airItems[key].count * dataStore.airItems[key].speed)
    });

    Object.keys(dataStore.waterItems).forEach(key => {
        if(dataStore.waterItems[key].auto) newAutoSpeed += (dataStore.waterItems[key].count * dataStore.waterItems[key].speed)
    });

    dataStore.autoSpeed = newAutoSpeed;
});
</script>

<template>
    <div class="main" :class="{ loaded: !started }">
        <RouterView />
    </div>
    <div class="popup" v-if="!started" @click="started = true">
        <h1>Offline:</h1>
        <p v-if="loaded">{{ timeOffline }}</p>
        <p v-if="loaded">{{ offlineDistance }}m * 0.1 = {{ Math.floor(offlineDistance * 0.1) }}m</p>
        <p v-if="!loaded">...</p>
        <p v-if="loaded">Click to start</p>
    </div>
</template>

<style scoped lang="scss">
.main {
    width: 100vw;
    height: 100vh;
    background-color: #1B1B1F;
    color: #FFFFFF;

    &.loaded {
        filter: blur(10px);
        pointer-events: none;
    }
}

.popup {
    position: absolute;
    width: 30vw;
    aspect-ratio: 1;
    background-color: #1B1B1F;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid 5px white;
    z-index: 20;
    border-radius: 3rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;

    >h1 {
        font-size: 2rem;
    }

    >p {
        font-size: 1.5rem;
    }
}

@media (max-width: 850px) {
    .popup {
        width: 40%;

    }
}

@media (max-width: 600px) {
    .popup {
        width: 60%;

        >h1 {
            font-size: 1.2rem;
        }

        >p {
            font-size: 1rem;
        }
    }
}
</style>
