<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useThrottle } from "../hooks/useThrottle";

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>();
    const oldEv = ref<MouseEvent>();
    const drawState = ref<0 | 1>(0);

    const checkPosition = (
      ev: MouseEvent,
      offset: { x: number; y: number }
    ) => {
      if (!ev) return { x: 0, y: 0 };
      return { x: ev.pageX - offset.x, y: ev.pageY - offset.y };
    };

    const [draw] = useThrottle(
      (ev: MouseEvent, action: "move" | "draw" | "end") => {
        ev.preventDefault();
        const offset = {
          x: canvas.value.offsetLeft,
          y: canvas.value.offsetTop
        };
        const { x, y } = checkPosition(ev, offset);
        const ctx = canvas.value.getContext("2d");

        ctx.beginPath();
        const oldPosition = checkPosition(oldEv.value, offset);
        ctx.moveTo(oldPosition.x, oldPosition.y);
        action === "draw" && ctx.lineTo(x, y);
        console.log("chufa");
        ctx.stroke();
        oldEv.value = ev;
      },
      30
    );

    const mousedown = (e: MouseEvent) => {
      drawState.value = 1;
      draw(e, "move");
    };

    const mouseup = (e: MouseEvent) => {
      drawState.value = 0;
      draw(e, "move");
    };

    const mousemove = (e: MouseEvent) => {
      draw(e, drawState.value ? "draw" : "move");
    };

    const initCanvasDraw = () => {
      canvas.value.width = 500;
      canvas.value.height = 500;
      canvas.value.addEventListener("mousedown", mousedown);
      canvas.value.addEventListener("mouseup", mouseup);
      canvas.value.addEventListener("mousemove", mousemove);
    };

    onMounted(() => {
        initCanvasDraw();
    })

    return {
      canvas
    }
  }
});
</script>

<style lang="scss" scoped>
canvas {
  width: 500px;
  height: 500px;
  border: 1px solid #000;
}
</style>
