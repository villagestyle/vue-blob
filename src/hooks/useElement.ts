import { nextTick, Ref } from "vue";
import { Nullable } from "../type/global";

function useElement<T extends Element>(selector: string): T;
function useElement<T extends Element>(ref: Ref<T>): T;
function useElement<T extends Element>(selector: string | Ref<T>): Nullable<T> {
  if (typeof selector === "string") {
    return document.querySelector(selector);
  } else {
    return selector.value;
  }
}

export { useElement };
