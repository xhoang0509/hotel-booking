'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // categories
        await queryInterface.bulkInsert('categories',
            [
                {
                    name: "Khách sạn",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&amp;o=",
                },
                {
                    name: "Căn hộ",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/119467716.jpeg?k=63b69100225782d08fbd4d0205bf949c0be894ab946a0366edb8ad48e9c0ef46&amp;o=",
                },
                {
                    name: "Resort",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&amp;o=",
                },
                {
                    name: "Biệt thự",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/100235855.jpeg?k=61ef6692e05b5971e2e8dc75687f844e6d0ad295a9a5ace17f7c713f167e61b5&amp;o=",
                },
                {
                    name: "Nhà gỗ",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/52979454.jpeg?k=98337a30d1016ebce1cbebb9e24ba4585f535438bc455ff9efcaee27960ac8b2&amp;o=",
                },
                {
                    name: "Nhà nghỉ thôn dã",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450074.jpeg?k=7039b03a94f3b99262c4b3054b0edcbbb91e9dade85b6efc880d45288a06c126&amp;o=",
                },
                {
                    name: "Glamping",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450090.jpeg?k=52f6b8190edb5a9c91528f8e0f875752ce55a6beb35dc62873601e57944990e4&amp;o=",
                },
                {
                    name: "Khách sạn căn hộ",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450058.jpeg?k=2449eb55e8269a66952858c80fd7bdec987f9514cd79d58685651b7d6e9cdfcf&amp;o=",
                },
                {
                    name: "Nhà nghỉ mát",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450113.jpeg?k=76b3780a0e4aacb9d02ac3569b05b3c5e85e0fd875287e9ac334e3b569f320c7&amp;o=",
                },
                {
                    name: "Nhà khách",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&amp;o=",
                },
                {
                    name: "Nhà trọ",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450082.jpeg?k=beb101b827a729065964523184f4db6cac42900c2415d71d516999af40beb7aa&amp;o=",
                },
                {
                    name: "Nhà nghỉ ven đường",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450093.jpeg?k=aa5cc7703f3866af8ffd6de346c21161804a26c3d0a508d3999c11c337506ae1&amp;o=",
                },
                {
                    name: "Nhà nghỉ B&amp;B",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450056.jpeg?k=251e2507d43a24a4c58bb961b8d157147d56efbf91b49f9606bc768c58f581e4&amp;o=",
                },
                {
                    name: "Ryokan",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450279.jpeg?k=cb9ab85ffe439f3030e00281f2d52583a398bf076e54f00f746e1d1baf62bf6e&amp;o=",
                },
                {
                    name: "Riad",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450064.jpeg?k=4d4ea22dc4828fd55a3889e90531c9841ddb2d9abf460c420cdd24f2a9b658d2&amp;o=",
                },
                {
                    name: "Công viên nghỉ mát",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450068.jpeg?k=41cc7c5449011323aaaaed4e845cb16200b5d540c77a50c1bea90399a1e92d70&amp;o=",
                },
                {
                    name: "Chỗ nghỉ nhà dân",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450066.jpeg?k=4adfab312f5d26da9f81da48d8c95ca8f108215b2c84085590891a9e0e17b144&amp;o=",
                },
                {
                    name: "Khu cắm trại",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450283.jpeg?k=44ef0e355cff36883935e4c99b5c01b035eabebad278d22363210b2fe40b2791&amp;o=",
                },
                {
                    name: "Nhà nghỉ nông thôn",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450103.jpeg?k=a1fa72362160b1df6e288050afa7ce1aade80871acd368ddd4a4ebf6ad87764e&amp;o=",
                },
                {
                    name: "Nhà nghỉ trang trại",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450080.jpeg?k=15d9709efa513f2b23b5fa8d5234d87bdee2bf97b3e7552244592da11413db9a&amp;o=",
                },
                {
                    name: "Nhà thuyền",
                    images: "https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450095.jpeg?k=cd5e46e632dab722d22217813485efde31fbe82f5f26a624166edccdbe8187bc&amp;o=",
                },
                {
                    name: "Lều trại sang trọng",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450097.jpeg?k=eac0f917a53dc395bd379fef8c191e7d5e37012b68e60232e4f6bba2a2901b7a&amp;o=",
                },
                {
                    name: "Khách sạn tự phục vụ",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450075.jpeg?k=d23cf8443780ac09f46f59e40393d75dbe64b06029b4959c60b81b7fdefc9be0&amp;o=",
                },
                {
                    name: "Nhà nhỏ",
                    images: "https://q-xx.bstatic.com/xdata/images/xphoto/263x210/57175023.jpeg?k=dc0319d4d64ded9ee4b0ddb162a2e80db7899300b7bf21b34506888895d74c79&amp;o=",
                },
            ]
        );
        // countries
        await queryInterface.bulkInsert('countries', [
            {
                id: 1,
                name: 'Việt Nam',
                image: 'https://firebasestorage.googleapis.com/v0/b/datn-2023-2d1eb.appspot.com/o/images%2FFlag-Vietnam.webp?alt=media&token=5e253748-0c91-45cb-b217-434caba2b39b',
                categoryId: 1,
            },
        ]);
        // cities
        await queryInterface.bulkInsert('cities',
            [

                {
                    name: "Nha Trang",
                    image: "https://q-xx.bstatic.com/xdata/images/city/170x136/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&amp;o=",
                    countryId: 1,
                    categoryId: 1,

                },
                {
                    name: "Phú Quốc",
                    image: "https://q-xx.bstatic.com/xdata/images/city/170x136/688879.jpg?k=82ca0089828054a1a9c46b14ea7f1625d73d42505ae58761e8bcc067f9e72475&amp;o=",
                    countryId: 1,
                    categoryId: 2,

                },
                {
                    name: "Đà Nẵng",
                    image: "https://r-xx.bstatic.com/xdata/images/city/170x136/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&amp;o=",
                    countryId: 1,
                    categoryId: 3,

                },
                {
                    name: "Đà Lạt",
                    image: "https://q-xx.bstatic.com/xdata/images/city/170x136/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&amp;o=",
                    countryId: 1,
                    categoryId: 2,

                },
                {
                    name: "Cam Ranh",
                    image: "https://r-xx.bstatic.com/xdata/images/city/170x136/916778.jpg?k=04cb3aa3e62ee51b116aa09ede15e6d723a97002c80bd428a84d82e9c1959e04&amp;o=",
                    countryId: 1,
                    categoryId: 4,

                },
                {
                    name: "Vũng Tàu",
                    image: "https://q-xx.bstatic.com/xdata/images/city/170x136/688956.jpg?k=fc88c6ab5434042ebe73d94991e011866b18ee486476e475a9ac596c79dce818&amp;o=",
                    countryId: 1,
                    categoryId: 5,

                },
                {
                    name: "TP. Hồ Chí Minh",
                    image: "https://q-xx.bstatic.com/xdata/images/city/170x136/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&amp;o=",
                    countryId: 1,
                    categoryId: 2,

                },
                {
                    name: "Phan Thiết",
                    image: "https://r-xx.bstatic.com/xdata/images/city/170x136/781588.jpg?k=11df01b67f649ffe1aec4e8697488b97807e94430045132f5f066f2aad58614e&amp;o=",
                    countryId: 1,
                    categoryId: 3,

                },
                {
                    name: "Hội An",
                    image: "https://q-xx.bstatic.com/xdata/images/city/170x136/688866.jpg?k=fc9d2cb9fe2f6d1160e10542cd2b83f5a8008401d33e8750ee3c2691cf4d4f7e&amp;o=",
                    countryId: 1,
                    categoryId: 1,

                },
                {
                    name: "Mũi Né",
                    image: "https://q-xx.bstatic.com/xdata/images/city/170x136/688850.jpg?k=c24b566d6c4a5d11a2bfd23386584c794d088ac883ba61c0bcdbe03f52edd9ab&amp;o=",
                    countryId: 1,
                    categoryId: 5,

                },
            ]
        );
        // rules
        await queryInterface.bulkInsert('rules', [
            {
                id: 1,
                name: 'Quản lý',
                description: 'Đọc, ghi',
            },
            {
                id: 2,
                name: 'Nhân viên',
                description: 'Đọc',
            },
        ]);
        // locations
        await queryInterface.bulkInsert('locations',
            [
                {
                    name: 'Vinpearl Resort Nha Trang',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/416971941.webp?k=e3eac7b1bb29f0a4694ed5ef048f4c1c10a532fb67be4c39b0d237e234b9e5d7&o=&s=1',
                    oldPrice: 6120000,
                    newPrice: 5508000,
                    address: 'Nha Trang',
                    convenients: JSON.stringify([
                        '2 hồ bơi',
                        'Phòng không hút thuốc',
                        'Xe đưa đón sân bay',
                        'Trung tâm thể dục',
                        'Trung tâm Spa & chăm sóc sức khoẻ',
                        'Wi-Fi miễn phí',
                        'Giáp biển',
                        'Quầy bar',
                        'Khu vực bãi tắm riêng',
                        'Bữa sáng tuyệt vời',
                    ]),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416971941.jpg?k=47989e73957d65b5acbc12d2b62ed10579e28e9924cde30eea6a30ba0369febb&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416973733.jpg?k=eff75212f34441804983aede1f4f953493ec56426d70fa5130141959aff37cb1&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884068.jpg?k=ac3baa9e6b5fad9ebfc6f8823504c7b7073b6623a8360a1f81ed9d08b6d0e3e8&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/413930102.jpg?k=a729a31613abe503ae58d41041dac2805ce2af845f94f0c4402684fb052bd744&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884070.jpg?k=59886a540831f06b6231d49087ec6c7226da1551a3c5a6544fbab6f1dfac5cba&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412884073.jpg?k=b82a5659da9a0a72697dc9e8684dc92c2b6cd595a2cd6240527459f7043ba84d&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/69298442.jpg?k=c69336df63fd4233b547eeaba5e96096895faf42ee8e6432f7ccff83efa224d0&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412885850.jpg?k=1c59b8496696665b9c5869a729bbdc3646e5a1936ab1e7ba70694c547656b0b8&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883158.jpg?k=a220ece8f04054da35466bd13ee87342354cc18122b73eb0fbdcfef850115325&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883382.jpg?k=1e48b377c7b6da74588dbdfd07174354467fd826c4016a38c199e338699fb514&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/412883182.jpg?k=a2a9751b4f526ed85510de905cf59a81c66ded4bc872bdc96c4d68e76b5d8b3a&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Vinpearl Resort Nha Trang về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'StarLight Nha Trang',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/408504480.webp?k=58fa354acff25c03f7ad1400186d919b2d97a84281d7840359f3510e90c9e239&o=&s=1',
                    oldPrice: 1680000,
                    newPrice: 6200000,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify([
                        '2 hồ bơi',
                        'Phòng không hút thuốc',
                        'Xe đưa đón sân bay',
                        'Trung tâm thể dục',
                        'Trung tâm Spa & chăm sóc sức khoẻ',
                        'Wi-Fi miễn phí',
                        'Giáp biển',
                        'Quầy bar',
                        'Khu vực bãi tắm riêng',
                        'Bữa sáng tuyệt vời',
                    ]),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504480.jpg?k=cd4ad4814eeee0591dcdc7017c3ee48c5558a8a1ecf885ecb8eea3136e18177e&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503654.jpg?k=4eb5d6fa8dedd0b9fb4c56afecdfb148d8f37da886d6cb4b00d1fb3ade047f99&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504490.jpg?k=dbb8c09069c6aacad985ecf93cf2e18cfccfb85ac1e864f44571ece5474deee9&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504260.jpg?k=324aae658370c652c84c15792244d4ea573ecbc91acbf5f731472f2a2668e469&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/379794463.jpg?k=3a4879921ed8c86df8832235ad9d635e1babe666dfead1f8e79648c334107f5f&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504193.jpg?k=31dd395a512e90b6ae785dcf4b108fa44f2c1cad352b3243ee0ace27051c95a3&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408505633.jpg?k=2452caa243086601ec883ba64e94c94c1fcab077dbdb625689a9de10eb14f37d&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416709327.jpg?k=ee9472d05c564d994a6df902846dd0eb388d97a770212557c114b76fb2315f1d&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416959251.jpg?k=76c6617311c44cf148d5f6510b440da962fa892b2d25fbce07c3b016970db8f3&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416959252.jpg?k=6985c5e8fd1c04dd182824f8baf52dd3479bdd253f04aa4312a7e24cf35bfdb0&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416959250.jpg?k=9ffd1a3dcef86e842cbbbf26b9cc00e20bbffeed6f631507d5572aa32ddebafd&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416959248.jpg?k=ac4bc63252f92026563b2ac2365eb1dd706cc73acc2432dc892597fece2bcac5&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416959249.jpg?k=1233e16e11ecddad2bf3b67a1315ffb002d087e956067353cac7dd6fb0ef7d1b&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho StarLight Nha Trang về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Azura Gold Hotel & Apartment',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/405269065.webp?k=81e22de6cf1e32bbad7ae650a290aee5d820a6e8aa7b16d4f4fb792478fadcdf&o=&s=1',
                    oldPrice: 3240000,
                    newPrice: 2800000,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify(
                        ['https://cf.bstatic.com/xdata/images/hotel/max1024x768/416709299.jpg?k=02b18b0acae751744b603dbe4be6abb81910c35c3d82584ae94023f03bae788c&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/416959254.jpg?k=c690b783ae933e5a29a88e26ac5074ae34ab9326a36bb11397b724d275a9db09&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408505612.jpg?k=ad25b34b33b9c624c375b464c132725b4bb0a2a8aa1d1b038becdfbb83f3d513&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408505663.jpg?k=dea1103bd37e8e89b716252dae607314980ee9835e18c6a82497a1508e2ea7b4&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503480.jpg?k=eb28f95c0a8a873f4d17c449944106c9d4d53f0efdeae05b0029c2a2681c3949&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408505455.jpg?k=7f652246b592fb0c28c7dde01896fa3d4bcdbdb39936922a8848f22078af191e&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504547.jpg?k=23f954c0c6a97f5751887e69bbd7f0bd7a042a49b9eb117e37b83bfea9a19879&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503721.jpg?k=c3f21dc99b7a8c8c530e329da469a6fa28a8cf5bcbd3d63c21f58b3f89536011&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408505630.jpg?k=bb80e39cba82679560b0e942e43dce243512b1985443adac4f6a59e705ea5e3a&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503479.jpg?k=55887d188a4dc6816a08357544de435ae3860cc28ea01c809dcce80eec31566c&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408505470.jpg?k=f8b7075f57a28f50ea6bb0bba8bf645d87fd2aac4d58ffd0ad81913b7c135778&o=&hp=1']
                    ),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Azura Gold Hotel & Apartment về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'AZ five stars Ocean View Apartment',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/447261142.webp?k=dbfd385178e87d4060421238333ef8808948bc2a89df9496e288013be9931440&o=&s=1',
                    oldPrice: 5000000,
                    newPrice: 3510000,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify(
                        ['https://cf.bstatic.com/xdata/images/hotel/max1024x768/408505443.jpg?k=3a8440d4ca2b30de632605e59b11a4b3283570af6e8bcc8d5950213fc26ca681&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408505403.jpg?k=d1d882b08eb79e4d751665f4211a47a4b30b5624df9230a07a948346a188bd23&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503478.jpg?k=b6e18639f3e1ab02f365293bf05ef2c4eb6f175d2715e4edea6328cd2baf7bb2&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503675.jpg?k=5f2c8bbe24f09e9d8a582608bf97dbb39cacb157533636b9900136d87f7bab90&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503617.jpg?k=303a42a43c660e28622e8014691007508398b522dd0611f278f61b93f89a983b&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503679.jpg?k=917754979de4fd85c39907e4151cabb8d9f1f2c6a01d619510d06f961f1f5d7e&o=&hp=1',
                            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503724.jpg?k=ee4cabf7e0dcf5835c6b18c90f2164104515e9888540cb7888864d880dabaf23&o=&hp=1']
                    ),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho AZ five stars Ocean View Apartment về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Florida Nha Trang Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/439858261.webp?k=62eaf3a9832f59856cde52032901283179eed60233378a4206b62ca992e83f24&o=&s=1',
                    oldPrice: 4200000,
                    newPrice: 1512000,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503711.jpg?k=c112a41eb2d6f68517214c549559c7339e6cdf6fc73bb9e47fe24ab71501702d&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408503942.jpg?k=58388f6aa64e748091f55ac927efd51a6699d7965c97202e71123efa5e996083&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504218.jpg?k=1438bb5d45238a1ab863486fdc36fd640e6f3fd0109d6d794820c43ec439ff19&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504235.jpg?k=5259f2e175d61e63706c1f8966b92912acb13f58d46cd5825cd50da791e891c8&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504188.jpg?k=669ba0a2d996f01d7d50c57c1dda4dd342c49bba2564c4856377a69a7268e48f&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504258.jpg?k=b438ce3af02998276747c1698a005a6f01384b2bf35204bbdd1ff19a921efa9c&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Florida Nha Trang Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Apus Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/283065114.webp?k=3cd2d5eba9dc84a5c7a9f5a7ceef825203e68c76724895a9763edfb9519eea68&o=&s=1',
                    oldPrice: 3977000,
                    newPrice: 1099686,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504241.jpg?k=de81a33cdca3fd9c4ec365facc090c2441a7310ad14e5e6ab2907fcb94801eb3&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504216.jpg?k=3a5690f273c9ead867cc38dd7749c8f6deb5f818f7d86028541190e56c08faf5&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504277.jpg?k=5a8eccf7b3322c7c13381f9d0aa8524240485cd2651dd39afaae66817d3d7e67&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/landmark/max1024/175764.webp?k=463dc107821739c0d40271da97b64b8e29b9940549d72965d378fc2a2b3fcaca&o=',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/408504480.jpg?k=cd4ad4814eeee0591dcdc7017c3ee48c5558a8a1ecf885ecb8eea3136e18177e&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Apus Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Pavillon Garden Hotel Nha Trang',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/47178141.webp?k=dfea4c163618e66c7535d3878953ff708c8ca1f7ec0e170687d633cbdf2ee564&o=&s=1',
                    oldPrice: 2386200,
                    newPrice: 1418596,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/447261142.jpg?k=d98a0ce744a9fef7e74fed383bc121820dc521a70d2f071921afc46371495330&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941564.jpg?k=37e0aacc28a01d019a6274fec1edb5e551ae63a5764358133b6e8819d32d2fcc&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942733.jpg?k=bf924bfa1e03f54c4627f0f294c06f4658f2ddd050813d4b8dc4f517eda8840a&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942020.jpg?k=afd9a86daf0cd08d332249a15d24d4737c8f52cf82ff5929d72d7c3bf2fd1391&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941729.jpg?k=383642903cb8b68baf7814c47b5516b4ee636bfd92ece3c00a94e88d76e12744&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Pavillon Garden Hotel Nha Trang về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'La Sera Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/362950665.webp?k=e7c8cca32b5a1646441a704742940ca148d373b9f7e2b828cdbcf1da2eb0636e&o=&s=1',
                    oldPrice: 2618000,
                    newPrice: 1060290,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941731.jpg?k=0f6d84a67d6a8bd94aba1e17d3a45abd51b075ee9f4cc965def0c5431f2f2e59&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/447003506.jpg?k=ecc054ae4ee51b04870c0ef02fc49c59c34636f3a10f9bdb19a5409d8785f46a&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446943538.jpg?k=5c2e32ffbf65e7caa8a9cbe02578c24e11b75f2843f1fac41030d19a21fcb734&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/447003509.jpg?k=d207d636ac5bc26c9cd8708cb1b5de8fc4d6aca0da555286b1f9af161494e03d&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942633.jpg?k=ff125ee32268d54ffbed552a95fb44b08268bdd3a7fb450adce55878688e4227&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho La Sera Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Alpha Bird Nha Trang - RHM ASIAN',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/278536254.webp?k=2fe7118f81fe6617d0a3f134e49619c1a3c7c0694745e5e8e052c04b0058e60f&o=&s=1',
                    oldPrice: 2200000,
                    newPrice: 1900000,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942021.jpg?k=7a31f485e08f0ebfa1edb555ec75ebd6ac771216a3e0d25f6b63ae2690faa157&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942732.jpg?k=02ac0228df67749bc820119a6c2455432fcf74e6bfea48dadadf512163838e8e&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942022.jpg?k=d7a45a0e6174cadc724921e09b48e0758b1ff3c03f15510afca51860e4bf9c5c&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942715.jpg?k=91e14375df505fa12663767646e7626b5b6896c60ecaef5b2bc5bc17a57e6593&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942723.jpg?k=ecd5f7b56cfd91427bd2e9ff94adf52d25b016d7bdaa91bbea23cf67fc39b92c&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Alpha Bird Nha Trang - RHM ASIAN về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Panorama Star Beach Nha Trang',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/338718575.webp?k=bb1505fc3d2481ac698b4cc6dad0e1f3c3a3866fea9b9464eb02fabba30c1b1c&o=&s=1',
                    oldPrice: 3420000,
                    newPrice: 4355000,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941518.jpg?k=34033a62e1ec4cd9cc4a1168659fbfc9b0fd76dfe3c021e2d06e1eb6fb2f61ff&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941517.jpg?k=6589807347060ef3a47917e50bd5c2181c0fc9ec9412b5267c3ce6048c8bbf99&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941514.jpg?k=ccd87aa128a0f8fe5c4d5bdf51c7a66553be83ffeccaae7825251080cd308ade&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942029.jpg?k=86216342172027844a20e3595940d705634c8f41dd25b7593bcb870d62e0b334&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942632.jpg?k=225f324b2dbfadd1e28f323bb72d3419a53272dc97a311acd1aef2a5ec42bae0&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Panorama Star Beach Nha Trang về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Majestic Premium Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/152261002.webp?k=a01c0efd109836cfca723f225283336190b7f0da196863a84d5704c4ec7ed6bf&o=&s=1',
                    oldPrice: 3424750,
                    newPrice: 1363907,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941637.jpg?k=931ababeae94d52693ef8da8cca8b3ab2ecb4c66fba31dadee159a17ce56bc60&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942718.jpg?k=c6a6e7ee84ca2c01a157e63b1fd3883109806f560e596737913b91688dad16b4&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941554.jpg?k=76299b0aa8b55e58aca3d9cee5e1ce44f40b038b7c8e088d45985f6b9cfa5ecf&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446943541.jpg?k=d8f7679d7718838bb000c9542c968942ee3713e7c5fd869e43aaa3e6051fa5dc&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942645.jpg?k=7018047363f01f92c3c904e600fc686cab45719a7440479b25c6e9da89240a2d&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Majestic Premium Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Prime New Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/415470107.webp?k=0271df6fb9505cf87e5bf4e0dbb5b95012d9b62fc18c5789835833d19e2e0bad&o=&s=1',
                    oldPrice: 5070000,
                    newPrice: 1186380,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941467.jpg?k=9372ad9e4fd1728f604df70eac1b2cd05d4063b41cd12e686ea6c9884d748418&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941466.jpg?k=b2c701dcbe167fbc59bddbba3adbbf79241069ae52f29443bd9d7afed09b558a&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942646.jpg?k=cbc3f07d43bf7220f769de54cf3908360f2419e11b778628ecf5fbc55e12b92e&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942637.jpg?k=d1dc23f872e0c1f673fb31301fb8ddc08d6a7c802b73ce6fd9fb61ed5b9a24e0&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942728.jpg?k=4b69c63b05edf2e6c14602ef4b19e71e3d223bd646485c751403989dcaeb408b&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Prime New Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Lucky Sun Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/218426034.webp?k=29b39bb6edc9c59b2eb67ab5236de41ecf2882588fd937423b4e95dc35686f0b&o=&s=1',
                    oldPrice: 1633333,
                    newPrice: 1186380,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942421.jpg?k=c3bac255dcdef915c599b7061b0f2f124414eee46b0fa9e030fd18753edeba9a&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942420.jpg?k=d5df7251090527a7e17401b16b83b019ac18f4480ee9d97e46f0d0c9b19b5710&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942025.jpg?k=a02d5bd0b06979446fc4f2dae938bf90c060bdf2d32c6ef474b9d3e4bebde679&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/447007154.jpg?k=77f661c4650511f8f73b47cc55c99d5554eca072b542cb800731c6156ae265ab&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/447007152.jpg?k=3db9ded113bfb37fdef52f6aa9852a80679d575b9b456d6b0f90f68434b9e163&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Lucky Sun Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Arise Hotel Nha Trang',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/288767437.webp?k=bd8d4893181625b121130d3d03d7794ac011915a8458ec14529e9cc145ba5190&o=&s=1',
                    oldPrice: 4350000,
                    newPrice: 1213650,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942018.jpg?k=bff059e88b6292292488d6277bb7a5a83f658bdf34e6503f11fa61e233e7e920&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942024.jpg?k=772a14873ea4fc3b90697eeb6802f8c26b59d89e9033e0f546137d51d3611c02&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942016.jpg?k=2aa8ec2a5b4c07ce3b8f1cf28328f551d312834c0e239bdb04c70783947d3491&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942017.jpg?k=9b572e0a14f9b89a9a548d4e0f095d5c679d819532a825a6a2e593277146e11b&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942714.jpg?k=689d1002f4e2792ee430ad75e89230de5d832cac80de625fbae24e880c7ab6c7&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Arise Hotel Nha Trang về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'DTX Hotel Nha Trang',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/287106833.webp?k=c8619e9f0c71ad7e90212c98247c2cc3b5563031ba077810203f22cf9549a2aa&o=&s=1',
                    oldPrice: 4499998,
                    newPrice: 3430000,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942717.jpg?k=c247c659df4698a40899c0a0893ae026312c40b460dd3f9bebd0a9cd33e6fd90&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942019.jpg?k=71a18290bbbcbb6d088e7994e5469d267d7137ba611e6d285de269058dfb9baf&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446942027.jpg?k=856491bfae5b6b5b8c479859e8bf97e30ce79dd0449aeaf87a2a04612707ec5a&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941639.jpg?k=b1ffcb8dcb36931f3cde10d7d7ac0b02b279e8a73d43723da19d025438f81721&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/446941733.jpg?k=62e9854baa5267a12f018948ba861973c1a21071e9c1de79ceb51142f1573230&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/landmark/max1024/218749.webp?k=4f3d33f5f00406b58916f730adf2263f08afda646f352b40d8f83693d95f199c&o=',
                        'https://cf.bstatic.com/xdata/images/landmark/max1024/175764.webp?k=463dc107821739c0d40271da97b64b8e29b9940549d72965d378fc2a2b3fcaca&o=',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho DTX Hotel Nha Trang về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Crown Hotel Nha Trang',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/191163047.webp?k=4d90a94335fdead18ebf94a95e14c5621cf74a4ddc86e00682b67dc054b67daa&o=&s=1',
                    oldPrice: 4299998,
                    newPrice: 2500000,
                    address: 'Pham Van Dong Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/47178141.jpg?k=049373504606b8340ab8643be3a23d50b8b6418355a70c2e4b710a9ccb3c115d&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038631.jpg?k=6533d486aafa8c6e45547b82886378749d706848e5256132d06d9708cbac51d0&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038696.jpg?k=ff2f1c8133234d8bcf1f19cadafb97abb16790d4c5365d852e74c91e4d7e2ec9&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Crown Hotel Nha Trang về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'LegendSea Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/91317320.webp?k=dca4ef6e3aa9d9756383562c9767de1a0ceba3943208e63f3c1101c936a83490&o=&s=1',
                    oldPrice: 4620000,
                    newPrice: 2024999,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038661.jpg?k=1a01e461df98fd09d07ade4a9dbe7add959ad46cabb97cea976a2e8a6be53ba7&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/47178089.jpg?k=a245780fed068408f140a992f8c39c8a97dae1e5e220a0f6527034fcdef97225&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038625.jpg?k=74c3b389577477f0498104b32aed4610575f1c643b6adeb70f8f0d747c0fcb45&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038683.jpg?k=ad2ce35c0cb53703f461d074def24104e41491b6a3f370fbf86b2a3e06a37260&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho LegendSea Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Aaron Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/387110268.webp?k=4fd4fef98a77e441b9de27c088f2c5bace1ee25311c91a59bdb9b897321820af&o=&s=1',
                    oldPrice: 1680000,
                    newPrice: 2024999,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038676.jpg?k=d58ce22689aa2e26a3f15c44de61f8c78181e3586394a0f170e9dfbfdc37f47d&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038679.jpg?k=3030fea867b913b06653d6483a65b5834779707c5ed5e494baece2eb1f7d75fc&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038681.jpg?k=ef85035adc0f02f759088d1c46da20fba4c68c8d1df2989103cfaf820117f3e4&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038644.jpg?k=076556c2fd9dce19e01442c2b80fa1b873f0f084c6bef8ef57340cb5258224ae&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Aaron Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Seana Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/412692754.webp?k=aebee6c8d60f0063c79acb8338078d9db8c2e6d33c67fc658e1304b39ff4f599&o=&s=1',
                    oldPrice: 3420000,
                    newPrice: 1243811,
                    address: 'Pham Van Dong Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038654.jpg?k=eb98197df36012b1f53b8a82a8bd1b002521ed5072b2ed5bfacb3a4883b77896&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038685.jpg?k=4fdd6546acba78434ab1f92451fdbef9127c72df1313b4db3e35bf4d8ffcf673&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038689.jpg?k=644d71866b8b6a50601dedbb18865dbb8f9dd32320e44013cd106d9441c25d7b&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038665.jpg?k=8d34d038868c215ec497909f8403270f9c4f130281df7564d30dc5dc8708b5c8&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038692.jpg?k=e4e719947436bab99065b4253a6b547cf7421fcbae6bf492a5ad819d1f07c33c&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038668.jpg?k=8b386f16269125003f3766451c36194974cce87c2b2474665b032ef03e68abb9&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Seana Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Boss Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/262796652.webp?k=03fd1db3bb50fcf849b7e1e725e66810a06f3a2e30ea72011eec0ed43d34f1db&o=&s=1',
                    oldPrice: 3240000,
                    newPrice: 1243811,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038695.jpg?k=86900a5ecfed336efa5be6f4f8166c2cb4b55dd2439907eb6034d26716c09418&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038673.jpg?k=0e0001e1d164deaa007f85fbbf785adafc032d21aa41c114e5ad9720636d6c33&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038699.jpg?k=a8ba42f7bc88fca5bb16ab42abc89dc997b34ba5d2da39fb3a6455cb1bea1b8f&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038675.jpg?k=259008342606f62e7992e95e90b64e08dfef06ce1fa0f28d340508627d6c4e71&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038678.jpg?k=a5242eb14712de42b40060c3e9bb57915f99a3dd5dd462347f22c16e3e31c4cf&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho Boss Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'V Hotel Nha Trang',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/439668732.webp?k=4dab981825418aed89acc4e1cb0b2823e316840e9b2df7565e77ce8bc091ef85&o=&s=1',
                    oldPrice: 3240000,
                    newPrice: 2494800,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038680.jpg?k=dc5822a8b321c8c6910e89d7b3ce9e95658c5ee3b724e252a6105987a29b7f07&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038682.jpg?k=fc6e59d76864a5403887c9a808657ec2a3f4ba5f00b413d8e81994b27e2c7870&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038684.jpg?k=0f3',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho V Hotel Nha Trang về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'EMERALD BAY HOTEL & SPA',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/407761900.webp?k=4d28b87b09658e1226a4eb20692df9c1bbe06c60bb365ab27c138ebe3945d54c&o=&s=1',
                    oldPrice: 3420000,
                    newPrice: 2494800,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038688.jpg?k=05cfbc7d3b77a140bd81d6b2f084cb36d6670bee6de40cfacd386f7362392e8d&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038690.jpg?k=9c5cea853d9fa69b25452774594a2946e9b0f82d4c575fa5075f4e0dc8891b97&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038691.jpg?k=69c1aaf73bacea0cb76c6946a100cca763c57c651bcdb8118d23f0479cb95132&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038721.jpg?k=f34a290c4ae5dedf5c3409639592c584d07fe4127fab443e98919eeee011b064&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho EMERALD BAY HOTEL & SPA về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'La Vague Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/284335212.webp?k=91f0f4a587307853766f05853154a3e8e1573acfabb644c072aa2e57bae1bd5c&o=&s=1',
                    oldPrice: 3424750,
                    newPrice: 1315799,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038693.jpg?k=5bc5adffd53a74b18a6a4775e58b7f053b249bdb6c60e800edd604b918674704&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038722.jpg?k=e79db401841241e6c3d9699ab575fea9a89857d556f746fa282468117461c698&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038698.jpg?k=94a2b40d9064f0b24714fb1493a9f2b7cf8f8f0183d6441410f84006693b81c0&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038700.jpg?k=c23ee455b29d251a3622b3154c3c2256026ab424ff4d7a2ae3ab0bff00187758&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho La Vague Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'ASTON Nha Trang City Hotel',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/208177526.webp?k=29b0b897fa3d00747dff150af6210e71f3de07b3c5359c88bff7a052ba1a1652&o=&s=1',
                    oldPrice: 3420000,
                    newPrice: 1315799,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038702.jpg?k=5b89c9c401bcdfd3e5d2740a6bb19e7f37b2a331e9cd2982a07858743858625e&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038716.jpg?k=24997dff4a8aee34e35a3fa0622274b87c65d7e06d6e5eead3b9e50813f20090&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038703.jpg?k=36919221f5c1a19eaa783f1dd2777df10a39ca6cc41b43ac0772fb3669679887&o=&hp=1',
                    ]),
                    cityId: 1,
                    phone: '0852234273',
                    notes: JSON.stringify(
                        [
                            'Vui lòng thông báo trước cho ASTON Nha Trang City Hotel về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.',
                            "Yêu cầu VND 1000000 tiền đặt cọc đề phòng hư hại khi đến nghỉ. Số tiền này sẽ được chỗ nghỉ thu bằng tiền mặt. Bạn sẽ được hoàn lại khi trả phòng. Tiền đặt cọc của bạn sẽ được hoàn lại toàn bộ bằng tiền mặt, nhưng cũng phụ thuộc vào mức hư hại mà bạn có thể gây ra tại chỗ nghỉ.",
                        ]
                    ),
                },
                {
                    name: 'Smile Hotel Nha Trang',
                    thumbnail:
                        'https://cf.bstatic.com/xdata/images/hotel/square200/159117428.webp?k=538463ec8c424a5bd12b7f444a6d50fd2960d8aa9d54f962c11eb0bc2b0fbaed&o=&s=1',
                    oldPrice: 2512750,
                    newPrice: 1807920,
                    address: 'Nha Trang Beach, Nha Trang',
                    convenients: JSON.stringify(
                        ["2 hồ bơi", "Phòng không hút thuốc", "Xe đưa đón sân bay", "Trung tâm thể dục", "Trung tâm Spa & chăm sóc sức khoẻ", "Wi-Fi miễn phí", "Giáp biển", "Quầy bar", "Khu vực bãi tắm riêng", "Bữa sáng tuyệt vời"]
                    ),
                    images: JSON.stringify([
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038712.jpg?k=3cc9f1067004fbff2b45183aaa6ebaf65a3edb676563e019223849633b2457d9&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/402038714.jpg?k=4e9ca31eddb92dac6efedfade54919fe1119262307764277b04dbc42a8006dc5&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/47178111.jpg?k=d86da599804b8ab471b905cbef3484551ff668c0474b875bf63d8bb19a8de8a9&o=&hp=1',
                        'https://cf.bstatic.com/xdata/images/hotel/max1024x768/47178061.jpg?k=4499ad293e49d28b81c443ee5735349a6a61cdcfa51b00764a6143b53839d834&o=&hp=1',
                    ]),
                    cityId: 2,
                },
            ]
        );
    },

    async down(queryInterface, Sequelize) { },
};
