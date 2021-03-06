import {
  getCurrentInstance,
  reactive,
  readonly,
  UnwrapRef,
  watchEffect,
  computed
} from "vue";
import { Indexable } from '../type/global';

export function useRuleFormItem<T extends Indexable>(
  props: T,
  key: keyof T = "value",
  changeEvent = "change"
) {
  const instance = getCurrentInstance();
  const emit = instance?.emit;

  const innerState = reactive({
    value: props[key]
  });

  const defaultState = readonly(innerState);

  const setState = (val: UnwrapRef<T[keyof T]>) => {
    innerState.value = val as T[keyof T];
  };

  watchEffect(() => {
    innerState.value = props[key];
  });

  const state = computed({
    get() {
      return innerState.value;
    },
    set(value) {
      innerState.value = value as T[keyof T];
      emit?.(changeEvent, value);
    }
  });

  return [state, setState, defaultState];
};