import marked from 'marked';
import { watch, ref, Ref, onUnmounted } from 'vue';
import { useThrottle } from './useThrottle';

export function useMarked(textRef: Ref<string>, options = {
    timeout: 1000,
    useThrottle: false
}): [ Ref<string>, string ] {

    const metadata = textRef.value;
    const richText = ref(marked(textRef.value));

    const [throttleFn, cancel] = useThrottle(() => {
        richText.value = marked(textRef.value);
    }, options.timeout)

    watch(textRef, () => {
        if (options.useThrottle) {
            throttleFn();
        } else {
            richText.value = marked(textRef.value);
        }
    });

    onUnmounted(() => {
        cancel();
    })

    return [richText, metadata];

}