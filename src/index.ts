import { animations } from "./animations";
import { colors } from "./colors";
import { items, type ItemData } from "./items";
import { isDefined } from "./utils";

type SetAnimationOptions = {
  from?: number;
  to?: number;
  except?: number[];
  on?: number;
  animType: number;
};

const setAnims = (
  { from, to, except, on, animType }: SetAnimationOptions,
  action: "apply" | "reset" | undefined = "apply"
) => {
  const data = items[animType] as ItemData[];

  const getColor = (i: number) => (action === "apply" ? data[i].color : colors.default);
  const getAnimation = () => (action === "apply" ? animations[animType].active : animations[animType].initial);

  if (isDefined(on)) {
    data[on].element.style.backgroundColor = getColor(on);
    const animation = getAnimation();

    for (const key in animation) {
      // @ts-ignore
      data[on].element.style[key] = animation[key];
    }

    return;
  }
  if (isDefined(from) && isDefined(to)) {
    if (from < 0 || to > data.length) return;
    for (let i = from; i <= to; i++) {
      if (except && except.some((exception) => i === exception)) continue;
      data[i].element.style.backgroundColor = getColor(i);
      const animation = getAnimation();

      for (const key in animation) {
        // @ts-ignore
        data[i].element.style[key] = animation[key];
      }
    }
  }
};

const growFromCenter = (x: number) => {
  const animType = 0;
  const data = items[animType];
  const size = data.length;
  if (x <= data[0].end) {
    setAnims({ on: 0, animType });
    setAnims({ from: 1, to: size - 1, animType }, "reset");
    return;
  } else if (x >= data[size - 1].start) {
    setAnims({ on: size - 1, animType });
    setAnims({ from: 0, to: size - 2, animType }, "reset");
    return;
  }
  for (let i = 0; i < size - 1; i++) {
    if (x >= data[i].start && x <= data[i].end) {
      setAnims({ on: i, animType });
      setAnims({ from: 0, to: size - 1, except: [i], animType }, "reset");
      return;
    }
  }
};

const growToCenter = (y: number) => {
  let animType = 1;
  const data = items[animType];
  const size = data.length;

  if (y <= data[0].bottom) {
    setAnims({ from: 0, to: 1, animType });
    setAnims({ from: 2, to: size - 1, animType }, "reset");
    return;
  } else if (y >= data[size - 1].top) {
    setAnims({ from: size - 2, to: size - 1, animType });
    setAnims({ from: 0, to: size - 3, animType }, "reset");
    return;
  }
  for (let i = 0; i < size - 1; i++) {
    if (y >= data[i].top && y <= data[i].bottom) {
      setAnims({ from: i, to: i + 1, animType: 1 });
      setAnims({ from: 0, to: size - 1, except: [i, i + 1], animType: 1 }, "reset");
      return;
    }
  }
};

document.addEventListener("mousemove", (e) => {
  const x = e.pageX;
  const y = e.pageY;
  /** SECTION 1 */
  growFromCenter(x);
  /** SECTION 2 */
  growToCenter(y);
});
