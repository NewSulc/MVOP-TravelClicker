<template>
    <div class="body">
        <header>
            <h1>travel clicker</h1>
        </header>
        <main>
            <i id="settings" class="fa-solid fa-gear" @click="pushRouter('/settings')"></i>

            <article class="clicker">
                <section class="smallValue">
                    <p class="currency">{{ dataStore.distanceStr }}</p>
                    <p class="speed">{{ dataStore.autoSpeedStr }}/s</p>
                </section>
                <p class="currency">{{ dataStore.distanceStr }}</p>
                <section class="adder" @click="distClick"></section>
                <p class="speed">{{ dataStore.autoSpeedStr }}/s</p>
            </article>

            <article class="shop">
                <section class="wrapper">
                    <section class="nav">
                        <section :class="{ 'selected': selectedTab == 'ground' }" @click="selectTab(`ground`)"
                            class="ground">ground</section>
                        <section :class="{ 'selected': selectedTab == 'air' }" @click="selectTab(`air`)" class="air">air
                        </section>
                        <section :class="{ 'selected': selectedTab == 'water' }" @click="selectTab(`water`)"
                            class="water">
                            water</section>
                    </section>
                    <ul class="purchase">
                        <item :style="{ 'display': selectedTab == `ground` ? 'flex' : 'none' }"
                            v-for="(item, i) in dataStore.groundItems" :name="item.name" :speed="item.speed"
                            :count="item.count" :price="item.price" :auto="item.auto" :locked="item.locked" :type="1"
                            :goal="item.goal" />

                        <div class="more" v-if="!haveAir"
                            :style="{ 'display': selectedTab == `air` ? 'flex' : 'none' }">
                            <h2>Buy AIR for 1000km</h2>
                            <button @click="buyAirWater(true)">BUY NOW</button>
                        </div>
                        <Item v-else :style="{ 'display': selectedTab == `air` ? 'flex' : 'none' }"
                            v-for="(item, i) in dataStore.airItems" :name="item.name" :speed="item.speed"
                            :count="item.count" :price="item.price" :auto="item.auto" :locked="item.locked" :type="2"
                            :goal="item.goal" />

                        <div class="more" v-if="!haveWater"
                            :style="{ 'display': selectedTab == `water` ? 'flex' : 'none' }">
                            <h2>Buy Water for 2500000km</h2>
                            <button @click="buyAirWater(false)">BUY NOW</button>
                        </div>
                        <Item v-else :style="{ 'display': selectedTab == `water` ? 'flex' : 'none' }"
                            v-for="(item, i) in dataStore.waterItems" :name="item.name" :speed="item.speed"
                            :count="item.count" :price="item.price" :auto="item.auto" :locked="item.locked" :type="3"
                            :goal="item.goal" />
                    </ul>
                </section>
            </article>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

import { useDataStore } from '@/stores/dataStore';
import { useActionStore } from '@/stores/actionStore';
import { useSaveStore } from '@/stores/saveStore'

import { useRouter } from 'vue-router';
const router = useRouter();

import Item from '@/components/Item.vue';

const dataStore = useDataStore();
const actionStore = useActionStore();
const saveStore = useSaveStore();

function distClick() {
    actionStore.addDistance(1);
    saveStore.saveDistance();
    saveStore.saveLastAction();
}

const selectedTab = ref("ground");

function selectTab(val) { selectedTab.value = val; }

function pushRouter(path) { router.push(path); }

const haveAir = ref(false);
const haveWater = ref(false);

function buyAirWater(isAir) {
    if (isAir) {
        if (dataStore.distance >= 1000000) {
            localStorage.setItem("haveAir", true);
            dataStore.distance -= 1000000;
            haveAir.value = true;
        }
        else console.log("nuh uh")
    }
    else {
        if (dataStore.distance >= 2500000000) {
            localStorage.setItem("haveWater", true);
            dataStore.distance -= 2500000000;
            haveWater.value = true;
        }
    }
    saveStore.saveDistance();
}

