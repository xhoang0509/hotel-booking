'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('rooms', [
            {
                name: 'Deluxe Giường Cỡ Queen',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Deluxe 2 Giường Đơn',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/433132773.jpg?k=6881f7e521403639dfcffffd84a98f0029ee64503a2c1fe0ad980790f3ad5c2e&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Grand Deluxe Có Giường Cỡ Queen',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/433132831.jpg?k=a74dd1ac819b46897b0a87d65465b95f30c1c24733aaf19d16b5b6c76ee4a595&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Grand Deluxe 2 Giường đơn',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/433132909.jpg?k=87979689a8b6c88a4a74fe6c1be529823e051f1f3f6b27d24b8adc8379496b9e&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Deluxe 2 Giường đơn Nhìn ra Biển',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/433132649.jpg?k=639c7147b48ebf30812d47cb14793f07f03235498a8e4aeffae255e71fb4e67a&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Grand Deluxe Có Giường Cỡ Queen Nhìn Ra Biển',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942020.jpg?k=afd9a86daf0cd08d332249a15d24d4737c8f52cf82ff5929d72d7c3bf2fd1391&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Grand Deluxe 2 Giường Đơn Nhìn Ra Biển',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941729.jpg?k=383642903cb8b68baf7814c47b5516b4ee636bfd92ece3c00a94e88d76e12744&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Deluxe Có Giường Cỡ Queen - Vé Vào Công Viên Giải Trí VinWonders',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Deluxe 2 Giường Đơn - Vé Vào Công Viên Giải Trí VinWonders',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Grand Deluxe Có Giường Cỡ Queen - Vé Vào Công Viên Giải Trí VinWonders',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Grand Deluxe 2 Giường Đơn - Vé Vào Công Viên Giải Trí VinWonders',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Deluxe 2 Giường Đơn Hướng Biển - Quyền Sử Dụng Công Viên VinWonders',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Grand Deluxe Có Giường Cỡ Queen Nhìn Ra Biển - Vé Vào Công Viên Giải Trí VinWonders',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Phòng Grand Deluxe 2 Giường Đơn Nhìn Ra Biển - Vé Vào Công Viên Giải Trí VinWonders',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941731.jpg?k=0f6d84a67d6a8bd94aba1e17d3a45abd51b075ee9f4cc965def0c5431f2f2e59&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Biệt Thự 3 Phòng Ngủ Nhìn Ra Đại Dương - Hồ Bơi Riêng',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
            {
                name: 'Biệt Thự 3 Phòng Ngủ Nhìn Ra Biển - Hồ Bơi Riêng - Vé Vào Công Viên Giải Trí VinWonders',
                bed: 2,
                bedDetail: '2 giường đôi lớn',
                description:
                    'Kết hợp giữa lối trang trí theo phong cách hiện đại và Việt Nam, các phòng này có tầm nhìn ra quang cảnh đảo hoặc khu vườn nhiệt đới. Các phòng được trang bị TV màn hình LCD, két an toàn, minibar, tiện nghi pha trà/cà phê miễn phí, bàn viết và Ethernet/đường dây Internet riêng biệt bên cạnh WiFi miễn phí. Một số phòng có ban công. Phòng tắm riêng đi kèm bồn tắm và vòi sen riêng biệt.',
                oldPrice: '6120000',
                newPrice: '5500000',
                checkInDate: null,
                checkOutDate: null,
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942021.jpg?k=7a31f485e08f0ebfa1edb555ec75ebd6ac771216a3e0d25f6b63ae2690faa157&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {},
};
