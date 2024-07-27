export const colors = {
  default: "#e8e8e8",
  colors: ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"],
  getColors: function (i: number) {
    return this.colors[i % this.colors.length];
  },
};
