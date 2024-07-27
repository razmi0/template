export const wrapper = document.querySelector(".wrapper") as HTMLDivElement;
export const items = Array.from(wrapper.querySelectorAll("div")) as HTMLDivElement[];
export const Nsize = items.length;

export const defColor = "#e8e8e8";
export const colors = ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"];

export const itemsData = items.map((item, i) => {
  return {
    start: item.getBoundingClientRect().left,
    end: item.getBoundingClientRect().right,
    color: colors[i],
    element: item,
    done: false,
  };
});
