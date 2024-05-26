<template>
    <div class="body">
        <header>
            <h1>{{ timeLeft }}</h1>
        </header>
        <main>
            <p class="lenght">{{ Math.round(clickedValue * 10) / 10 }}m/{{ router.currentRoute.value.params.goal }}m</p>
            <div class="bar">
                <div class="fill" :style="{ 'width': clickedPercentage + '%' }">
                    <div class="slider"></div>
                </div>
            </div>
            <p class="multi">
                {{ router.currentRoute.value.params.count }} {{ router.currentRoute.value.params.item }} =
                {{ Math.round(router.currentRoute.value.params.count * 10) / 100 }}x
            </p>

            <div class="clicker" @click="addClick()"></div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/dataStore';
import { useSaveStore } from '@/stores/saveStore';

const router = useRouter();
const clickedValue = ref(0);

const dataStore = useDataStore();
const saveStore = useSaveStore();

function addClick() {
    clickedValue.value += (router.currentRoute.value.params.count) * router.currentRoute.value.params.speed;
}

const clickedPercentage = computed(() => {
    return (clickedValue.value) * 100 / router.currentRoute.value.params.goal;
})

watch(clickedPercentage, () => {
    if (clickedPercentage.value >= 100) {
        if (router.currentRoute.value.params.type == 1) {
            dataStore.groundItems[router.currentRoute.value.params.item].auto = true;
            saveStore.saveGroundItems();
        }
        else if (router.currentRoute.value.params.type == 2) {
            dataStore.airItems[router.currentRoute.value.params.item].auto = true;
            saveStore.saveAirItems();
        }
        else {
            dataStore.waterItems[router.currentRoute.value.params.item].auto = true;
            saveStore.saveWaterItems();
        }

        dataStore.autoSpeed += (router.currentRoute.value.params.count) * router.currentRoute.value.params.speed;
        saveStore.saveAutoSpeed();
        router.push("/");
    }
})

const timeStart = ref(30);
let intervalId = null;

const timeLeft = computed(() => {
    const minutes = Math.floor(timeStart.value / 60);
    const seconds = timeStart.value % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

const startCountdown = () => {
    intervalId = setInterval(() => {
        if (timeStart.value > 0) {
            timeStart.value--;
        } else {
            clearInterval(intervalId);
            router.push("/");
        }
    }, 1000);
};

onMounted(() => {
    startCountdown();
});

onBeforeUnmount(() => {
    clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.body {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    color: #FFFFFF;
    user-select: none;
}

header {
    width: 100%;
    height: 10%;

    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        font-weight: 700;
        font-size: 3rem;
        text-transform: capitalize;
    }
}

main {
    width: 100%;
    height: 90%;
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10rem;

    >p {
        font-size: 2rem;
    }

    >.bar {
        width: 60%;
        height: 2%;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 0.25rem;

        >.fill {
            width: 0%;
            height: 100%;
            border-radius: inherit;
            background-color: white;
            position: relative;

            display: flex;
            justify-content: end;
            align-items: center;

            >.slider {
                min-width: 7rem;
                aspect-ratio: 1;
                border-radius: 50%;
                border: 5px solid #FFFFFF;
                background-color: #1B1B1F;
                z-index: 5;
            }
        }
    }

    >.clicker {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 5;
    }
}
</style>
