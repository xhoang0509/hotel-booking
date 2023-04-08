'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('locations', [
      {
        name: 'Royal Lotus Hotel',
        address: 'Cau Giay, Hà Nội',
        images: JSON.stringify(
          [
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/327823438.webp?k=99d4aa4fef5415705bfd7241900b85680320375583219a94962e5ab8baca337a&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
          ]),
        thumbnail: "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
        description: "Set in Hanoi, 2.5 km from Vincom Center Nguyen Chi Thanh, Royal Lotus Hotel offers accommodation with a shared lounge, free private parking and a terrace.",
        phone: '0857812113',
        cityId: 1
      },
      {
        name: 'Royal Lotus Hotel',
        address: 'Cau Giay, Hà Nội',
        images: JSON.stringify(
          [
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/327823438.webp?k=99d4aa4fef5415705bfd7241900b85680320375583219a94962e5ab8baca337a&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
          ]),
        thumbnail: "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
        description: "Set in Hanoi, 2.5 km from Vincom Center Nguyen Chi Thanh, Royal Lotus Hotel offers accommodation with a shared lounge, free private parking and a terrace.",
        phone: '0857812113',
        cityId: 1
      },
      {
        name: 'Royal Lotus Hotel',
        address: 'Cau Giay, Hà Nội',
        images: JSON.stringify(
          [
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/327823438.webp?k=99d4aa4fef5415705bfd7241900b85680320375583219a94962e5ab8baca337a&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
          ]),
        thumbnail: "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
        description: "Set in Hanoi, 2.5 km from Vincom Center Nguyen Chi Thanh, Royal Lotus Hotel offers accommodation with a shared lounge, free private parking and a terrace.",
        phone: '0857812113',
        cityId: 1
      },
      {
        name: 'Royal Lotus Hotel',
        address: 'Cau Giay, Hà Nội',
        images: JSON.stringify(
          [
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/327823438.webp?k=99d4aa4fef5415705bfd7241900b85680320375583219a94962e5ab8baca337a&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
          ]),
        thumbnail: "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
        description: "Set in Hanoi, 2.5 km from Vincom Center Nguyen Chi Thanh, Royal Lotus Hotel offers accommodation with a shared lounge, free private parking and a terrace.",
        phone: '0857812113',
        cityId: 1
      },
      {
        name: 'Royal Lotus Hotel',
        address: 'Cau Giay, Hà Nội',
        images: JSON.stringify(
          [
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/327823438.webp?k=99d4aa4fef5415705bfd7241900b85680320375583219a94962e5ab8baca337a&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
          ]),
        thumbnail: "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
        description: "Set in Hanoi, 2.5 km from Vincom Center Nguyen Chi Thanh, Royal Lotus Hotel offers accommodation with a shared lounge, free private parking and a terrace.",
        phone: '0857812113',
        cityId: 1
      },
      {
        name: 'Royal Lotus Hotel',
        address: 'Cau Giay, Hà Nội',
        images: JSON.stringify(
          [
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/327823438.webp?k=99d4aa4fef5415705bfd7241900b85680320375583219a94962e5ab8baca337a&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
            "https://cf.bstatic.com/xdata/images/hotel/square200/415261788.webp?k=0a9c0864e7766854961ba24df58e494d37064aeda136936f922207a9748746c3&o=&s=1",
          ]),
        thumbnail: "https://cf.bstatic.com/xdata/images/hotel/square200/298481447.webp?k=929ef8e04b6a65808c19c4b8b0865d2890b23099ddb8c7027f7614b67ac95ca8&o=&s=1",
        description: "Set in Hanoi, 2.5 km from Vincom Center Nguyen Chi Thanh, Royal Lotus Hotel offers accommodation with a shared lounge, free private parking and a terrace.",
        phone: '0857812113',
        cityId: 1
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
  }
};
