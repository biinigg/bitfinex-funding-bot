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
        [0.0006, 400],
        [0.0005, 350],
        [0.0004, 200]
      ],
      RATE_EXPECTED_OVER_AMOUNT: 10000,
      MIN_RATE: 0.00023
    }
  },
  Rate: {
    EXPECTED_AMOUNT: 50000
  },
  Period: {
    PERIOD_MAP: [
      [0.3, 120],
      [0.25, 120],
      [0.24, 90],
      [0.23, 90],
      [0.22, 90],
      [0.2, 90],
      [0.15, 60],
      [0.12, 30],
      [0.11, 30],
      [0.10, 15],
      [0.09, 10]
    ]
  }
};
