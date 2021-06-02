import { Ref, onUnmounted } from "vue";
import { Fn } from "../type/global";
import { useElement } from "./useElement";
import { useThrottle } from "./useThrottle";

interface Options {
  useThrottle: boolean;
  timeout: number;
}

const defaultOptions = {
  useThrottle: false,
  timeout: 1000
};

export const useScroll = <T extends Element>(
  selector: string | Ref<T>,
  fn: Fn<Event, void>,
  options?: Options
): [ () => void, HTMLElement | T ] => {
  options = { ...defaultOptions, ...options };

  let element: HTMLElement | T;
  if (typeof selector === "string") {
    element = useElement<HTMLElement>(selector);
  } else {
    element = useElement<typeof selector.value>(selector);
  }

  const [throttleFn] = useThrottle((e: Event) => {
    fn(e);
  }, options.timeout);

  const callback = (e: Event) => {
    if (options?.useThrottle) {
      throttleFn(e);
    } else {
      fn(e);
    }
  };

  element.addEventListener("scroll", callback);

  const cancel = () => element.removeEventListener("scroll", callback);

  return [cancel, element]
};
