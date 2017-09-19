export const apples = {
  id: '1_1',
  name: 'Apples',
};

export const pears = {
  id: '1_2',
  name: 'Pears',
};

export const fruits = {
  id: '1',
  name: 'Fruits',
  children: [
    apples,
    pears,
    {
      id: '1_3',
      name: 'Oranges',
    },
  ],
};

export const notInTree = {
  id: '3',
  name: 'Fruits',
};

export const allOptions = {
  id: '0',
  name: 'All categories',
  children: [
    fruits,
    {
      id: '2',
      name: 'Pets',
      children: [
        {
          id: '2_1',
          name: 'Dogs',
        },
        {
          id: '2_2',
          name: 'Cats',
        },
        {
          id: '2_3',
          name: 'Hamsters',
        },
      ],
    },
  ],
};
