module.exports = {
  Strategy: {
    splitEqually: {
      MIN_TO_LEND: 150,
      NUM_ALL_IN: 1100,
      SPLIT_UNIT: 1000,
      RATE_EXPECTED_OVER_AMOUNT: 50000
    },
    splitPyramidally: {
      MIN_TO_LEND: 150,
      UP_BOUND_RATE: 0.001, // around 40% annual rate
      LOW_BOUND_RATE: 0.00045, // around 10% annual rate
      AMOUNT_GROW_EXP: 1.4,
      AMOUNT_INIT_MAP: [
        [0.0009, 1200],
        [0.0008, 600],
        [0.0007, 500],
        [0.0006, 450],
        [0.0005, 300],
        [0.0004, 200]
      ],
      RATE_EXPECTED_OVER_AMOUNT: 10000,
      MIN_RATE: 0.00027
    }
  },
  Rate: {
    EXPECTED_AMOUNT: 50000
  },
  Period: {
    PERIOD_MAP: [
      [0.3, 30],
      [0.25, 30],
      [0.24, 30],
      [0.23, 30],
      [0.22, 30],
      [0.2, 5],
      [0.15, 5],
      [0.12, 2],
      [0.11, 2]
    ]
  }
};
