import { colors } from "./colors";

export type ItemData = {
  start: number;
  end: number;
  top: number;
  bottom: number;
  color: string;
  element: HTMLDivElement;
  done: boolean;
};

const wrappers = Array.from(document.querySelectorAll(".wrapper")) as HTMLDivElement[];

const items: Record<number, ItemData[]> = {};
for (let i = 0; i < wrappers.length; i++) {
  const elements = Array.from(wrappers[i].querySelectorAll(".element")) as HTMLDivElement[];
  for (let y = 0; y < elements.length; y++) {
    const element = elements[y];
    let itemData = {
      start: element.getBoundingClientRect().left + window.scrollX,
      end: element.getBoundingClientRect().right + window.scrollX,
      top: element.getBoundingClientRect().top + window.scrollY,
      bottom: element.getBoundingClientRect().bottom + window.scrollY,
      color: colors.getColors(y),
      element: element,
      done: false,
    };
    items[i] ? items[i].push(itemData) : (items[i] = [itemData]);
  }
}
console.log(items);

export { items };
