const wrapper = document.querySelector(".wrapper") as HTMLDivElement;
const items = Array.from(wrapper.querySelectorAll("div")) as HTMLDivElement[];

const defColor = "#e8e8e8";
const colors = ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"];
const itemsData = items.map((item, i) => {
  return {
    start: item.getBoundingClientRect().left,
    end: item.getBoundingClientRect().right,
    color: colors[i],
    element: item,
  };
});

const leftStart = itemsData[0].start;
const rightEnd = itemsData[itemsData.length - 1].end;

console.log(itemsData);

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  itemsData.forEach((item) => {
    const { start, end, color, element } = item;
    if (x > start && x < end) {
      element.style.backgroundColor = color;
      element.style.height = "100%";
    } else if (x < leftStart) {
      itemsData[0].element.style.backgroundColor = itemsData[0].color;
      itemsData[0].element.style.height = "100%";
    } else if (x > rightEnd) {
      itemsData[itemsData.length - 1].element.style.backgroundColor = itemsData[itemsData.length - 1].color;
      itemsData[itemsData.length - 1].element.style.height = "100%";
    } else {
      element.style.backgroundColor = defColor;
      element.style.height = "100px";
    }
  });
});
