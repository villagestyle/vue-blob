import { nextTick, Ref, ref } from 'vue';
import { useScroll } from './useScroll';

export const useBothScroll = <E extends Element, B extends Element>(elRef: Ref<E>, elRef2: Ref<B>) => {

    const precent = ref(0);
    const element1ScrollHeight = ref(0);
    const element2ScrollHeight = ref(0);

    // const [cancel1, element1] = useScroll<E>(elRef, (e) => {
    //     console.log('element1 scroll');
    //     element1ScrollHeight.value = element1.scrollHeight;
    //     precent.value = element1.scrollTop / element1ScrollHeight.value;
    //     update(1);
    // }, { useThrottle: true, timeout: 100 });

    // const [cancel2, element2] = useScroll<B>(elRef2, (e) => {
    //     console.log('element2 scroll');
    //     element2ScrollHeight.value = element1.scrollHeight;
    //     precent.value = element2.scrollTop / element2ScrollHeight.value;
    //     update(0);
    // }, { useThrottle: true, timeout: 100 });

    // element1ScrollHeight.value = element1.scrollHeight;
    // element2ScrollHeight.value = element1.scrollHeight;

    // const update = (index: 0 | 1) => {
    //     if (index === 1) {
    //         element2.scrollTo({top: precent.value * element2ScrollHeight.value})
    //     } else {
    //         element1.scrollTo({top: precent.value * element1ScrollHeight.value})
    //     }
    // }

    // const cancel = () => {
    //     cancel1();
    //     cancel2();
    // }

    return [cancel];
}