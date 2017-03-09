exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(() => {
      // Inserts seed entries
      return knex('products').insert([
        { id: 1, name: 'VISI/pocket', category: 'firstClass', price: 999, active: true },
        { id: 2, name: 'VISI/frame', category: 'secondClass', price: 888, active: true },
        { id: 3, name: 'VISI/sticker', category: 'thirdClass', price: 777, active: true },
        { id: 4, name: 'VISI/display', category: 'premiumClass', price: 9999, active: true },
      ]);
    });
};
