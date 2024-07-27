type Animation = {
  initial: {
    [key: string]: string;
  };
  active: {
    [key: string]: string;
  };
};

const animations: Record<number, Animation> = {
  0: {
    initial: {
      height: "100px",
    },
    active: {
      height: "75vh",
    },
  },

  1: {
    initial: {
      width: "250px",
    },
    active: {
      width: "100%",
    },
  },
} as const;

export { animations };
