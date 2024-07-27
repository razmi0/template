import { Nsize, defColor, itemsData } from "./constant";
import { isDefined } from "./utils";

const setAnims = (
  { from, to, except, on }: { from?: number; to?: number; except?: number; on?: number },
  action: "apply" | "reset" | undefined = "apply"
) => {
  const getColor = (i: number) => (action === "apply" ? itemsData[i].color : defColor);
  const getHeight = () => (action === "apply" ? "100%" : "100px");

  if (isDefined(on)) {
    itemsData[on].element.style.backgroundColor = getColor(on);
    itemsData[on].element.style.height = getHeight();
    return;
  }
  if (isDefined(from) && isDefined(to)) {
    if (from < 0 || to > Nsize) return;
    for (let i = from; i <= to; i++) {
      if (i === except) continue;
      itemsData[i].element.style.backgroundColor = getColor(i);
      itemsData[i].element.style.height = getHeight();
    }
  }
};

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  if (x <= itemsData[0].end) {
    setAnims({ on: 0 });
    setAnims({ from: 1, to: Nsize - 1 }, "reset");
    return;
  } else if (x >= itemsData[Nsize - 1].start) {
    setAnims({ on: Nsize - 1 });
    setAnims({ from: 0, to: Nsize - 2 }, "reset");
    return;
  }
  for (let i = 0; i < Nsize - 1; i++) {
    if (x >= itemsData[i].start && x <= itemsData[i].end) {
      setAnims({ on: i });
      setAnims({ from: 0, to: Nsize - 1, except: i }, "reset");
      return;
    }
  }
});
