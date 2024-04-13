<template>
    <section class="product" v-if="!locked">
        <section :style="{ width: auto ? '50%' : '48%' }">
            <h3>{{ props.name }}</h3>
            <p>{{ props.speed }}m/s</p>
        </section>
        <section :style="{ width: auto ? '50%' : '48%' }">
            <h3>{{ props.count }}</h3>
            <p>{{ props.price }}m</p>
        </section>
        <div class="play" v-if="!auto">
            <i class="fa-solid fa-play"></i>
        </div>
    </section>
    <section class="lock" v-else>
        <i class="fa-solid fa-lock"></i>
    </section>
</template>

<script setup>
const props = defineProps({
    name: String,
    speed: Number,
    count: Number,
    price: Number,
    auto: Boolean,
    locked: Boolean
});
</script>

<style scoped lang="scss">
.product {
    border: 5px solid #FFFFFF;
    width: 90%;
    height: 15%;
    flex-shrink: 0;

    border-radius: 0.5rem;

    &:first-child {
        margin-top: 1rem;
    }

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
        font-size: 2rem;
        transition: 0.1s;

        &:active{
            transition: 0.1s;
            filter: invert(50%);
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
</style>
