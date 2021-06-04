<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useThrottle } from "../hooks/useThrottle";

interface Position {
  x: number;
  y: number;
}

export default defineComponent({
  setup() {
    const canvas = ref<HTMLCanvasElement>();
    const oldEv = ref<MouseEvent>();
    const drawState = ref<0 | 1>(0);
    const beginPosition = ref<Position>({ x: 0, y: 0 });

    const checkPosition = (
      ev: MouseEvent,
      offset?: Position
    ) => {
      offset = offset || { x: 0, y: 0 };
      if (!ev) return { x: 0, y: 0 };
      return { x: ev.pageX - offset.x, y: ev.pageY - offset.y };
    };

    const [draw] = useThrottle(
      (ev: MouseEvent, action: "move" | "draw") => {
        ev.preventDefault();
        const offset = {
          x: canvas.value.offsetLeft,
          y: canvas.value.offsetTop
        };
        const { x, y } = checkPosition(ev, offset);
        const ctx = canvas.value.getContext("2d");

        ctx.lineWidth = 3;
        ctx.beginPath();
        const oldPosition = checkPosition(oldEv.value, offset);
        // 1. 使用lineTo绘制
        ctx.moveTo(oldPosition.x, oldPosition.y);
        action === "draw" && ctx.lineTo(x, y);
        // 2. 使用quadraticCurveTo(贝塞尔曲线)绘制 https://zhuanlan.zhihu.com/p/46676386
        // ctx.moveTo(beginPosition.value.x, beginPosition.value.y);
        // action === "draw" && ctx.quadraticCurveTo(oldPosition.x, oldPosition.y, x, y);
        ctx.stroke();
        oldEv.value = ev;
        beginPosition.value = {
          x: (oldPosition.x + x) / 2,
          y: (oldPosition.y + y) / 2
        };
      },
      30
    );

    const mousedown = (e: MouseEvent) => {
      drawState.value = 1;
      beginPosition.value = checkPosition(e);
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
      const ctx = canvas.value.getContext("2d");
      ctx.shadowBlur = 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
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
