<template>
    <section class="product" v-if="!locked">
        <section :style="{ width: auto ? '50%' : '45%' }" @click="buyItem()">
            <h3>{{ props.name }}</h3>
            <p>{{ props.speed }}m/s</p>
        </section>
        <section :style="{ width: auto ? '50%' : '45%' }" @click="buyItem()">
            <h3>{{ props.count }}</h3>
            <p>{{ props.price }}m</p>
        </section>
        <div class="play" v-if="!auto">
            <i class="fa-solid fa-play" @click="loadItem()"></i>
            <i v-if="props.count > 0" class="fa-solid fa-bullseye" @click="tryChallenge()"></i>
        </div>
        <div class="load" :class="{ 'animate': loading }"></div>
    </section>
    <section class="lock" v-else>
        <i class="fa-solid fa-lock"></i>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDataStore } from '@/stores/dataStore';
import { useActionStore } from '@/stores/actionStore';
import { useSaveStore } from '@/stores/saveStore';

const dataStore = useDataStore();
const actionStore = useActionStore();
const saveStore = useSaveStore();

const router = useRouter();

const props = defineProps({
    name: String,
    speed: Number,
    count: Number,
    price: Number,
    auto: Boolean,
    locked: Boolean,
    type: Number
});

const loading = ref(false);

function loadItem() {
    if (!loading.value && props.count > 0) {
        loading.value = true;
        setTimeout(() => {
            loading.value = false;
            dataStore.distance += props.speed * props.count;
            saveStore.saveDistance();
        }, 1000);
    }
}

onMounted(() => {
    loadItem();
})

function buyItem() {
    actionStore.buyItem(props.name, props.type, props.locked);
    if (props.auto) {
        dataStore.autoSpeed += props.speed;
        saveStore.saveAutoSpeed();
    }
}

function tryChallenge() {
    router.push(`/challenge/${props.type}/${props.name}/${props.speed}/${props.count}`)
}
</script>

<style scoped lang="scss">
.product {
    border: 5px solid #FFFFFF;
    width: 90%;
    height: 15%;
    flex-shrink: 0;

    position: relative;

    border-radius: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    >section {
        width: 45%;
        height: 100%;

        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 0.5rem;

        z-index: 5;

        &:first-child {
            align-items: start;

            >h3,
            p {
                padding-left: 1rem;
            }
        }

        &:nth-child(2) {
            align-items: end;

            >h3,
            p {
                padding-right: 1rem;
            }
        }

        >h3 {
            font-size: 2rem;
        }
    }

    >.play {
        height: 100%;
        width: 10%;
        color: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 2rem;
        z-index: 5;

        i {
            transition: 0.1s;

            &:active {
                transition: 0.1s;
                filter: invert(50%);
            }
        }
    }

    .load {
        width: 0%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.15);
        position: absolute;
        left: 0;

        &.animate {
            animation-name: loadItemAnim;
            animation-timing-function: ease;
            animation-duration: 1s;
        }
    }
}

.lock {
    border: 5px solid #FFFFFF;
    width: 90%;
    height: 15%;
    flex-shrink: 0;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}

@media (max-width: 500px) {
    .product {
        >section {
            h3 {
                font-size: 1.5rem;
            }
        }

        .play {
            font-size: 1.5rem;
        }
    }
}

@keyframes loadItemAnim {
    from {
        width: 0%;
    }

    to {
        width: 100%;
    }
}
</style>
