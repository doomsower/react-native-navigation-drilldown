export const apples = {
  id: '1_1',
  name: 'Apples',
};

export const pears = {
  id: '1_2',
  name: 'Pears',
};

export const oranges = {
  id: '1_3',
  name: 'Oranges',
};

export const fruits = {
  id: '1',
  name: 'Fruits',
  children: [
    apples,
    pears,
    oranges,
  ],
};

export const notInTree = {
  id: '3',
  name: 'Fruits',
};

export const dogs = {
  id: '2_1',
  name: 'Dogs',
};

export const cats = {
  id: '2_2',
  name: 'Cats',
};

export const hamsters = {
  id: '2_3',
  name: 'Hamsters',
};

export const pets = {
  id: '2',
  name: 'Pets',
  children: [
    dogs,
    cats,
    hamsters,
  ],
};

export const allOptions = {
  id: '0',
  name: 'Categories',
  children: [
    fruits,
    pets,
  ],
};
