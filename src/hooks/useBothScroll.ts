import { nextTick, Ref, ref } from 'vue';
import { useScroll } from './useScroll';

export type ScrollStatus = 0 | 1 | 2;

export const useBothScroll = <E extends Element, B extends Element>(elRef: Ref<E>, elRef2: Ref<B>) => {

    const precent = ref(0);
    const timer = ref(0);
    const scrollStatus = ref<ScrollStatus>(2);

    const [cancel1, element1] = useScroll<E>(elRef, () => {
        if (scrollStatus.value === 1) return;
        if (scrollStatus.value === 2) scrollStatus.value = 0;

        precent.value = element1.scrollTop / element1.scrollHeight;
        update(element2);
    }, { useThrottle: true, timeout: 10 });

    const [cancel2, element2] = useScroll<B>(elRef2, () => {
        if (scrollStatus.value === 0) return;
        if (scrollStatus.value === 2) scrollStatus.value = 1;

        precent.value = element2.scrollTop / element2.scrollHeight;
        update(element1);
    }, { useThrottle: true, timeout: 10 });

    const update = (element: E | B | HTMLElement) => {
        element.scrollTop = precent.value * element.scrollHeight;
        clearTimeout(timer.value);
        timer.value = setTimeout(() => {
            scrollStatus.value = 2;
        }, 100);
    }

    const cancel = () => {
        cancel1();
        cancel2();
    }

    return [cancel];
}