onMounted(() => {
    if(localStorage.getItem("haveAir")) haveAir.value = true;
    if(localStorage.getItem("haveWater")) haveWater.value = true;
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

    position: relative;

    #settings {
        color: #FFFFFF;
        position: absolute;
        top: 0%;
        right: 0%;
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
}

.clicker {
    user-select: none;
    height: 100%;
    width: 40%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    font-size: 2.5rem;
    font-weight: 700;
    gap: 4rem;

    >.smallValue {
        display: none;
    }

    >.adder {
        height: 40%;
        aspect-ratio: 1;
        outline: 5px solid #FFFFFF;
        border-radius: 50%;
        transition: 0.1s;

        &:active {
            outline: 10px solid #FFFFFF;
            transition: 0.1s;
        }
    }
}

.shop {
    height: 100%;
    width: 60%;

    display: flex;
    justify-content: center;
    align-items: center;

    >.wrapper {
        width: 65%;
        height: 80%;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        >.nav {
            width: 50%;
            height: 7%;

            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2rem;

            >section {
                width: 100%;
                height: 100%;

                display: flex;
                justify-content: center;
                align-items: center;

                text-transform: capitalize;

                outline: solid 5px;
                border-radius: 1rem 1rem 0 0;

                z-index: 0;
                transition: 0.3s;
            }

            >.selected {
                background-color: #FFFFFF;
                color: #1B1B1F;
                outline: solid 5px #FFFFFF;
                transition: 0.3s;
            }
        }

        >.purchase {
            width: 100%;
            height: 93%;
            border: solid 5px;
            border-radius: 2rem;

            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 1rem;

            overflow-y: auto;

            padding-top: 1rem;

            >.more {
                display: flex;
                flex-direction: column;
                gap: 2rem;

                h2 {
                    font-size: 2rem;
                }

                button {
                    background: none;
                    border: solid white 3px;
                    border-radius: 1rem;
                    color: white;
                    padding: 1.5rem 0rem;
                    font-size: 1.25rem;
                    transition: 0.25s;

                    &:hover {
                        transform: scale(0.95);
                        transition: 0.25s;
                        filter: contrast(0.5);
                    }
                }
            }
        }
    }
}

@media (max-width: 1400px) {
    main {
        >.shop {
            >.wrapper {
                >.nav {
                    width: 75%;
                }
            }
        }
    }
}

@media (max-width: 900px) {
    main {
        flex-direction: column;

        >.clicker {
            width: 100%;
            height: 30%;

            flex-direction: row;

            >.adder {
                height: 65%;
            }
        }

        >.shop {
            width: 100%;
            height: 70%;

            >.wrapper {
                width: 90%;
                height: 100%;
            }
        }
    }
}

@media (max-width: 675px) {
    header {
        width: 100%;
        height: 5%;

        h1 {
            font-size: 2.2rem;
        }
    }

    .body {
        #settings {
            top: 18%;
        }
    }

    main {
        flex-direction: column;

        >.clicker {
            gap: 2rem;

            >.currency,
            >.speed {
                display: none;
            }

            flex-direction: column;

            >.smallValue {
                display: flex;
                width: 100%;
                font-size: 2rem;
                justify-content: center;
                align-items: center;
                gap: 3rem;
                font-weight: 300;
            }

            >.adder {
                height: 45%;
            }
        }

        >.shop {
            >.wrapper {
                >.nav {
                    width: 100%;
                }

                >.purchase {
                    border-radius: 0 0 2rem 2rem;

                    >.more {
                        display: flex;
                        flex-direction: column;
                        gap: 2rem;

                        h2 {
                            font-size: 1.5rem;
                        }

                        button {
                            border-radius: 1rem;
                            padding: 1rem 0rem;
                            font-size: 1rem;
                        }
                    }
                }
            }
        }
    }
}
</style>