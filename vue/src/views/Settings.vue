<template>
    <div class="body">
        <i id="back-arrow" class="fa-solid fa-arrow-left" @click="pushRouter('/')"></i>
        <header>
            <h1>travel clicker</h1>
        </header>
        <main>
            <div class="wrap">
                <button @click="changeSettingSound('sound')">
                    <i class="fa-solid fa-volume-high"></i>
                    <hr v-if="!dataStore.settings.sound">
                </button>
                <button @click="changeSettingSound('music')">
                    <i class="fa-solid fa-music"></i>
                    <hr v-if="!dataStore.settings.music">
                </button>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();

import { useSaveStore } from '@/stores/saveStore';
const saveStore = useSaveStore();

import { useRouter } from 'vue-router';
const router = useRouter();

function pushRouter(path) { router.push(path); }

function changeSettingSound(val) {
    if (val == "sound") dataStore.settings.sound = !dataStore.settings.sound;
    else dataStore.settings.music = !dataStore.settings.music;
    saveStore.saveSettings();
}
</script>

<style scoped lang="scss">
.body {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    position: relative;

    #back-arrow {
        color: #FFFFFF;
        position: absolute;
        top: 0%;
        left: 0%;
        margin: 2rem;
        font-size: 2.5rem;
        transition: 0.25s;

        &:hover {
            transform: scale(0.95);
            transition: 0.25s;
            filter: contrast(0.5);
        }
    }
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

    display: flex;
    justify-content: center;
    align-items: center;

    >.wrap {
        display: flex;
        gap: 2rem;

        >button {
            aspect-ratio: 1;
            height: 6rem;
            background: none;
            border: solid #FFFFFF 5px;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 2.5rem;
            position: relative;
            transition: 0.25s;

            >hr {
                position: absolute;
                width: 5rem;
                transform: rotateZ(-45deg);
                border: 2px solid #FFFFFF;
            }

            &:hover {
                transform: scale(0.95);
                transition: 0.25s;
                filter: contrast(0.5);
            }
        }
    }
}


@media (max-width: 1400px) {}

@media (max-width: 900px) {}

@media (max-width: 675px) {
    header {
        width: 100%;
        height: 5%;

        h1 {
            font-size: 2.2rem;
        }
    }
}
</style>