<template>
    <div class="comment">
        <p class="name flex-box"><span>{{ data.user.name }}</span><span>#{{ data.no }}</span></p>
        <p class="content">{{ data.content }}</p>
        <p class="date">{{ creTime }}</p>
    </div>
</template>

<script lang="ts">

import moment from 'moment';
import { computed, defineComponent, PropType } from 'vue';
import { Comment } from '../../../type/global';

export default defineComponent({
    props: {
        data: {
            type: Object as PropType<Comment>
        }
    },
    setup(props) {
        const creTime = computed(() => moment(props.data.creTime).format('YYYY-MM-DD HH:mm'));

        return {
            creTime
        }
    }
})
</script>

<style lang="scss" scoped>
.comment {
    .name {
        font-size: 17px;
        margin-bottom: 10px;
        color: #000;
    }
    .date {
        font-size: 14px;
        color: $color-disabled;
        margin-top: 10px;
        text-align: right;
    }
    .flex-box {
        justify-content: space-between;
        align-items: flex-end;
        & > span:nth-child(2) {
            color: $color-warn;
            font-size: 15px;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    padding: 16px 0;
    border-bottom: 1px solid $color-disabled-light;
}
</style>