<template>
    <div class="body">
        <header>
            <h1>travel clicker</h1>
        </header>
        <main>
            <article class="clicker">
                <section class="smallValue">
                    <p class="currency">{{ dataStore.distanceStr }}</p>
                    <p class="speed">0m/s</p>
                </section>
                <p class="currency">{{ dataStore.distanceStr }}</p>
                <section class="adder" @click="distClick"></section>
                <p class="speed">0m/s</p>
            </article>

            <article class="shop">
                <section class="wrapper">
                    <section class="nav">
                        <section class="ground">ground</section>
                        <section class="air">air</section>
                        <section class="water">water</section>
                    </section>
                    <ul class="purchase">
                        <Item v-for="(item, i) in dataStore.groundItems" :name="item.name" :speed="item.speed"
                            :count="item.count" :price="item.price" :auto="item.auto" :locked="item.locked" @click="buyItem(item.name, 1, item.locked)" />
                    </ul>
                </section>
            </article>
        </main>
    </div>
</template>

<script setup>
import { useDataStore } from '@/stores/dataStore';
import { useActionStore } from '@/stores/actionStore';

import Item from '@/components/Item.vue';

const dataStore = useDataStore();
const actionStore = useActionStore();

function distClick() {
    actionStore.addDistance(1);
}

function buyItem(itemName, type, locked) {
    actionStore.buyItem(itemName, type, locked);
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

                z-index: 100;
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
                }
            }
        }
    }
}
</style>