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
                checkInDate: '',
                checkOutDate: '',
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
                checkInDate: '',
                checkOutDate: '',
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
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
                checkInDate: '',
                checkOutDate: '',
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
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
                checkInDate: '',
                checkOutDate: '',
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
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
                checkInDate: '',
                checkOutDate: '',
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
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
                checkInDate: '',
                checkOutDate: '',
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
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
                checkInDate: '',
                checkOutDate: '',
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
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
                checkInDate: '',
                checkOutDate: '',
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
                checkInDate: '',
                checkOutDate: '',
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
                checkInDate: '',
                checkOutDate: '',
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
                checkInDate: '',
                checkOutDate: '',
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
                checkInDate: '',
                checkOutDate: '',
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
                checkInDate: '',
                checkOutDate: '',
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
                checkInDate: '',
                checkOutDate: '',
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
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
                checkInDate: '',
                checkOutDate: '',
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
                checkInDate: '',
                checkOutDate: '',
                images: JSON.stringify([
                    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                ]),
                options: '',
                locationId: 1,
                point: 500000,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {},
};
